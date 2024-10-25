import { Redirect, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/authentication";
import TabBar from "@/components/TabBar";
import header from "@/components/Header";
// only to get type safety for the icon names
const icon = (name: keyof typeof FontAwesome.glyphMap) => name;

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
          icon: icon("list-ul"),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          // @ts-ignore
          icon: icon("group"),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: true,
          header,
          // @ts-ignore
          icon: icon("user"),
        }}
      />
    </Tabs>
  );
}
