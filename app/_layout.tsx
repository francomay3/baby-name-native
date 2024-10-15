import { Stack } from "expo-router";
import "@/utils/db";
import { AuthProvider } from "@/authentication";
export default function TabLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </AuthProvider>
  );
}
