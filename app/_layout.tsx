import { Stack } from "expo-router";
import "@/utils/db";
import { AuthProvider } from "@/authentication";
import { PaperProvider, DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  roundness: 4,
  version: 2,
  isV3: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#606c38",
    primaryContainer: "#e9edc9",
    secondary: "#bc6c25",
    secondaryContainer: "#faedcd",
    tertiary: "#fcbf49",
    tertiaryContainer: "#eae2b7",
    surfaceVariant: "#ccd5ae",
    background: "hsl(74 21% 94%)",
    inversePrimary: "#ccd5ae",
    onSurface: "rgb(27 31 27)",
    onSurfaceVariant: "rgb(69 79 70)",
    backdrop: "rgba(50, 47, 55, 0.4)",
    outline: "rgb(117 126 116)",
    outlineVariant: "rgb(196 208 198)",
    surface: "hsl(113 69% 99%)",
    scrim: "red",
  },
};

export default function TabLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme as any}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.colors.background },
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </Stack>
      </PaperProvider>
    </AuthProvider>
  );
}
