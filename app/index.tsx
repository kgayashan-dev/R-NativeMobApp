import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { ChevronRight } from "lucide-react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("session_token");
      if (!storedToken) {
        router.replace("/login"); // Redirect if not logged in
      } else {
        setToken(storedToken);
      }
    };

    getToken();
  }, []);

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={["#FFFFFF", "#E6F2FF"]}
        style={styles.gradientBackground}
      />

      {/* Content Container */}
      <SafeAreaView style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerContainer}>
            <Text style={styles.header}>PEOPLE'S CREDIT</Text>
            <Text style={styles.subHeader}>SOLUTIONS</Text>
          </View>

          {/* Logo Section with Blur Effect */}
          <View style={styles.logoWrapper}>
            {Platform.OS === "ios" ? (
              <BlurView intensity={30} style={styles.blurContainer}>
                <Image
                  source={require("../assets/images/pcsLogo.jpeg")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </BlurView>
            ) : (
              <View style={styles.blurContainer}>
                <Image
                  source={require("../assets/images/pcsLogo.jpeg")}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>

          {/* Motivational Text */}
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>
              Empowering Your Financial Journey{token}
            </Text>
            <Text style={styles.subText}>
              Seamless, Secure, and Smart Financial Solutions
            </Text>
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => router.push("/login")}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#2196F3", "#0D47A1"]}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <ChevronRight color="white" size={24} />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Wave Decoration */}
      <View style={styles.bottomWave}>
        <View style={styles.waveShadow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    zIndex: 2,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    fontWeight: "900",
    color: "#0D47A1",
    textAlign: "center",
    letterSpacing: 1,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "300",
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 20,
  },
  logoWrapper: {
    width: width * 0.7,
    height: width * 0.5,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 30,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#2196F3",
  },
  blurContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#0D47A1",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#2196F3",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: width * 0.7,
    marginTop: 30,
  },
  gradientButton: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#2196F3",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  bottomWave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "transparent",
  },
  waveShadow: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: "#2196F3",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.27,
    elevation: 10,
  },
});
