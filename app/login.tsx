import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  Image, // Import Image component
} from "react-native";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      Alert.alert("Login Successful", `Welcome ${username}`);
    } else {
      Alert.alert("Error", "Please enter both username and password");
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Blue Area at the top */}
      <View style={styles.blueArea} />

      <View style={styles.container}>
        {/* Welcome Text */}
        <Text style={styles.title}>Welcome!</Text>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Login Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        {/* Forgot Password Link */}
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Image Section below the form */}
      <Image
        source={require("../assets/images/pcsLogo.jpeg")} // Replace with your image path
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light gray background for the entire screen
  },
  blueArea: {
    width: "100%",
    height: 100, // Height for the blue area at the top
    backgroundColor: "#0049ff", // Blue color
    marginBottom: 10, // Space below the blue area
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    marginTop: 20, // Margin from the blue area
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
    textAlign: "left",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#0049ff", // Blue button
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#007BFF", // Blue color for the text
    textDecorationLine: "underline",
  },
  image: {
    width:300, // Set the desired width
    height:100 , // Set the desired height
    marginTop: 0, // Add spacing from the form
    alignSelf: "center", // Center the image horizontally
  },
});
