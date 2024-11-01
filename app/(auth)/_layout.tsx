import { router, Stack } from "expo-router";
import { useAuth } from "@/providers/auth";
import { useEffect } from "react";
import { useRootNavigationState } from "expo-router";
import header from "@/components/Header";
import { useTheme } from "react-native-paper";
import Loading from "@/views/Loading";

export default function TabLayout() {
  const { hasAccess } = useAuth();
  const rootNavigationState = useRootNavigationState();
  const theme = useTheme();
  useEffect(() => {
    if (rootNavigationState?.key && hasAccess) {
      router.replace("/polls");
    }
  }, [hasAccess, rootNavigationState?.key]);

  if (!rootNavigationState?.key) return <Loading />;

  return (
    <Stack
      screenOptions={{
        title: "Authentication",
        header,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
