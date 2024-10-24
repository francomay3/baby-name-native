import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";
import header from "@/components/Header";

export default function PollsLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        header,
        contentStyle: { backgroundColor: theme.colors.surface },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Polls",
        }}
      />
      <Stack.Screen
        name="[pollId]"
        options={{
          title: "Poll Details",
        }}
      />
    </Stack>
  );
}
