import { Box, Column, Container, Row } from "@/components/layout";
import { Text } from "@/components/typography";
import React from "react";
import { Title, useTheme } from "react-native-paper";

const dev = () => {
  const theme = useTheme();

  return (
    <Container center>
      <Column gap="sm">
        <Title>Colors</Title>
        <Box>
          {Object.entries(theme.colors).map(
            ([key, color]) =>
              typeof color === "string" && (
                <Row
                  key={key}
                  align="center"
                  justify="between"
                  gap="sm"
                  w="100%"
                >
                  <Box w={10} h={10} bg={color} />
                  <Text>{key}</Text>
                </Row>
              )
          )}
        </Box>
      </Column>
    </Container>
  );
};

export default dev;
