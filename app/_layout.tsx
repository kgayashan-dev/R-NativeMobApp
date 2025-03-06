// app/_layout.tsx
import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      {" "}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" options={{ title: "" }} />
        {/* <Stack.Screen name="login" options={{ title: "" }} /> */}
        <Stack.Screen name="details" options={{ title: "Details" }} />
      </Stack>
    </AuthProvider>
  );
}
