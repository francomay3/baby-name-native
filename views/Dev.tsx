import { Box, Column, Row } from "@/components/layout";
import { Text } from "@/components/typography";
import { resetDatabase } from "@/api";
import React from "react";
import { ScrollView } from "react-native";
import { useTheme, Button } from "react-native-paper";
import { useAuth } from "@/authentication";
const dev = () => {
  const theme = useTheme();
  const { token } = useAuth();
  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Column gap="sm">
        <Text variant="headlineMedium">Colors</Text>
        <Box>
          {Object.keys(theme.colors).map((key) => (
            <Row
              key={key}
              align="center"
              justify="space-between"
              gap="sm"
              w="100%"
            >
              <Box w={30} h={30} bg={key as keyof typeof theme.colors} />
              <Text>{key}</Text>
            </Row>
          ))}
        </Box>
      </Column>
      <Button onPress={() => resetDatabase(token)}>Reset Database</Button>
    </ScrollView>
  );
};

export default dev;
