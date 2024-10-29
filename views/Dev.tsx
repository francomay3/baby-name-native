import { Box, Column, Row } from "@/components/layout";
import { Text } from "@/components/typography";
import React from "react";
import { ScrollView } from "react-native";
import { Title, useTheme } from "react-native-paper";

const dev = () => {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ width: "100%" }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <Column gap="sm">
        <Title>Colors</Title>
        <Box>
          {Object.keys(theme.colors).map((key) => (
            <Row
              key={key}
              align="center"
              justify="space-between"
              gap="sm"
              w="100%"
            >
              <Box w={30} h={30} bg={key as any} />
              <Text>{key}</Text>
            </Row>
          ))}
        </Box>
      </Column>
    </ScrollView>
  );
};

export default dev;
