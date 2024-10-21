import { Redirect, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import { useAuth } from "@/authentication";

const icon =
  (name: keyof typeof FontAwesome.glyphMap) =>
  ({ color }: { color: string }) => (
    <FontAwesome name={name} size={28} color={color} />
  );

export default function TabLayout() {
  const theme = useTheme();
  const { hasAccess } = useAuth();

  if (!hasAccess) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.outline,
          height: 70,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceDisabled,
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.onBackground,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="polls"
        options={{
          title: "Polls",
          tabBarIcon: icon("list-ul"),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          tabBarIcon: icon("group"),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "User",
          tabBarIcon: icon("user"),
        }}
      />
    </Tabs>
  );
}
