import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter from expo-router
import { ArrowLeft } from "lucide-react-native"; // Import ArrowLeft icon
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Platform } from "react-native";
type HeaderProps = {
  title: string;
  showBackButton?: boolean; // Optional prop to show a back button
};

const Header: React.FC<HeaderProps> = ({ title, showBackButton }) => {
  const router = useRouter(); // Use the useRouter hook

  // Handle back button press
  const handleBackPress = () => {
    router.back(); // Navigate back to the previous screen
  };

  // Handle profile icon press
  const handleLogout = async () => {
    if (Platform.OS === "web") {
      // Use localStorage for the web
      localStorage.removeItem("userToken");
    } else {
      // Use AsyncStorage for mobile
      await AsyncStorage.removeItem("userToken");
    }

    // Navigate back to the login screen
    router.replace("/login");
  };

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={styles.backButton}>
            <ArrowLeft size={24} color="white" /> {/* Use ArrowLeft icon */}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity style={styles.profileIcon} onPress={handleLogout}>
        <Text style={styles.profileText}>:)</Text>
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
