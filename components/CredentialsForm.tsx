import React from "react";
import { Column, Row, Divider, Box } from "@/components/layout";
import { Image } from "react-native";
import { Button, Title } from "react-native-paper";
import { Text } from "@/components/typography";

const logo = require("@/assets/images/faces/1.png");

type Alternative = {
  title: string;
  onPress: () => void;
};

export default function CredentialsForm({
  title,
  alternatives,
  form,
}: {
  title: string;
  form: React.ReactNode;
  alternatives: Alternative[];
}) {
  return (
    <Column w="100%" mw="350px" align="center" gap="md">
      <Row align="center" justify="center" gap="md" w="100%">
        <Title>{title}</Title>
        <Image
          source={logo}
          style={{ borderRadius: 9999, width: 54, height: 54 }}
        />
      </Row>
      <Box w="100%">{form}</Box>
      {alternatives && (
        <>
          <Row align="center" gap="sm" w="100%">
            <Divider flex={1} />
            <Text flex={0}>Or</Text>
            <Divider flex={1} />
          </Row>
          {alternatives.map(({ title, onPress }) => (
            <Button key={title} mode="outlined" onPress={onPress}>
              {title}
            </Button>
          ))}
        </>
      )}
    </Column>
  );
}
