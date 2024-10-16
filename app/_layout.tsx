import { Stack } from "expo-router";
import "@/utils/db";
import { AuthProvider } from "@/authentication";
import { PaperProvider, MD2LightTheme } from "react-native-paper";

export default function TabLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={MD2LightTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </Stack>
      </PaperProvider>
    </AuthProvider>
  );
}
