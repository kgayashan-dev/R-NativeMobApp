import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { router } from "expo-router";
// Get screen width for responsive image sizing
const { width } = Dimensions.get("window");
import { Link } from "expo-router";
export default function HomeScreen() {


  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Welcome to PEOPLE'S CREDIT SOLUTIONS</Text>

      {/* Image Section */}
      <Image
        source={require("../../assets/images/pcsLogo.jpeg")} // Ensure image is inside assets/images
        style={styles.image}
        resizeMode="contain"
      />

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>
        Explore and enjoy our amazing features!
      </Text>

      {/* Button to Login Screen */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.button}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: width * 0.6, // 60% of screen width for better responsiveness
    height: width * 0.4, // Maintain aspect ratio
    borderRadius: 10,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    color:'#fff',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
