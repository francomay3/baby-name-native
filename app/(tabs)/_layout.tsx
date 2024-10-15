import { Tabs } from "expo-router";
import { Text } from "react-native";

// const Icon = ({ children }: { children: React.ReactNode }) => (
//   <Text style={{ fontSize: 24 }}>{children}</Text>
// );

const Icon = (icon: string) => () =>
  <Text style={{ fontSize: 24 }}>{icon}</Text>;

export default function TabLayout() {
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
