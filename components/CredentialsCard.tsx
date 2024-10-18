import React from "react";
import { Column, Row, Divider } from "@/components/layout";
import { faces } from "@/database/db";
import { Image } from "react-native";
import { Card, Button } from "react-native-paper";
import { Text } from "@/components/typography";
import { useTheme } from "react-native-paper";

type Alternative = {
  title: string;
  onPress: () => void;
};

export default function CredentialsCard({
  title,
  alternatives,
  form,
}: {
  title: string;
  form: React.ReactNode;
  alternatives: Alternative[];
}) {
  return (
    <Card>
      <Card.Title title={title} />
      <Card.Content>
        <Column w="300px" mw="100%" align="stretch" gap="md">
          <Row align="center" justify="center">
            <Image
              source={faces[Math.floor(Math.random() * faces.length)]}
              style={{ borderRadius: 9999, width: 54, height: 54 }}
            />
          </Row>
          {form}
        </Column>
      </Card.Content>
      <Divider margin="md" />
      <Card.Content>
        <Column w="100%" align="stretch" gap="md">
          {alternatives && (
            <>
              <Text align="center">Or</Text>
              {alternatives.map(({ title, onPress }) => (
                <Button key={title} mode="outlined" onPress={onPress}>
                  {title}
                </Button>
              ))}
            </>
          )}
        </Column>
      </Card.Content>
    </Card>
  );
}
