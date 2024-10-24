import { Redirect, Tabs, useNavigation } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuth } from "@/authentication";
import TabBar from "@/components/TabBar";
import { useTheme } from "react-native-paper";

// only to get type safety for the icon names
const icon = (name: keyof typeof FontAwesome.glyphMap) => name;

export default function TabLayout() {
  const theme = useTheme();
  const { hasAccess } = useAuth();

  if (!hasAccess) return <Redirect href="/login" />;

  return (
    <Tabs tabBar={TabBar} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="polls"
        options={{
          title: "Polls",
          // @ts-ignore
          icon: icon("list-ul"),
          color: theme.colors.onPrimary,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: "Friends",
          // @ts-ignore
          icon: icon("group"),
          color: theme.colors.onPrimary,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          // @ts-ignore
          icon: icon("user"),
          color: theme.colors.onPrimary,
        }}
      />
    </Tabs>
  );
}
