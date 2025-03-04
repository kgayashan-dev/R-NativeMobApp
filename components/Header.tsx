import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native"; // Import useNavigation
import { useRouter } from "expo-router";

type HeaderProps = {
  title: string;
  showBackButton?: boolean; // Optional prop to show a back button
};

const Header: React.FC<HeaderProps> = ({ title, showBackButton }) => {
  const navigation = useNavigation(); 
  const router = useRouter();
  const handleProfilePress = () => {
    router.back();
  };

  return (
    <View style={styles.header}>
      {/* {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      )} */}
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.profileIcon} onPress={handleProfilePress}>
        <Text style={styles.profileText}>A</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4285F4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileIcon: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: "#4285F4",
    fontWeight: "bold",
  },
  backButton: {
    color: "white",
    fontSize: 16,
  },
});

export default Header;
