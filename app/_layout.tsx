import { Stack } from "expo-router";
import { AuthProvider } from "@/authentication";
import { PaperProvider } from "react-native-paper";
import theme from "@/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.surface },
            }}
          >
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="forgot-password" />
          </Stack>
        </SafeAreaView>
      </PaperProvider>
    </AuthProvider>
  );
}
