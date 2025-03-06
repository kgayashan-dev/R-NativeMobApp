import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import { router, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:5093/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("userData", JSON.stringify(data));
        alert("Success");
        router.push("/mf-receipt");
      } else {
        console.log("Error", data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.log("Error", "Network Error or Server Down");
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor="#4287f5" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>FINNECT</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#888"
            />
            <Text style={styles.label}>Enter Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin} // btn login
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? "Logging in..." : "Log in"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/pcsLogo.jpeg")}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>
              PEOPLE'S CREDIT SOLUTIONS PVT LTD.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    justifyContent: "center",
    backgroundColor: "#4287f5",
    paddingVertical: 30,
    width: "100%",
    height: "18%",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    paddingLeft: 18,
    paddingTop: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 40,
    width: "100%",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 14,
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#4287f5",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  loginButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  footerContainer: {
    paddingVertical: 4,
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
  },
  logoImage: {
    width: width * 0.9,
    height: 80,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 10,
    color: "#666",
  },
});

export default LoginScreen;
