import { Stack } from "expo-router";
import { AuthProvider } from "@/authentication";
import { PaperProvider } from "react-native-paper";
import theme from "@/utils/theme";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import header from "@/components/Header";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useFonts } from "expo-font";

const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    afacad: require("@/assets/fonts/Afacad.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  const isDark = colorScheme === "dark";
  const currentTheme = isDark ? theme.dark : theme.light;

  if (!loaded && !error) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider theme={currentTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: currentTheme.colors.surface },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="dev" options={{ headerShown: true, header }} />
          </Stack>
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
