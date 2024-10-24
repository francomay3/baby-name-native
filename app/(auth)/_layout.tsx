import { router, Stack } from "expo-router";
import { useAuth } from "@/authentication";
import { useEffect } from "react";
import { useRootNavigationState } from "expo-router";
import Loader from "@/components/Loader";

export default function TabLayout() {
  const { hasAccess, loading } = useAuth();
  const rootNavigationState = useRootNavigationState();

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
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
