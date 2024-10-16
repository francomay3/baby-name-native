import { Redirect, Tabs } from "expo-router";
import { Text } from "react-native";
import { useAuth } from "@/authentication";

const Icon = (icon: string) => () => (
  <Text style={{ fontSize: 24 }}>{icon}</Text>
);

export default function TabLayout() {
  const { hasAccess } = useAuth();

  if (!hasAccess) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="ranking"
        options={{
          title: "Ranking",
          tabBarIcon: Icon("🏆"),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Match",
          tabBarIcon: Icon("🥊"),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: Icon("👤"),
        }}
      />
    </Tabs>
  );
}
