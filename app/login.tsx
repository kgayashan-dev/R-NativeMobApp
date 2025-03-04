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
  ScrollView,
} from "react-native";

const { height, width } = Dimensions.get("window");

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login attempted with:", username, password);
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
              secureTextEntry={true}
              placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/pcsLogo.jpeg")} // Replace with your actual logo path
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
    overflow: "hidden",
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
    flex: 1,
    color: "white",
    fontSize: 28,
    paddingLeft: 18,
    paddingTop: 30,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
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
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    paddingVertical: 20,
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    width: "100%",
  },
  logoImage: {
    width: width * 0.8, // Adjust the width as needed
    height: 100,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 12,
    color: "#666",
  },
});

export default LoginScreen;