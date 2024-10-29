import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@/authentication";
import TabBar from "@/components/TabBar";
import header from "@/components/Header";

export default function TabLayout() {
  const { hasAccess, loading } = useAuth();

  if (!hasAccess && !loading) return <Redirect href="/login" />;

  return (
    <Tabs tabBar={TabBar} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="polls"
        options={{
          title: "Polls",
          // @ts-ignore
          icon: "chart-bar",
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          // @ts-ignore
          icon: "account-group",
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: true,
          header,
          // @ts-ignore
          icon: "account",
        }}
      />
    </Tabs>
  );
}
