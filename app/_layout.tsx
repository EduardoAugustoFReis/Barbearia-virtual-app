import { Stack } from "expo-router";
import AuthProvider from "@/src/context/Auth/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signUp" />
        <Stack.Screen name="(app)" />
      </Stack>
    </AuthProvider>
  );
}
