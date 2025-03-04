// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{ title: "" }} />
      <Stack.Screen name="details" options={{ title: "Details" }} />
    </Stack>
  );
}
