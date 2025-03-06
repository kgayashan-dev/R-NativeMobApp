import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
} from "react-native";
import { router, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Home } from "lucide-react-native";

const { width } = Dimensions.get("window");

// Define API states
type ApiStatus = "idle" | "loading" | "success" | "error";

const LoginScreen: React.FC = () => {
  // Form states
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // API and error states
  const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [networkAvailable, setNetworkAvailable] = useState<boolean>(true);

  const router = useRouter();
  const { login } = useAuth();

  // Check if there's a stored session on component mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        setApiStatus("loading");
        const storedUserData = await AsyncStorage.getItem("userData");

        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          // Validate the stored session data
          if (userData && userData.id) {
            // You could verify token validity with a server call here
            login(userData);
            router.push("/mf-receipt");
          }
        }
      } catch (error) {
        console.error("Session verification error:", error);
      } finally {
        setApiStatus("idle");
      }
    };

    checkExistingSession();
  }, []);

  // Input validation
  const validateInputs = (): boolean => {
    if (!username.trim()) {
      setErrorMessage("Username is required");
      return false;
    }

    if (!password) {
      setErrorMessage("Password is required");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  // Handle login with proper error handling
  const handleLogin = async () => {
    // Reset previous errors
    setErrorMessage("");

    // Validate inputs
    if (!validateInputs()) {
      return;
    }

    try {
      // Set loading state
      setApiStatus("loading");

      // Make API request with timeout for better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

      const response = await fetch("http://localhost:5093/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (response.ok) {
        // Check if the server returned valid user data
        if (data && data.id) {
          // Store user session
          await AsyncStorage.setItem("userData", JSON.stringify(data));

          // Update status
          setApiStatus("success");

          // Clear any existing errors
          setErrorMessage("");

          // Call login function from context
          login(data);

          // Navigate to the protected page after successful login
          router.push("/mf-receipt");
        } else {
          // Handle invalid user data format
          setApiStatus("error");
          setErrorMessage("Invalid response from server");
          Alert.alert("Login Failed", "Invalid server response");
        }
      } else {
        // Handle different error status codes
        setApiStatus("error");

        if (response.status === 401) {
          setErrorMessage("Invalid username or password");
          Alert.alert("Login Failed", "Invalid username or password");
        } else if (response.status === 403) {
          setErrorMessage("Your account is locked. Please contact support.");
          Alert.alert(
            "Account Locked",
            "Your account is locked. Please contact support."
          );
        } else if (response.status >= 500) {
          setErrorMessage("Server error. Please try again later.");
          Alert.alert(
            "Server Error",
            "Server is currently unavailable. Please try again later."
          );
        } else {
          // Generic error message for other status codes
          setErrorMessage(data?.message || "Login failed");
          Alert.alert("Login Failed", data?.message || "Something went wrong");
        }
      }
    } catch (error) {
      // Set error state
      setApiStatus("error");

      // Handle different error types
      if (
        error instanceof TypeError &&
        error.message.includes("Network request failed")
      ) {
        setNetworkAvailable(false);
        setErrorMessage(
          "Network error. Please check your internet connection."
        );
        Alert.alert(
          "Network Error",
          "Please check your internet connection and try again."
        );
      } else if (error instanceof DOMException && error.name === "AbortError") {
        setErrorMessage("Request timed out. Please try again.");
        Alert.alert("Timeout", "Request timed out. Please try again.");
      } else {
        // console.error("Login Error:", error);
        setErrorMessage("An unexpected error occurred. Please try again!");
        Alert.alert("Error", "An unexpected error occurred. Please try again.");
      }
    } finally {
      // Always clean up loading state
      if (apiStatus === "loading") {
        setApiStatus("idle");
      }
    }
  };

  // Handle retry when network is unavailable
  const handleRetry = () => {
    setNetworkAvailable(true);
    setErrorMessage("");
    setApiStatus("idle");
  };

  
  // Render network error state
  const renderNetworkError = () => (
    <View style={styles.networkErrorContainer}>
      <Ionicons name="cloud-offline-outline" size={50} color="#d32f2f" />
      <Text style={styles.networkErrorText}>
        Network connection unavailable
      </Text>
      <Text style={styles.networkErrorSubText}>
        Please check your internet connection and try again
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor="#4287f5" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>FINNECT</Text>
        <Text style={styles.headerIcon}>
          <TouchableOpacity
            style={styles.passwordVisibilityToggle}
            onPress={() => router.push("/")}
            disabled={apiStatus === "loading"}
          >
            <Home size={24} color="#fff" />
          </TouchableOpacity>
        </Text>
      </View>

      {!networkAvailable ? (
        renderNetworkError()
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <View style={styles.inputContainer}>
              {errorMessage ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              <Text style={styles.label}>Enter Username</Text>
              <TextInput
                style={[
                  styles.input,
                  errorMessage && !username ? styles.inputError : null,
                ]}
                placeholder="Enter your username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  if (errorMessage) setErrorMessage("");
                }}
                placeholderTextColor="#888"
                autoCapitalize="none"
                editable={apiStatus !== "loading"}
              />

              <Text style={styles.label}>Enter Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.passwordInput,
                    errorMessage && !password ? styles.inputError : null,
                  ]}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (errorMessage) setErrorMessage("");
                  }}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#888"
                  editable={apiStatus !== "loading"}
                />
                <TouchableOpacity
                  style={styles.passwordVisibilityToggle}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={apiStatus === "loading"}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.loginButton,
                  apiStatus === "loading" ? styles.loginButtonDisabled : null,
                ]}
                onPress={handleLogin}
                disabled={apiStatus === "loading"}
              >
                {apiStatus === "loading" ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.loginButtonText}>Log in</Text>
                )}
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
      )}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4287f5",
    paddingVertical: 30,
    paddingHorizontal: 18,
    width: "100%",
    height: "12%",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcon: {
    fontSize: 24,
    color: "white",
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
  errorContainer: {
    backgroundColor: "#ffebee",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#d32f2f",
  },
  errorText: {
    color: "#d32f2f",
    fontSize: 14,
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
  inputError: {
    borderColor: "#d32f2f",
    borderWidth: 1,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
  },
  passwordVisibilityToggle: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#4287f5",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  loginButtonDisabled: {
    backgroundColor: "#a2c0f7",
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
  networkErrorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  networkErrorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d32f2f",
    marginTop: 16,
    marginBottom: 8,
  },
  networkErrorSubText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#4287f5",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LoginScreen;
