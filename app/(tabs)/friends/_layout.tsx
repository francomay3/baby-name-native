import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import header from "@/components/Header";

export default function PollsLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        header,
        headerStyle: { backgroundColor: theme.colors.elevation.level1 },
        headerTintColor: theme.colors.onSurface,
        contentStyle: { backgroundColor: theme.colors.surface },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Friends",
        }}
      />
      <Stack.Screen
        name="[friendId]"
        options={{
          title: "Friend Details",
        }}
      />
    </Stack>
  );
}
