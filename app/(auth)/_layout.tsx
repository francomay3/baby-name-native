import { router, Stack } from "expo-router";
import { useAuth } from "@/authentication";
import { useEffect } from "react";
import { useRootNavigationState } from "expo-router";
import Loader from "@/components/Loader";
import header from "@/components/Header";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const { hasAccess, loading } = useAuth();
  const rootNavigationState = useRootNavigationState();
  const theme = useTheme();
  useEffect(() => {
    if (rootNavigationState?.key && hasAccess && !loading) {
      router.replace("/polls");
    }
  }, [hasAccess, loading, rootNavigationState?.key]);

  if (!rootNavigationState?.key) return <Loader />;

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
