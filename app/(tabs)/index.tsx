import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Gradient Overlay */}
      <LinearGradient
        colors={["#1e90ff", "transparent"]} // Blue at the top, fading to transparent
        locations={[0.3, 1]} // Adjust gradient transition
        // style={styles.topGradientOverlay}-
      />

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>PEOPLE'S CREDIT SOLUTIONS</Text>
        </View>

        {/* Logo Image Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/pcsLogo.jpeg")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Welcome Message */}
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>
            Empowering Your Financial Journey
          </Text>
          <Text style={styles.subText}>
            Seamless, Secure, and Smart Financial Solutions
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.push("/login")}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* City Image at the Bottom with Top Gradient Overlay */}
      <ImageBackground
        source={require("../../assets/images/city.jpeg")}
        style={styles.bottomImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(30,144,255,0.7)", "transparent"]}
          locations={[0, 0.5]}
          style={styles.bottomImageGradient}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e90ff", // Changed background color to match the gradient
  },
  topGradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.3, // Adjust height as needed
    zIndex: 0, // Ensure it's above the background but behind content
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 2, // Ensure content is above the gradient
  },
  headerContainer: {
    marginTop: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white", // Changed to white to stand out on blue background
    textAlign: "center",
    letterSpacing: 1,
  },
  logoContainer: {
    width: width * 0.7,
    height: width * 0.5,
    borderRadius: 10,
    overflow: "hidden",
 
    elevation: 16,
    marginBottom: 20,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  welcomeText: {
    fontSize: 22,
    color: "white", // Changed to white
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "white", // Changed to white
    textAlign: "center",
  },
  buttonContainer: {
    width: width * 0.7,
    marginTop: 10,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "#1e90ff",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing:0,
  },
  bottomImage: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: height * 0.4,
    zIndex: -1,
  },
  bottomImageGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "50%", // Gradient covers top half of the image
  },
});
