import React, { useState } from "react";
import { Column, Row, Divider } from "@/components/layout";
import { faces } from "@/database/db";
import { Image } from "react-native";
import { Card, TextInput, Button } from "react-native-paper";
import { Text } from "@/components/typography";
import Loader from "./Loader";

export default function CredentialsCard({
  title,
  onSubmit,
  alternatives,
  errorMessage,
  emailError,
  passwordError,
}: {
  errorMessage?: string;
  emailError?: boolean;
  passwordError?: boolean;
  title: string;
  onSubmit: (email: string, password: string) => Promise<void>;
  alternatives: {
    title: string;
    onPress: () => void;
  }[];
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInputing, setIsInputing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSetPassword = (password: string) => {
    if (!isInputing) {
      setIsInputing(true);
    }
    setPassword(password);
  };

  const handleSetEmail = (email: string) => {
    if (!isInputing) {
      setIsInputing(true);
    }
    setEmail(email);
  };

  const handleSubmit = async () => {
    if (isInputing) {
      setIsInputing(false);
      setLoading(true);
    }
    await onSubmit(email, password);
    setLoading(false);
  };

  if (loading) return <Loader />;

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
          {errorMessage && !isInputing && <Text c="red">{errorMessage!}</Text>}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={handleSetEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoFocus
            error={emailError}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={handleSetPassword}
            secureTextEntry
            autoComplete="password"
            error={passwordError}
          />
          <Button mode="contained" onPress={handleSubmit}>
            {title}
          </Button>
        </Column>
      </Card.Content>
      <Divider margin="md" />
      <Card.Content>
        <Column w="100%" align="stretch" gap="md">
          {alternatives && (
            <>
              <Text align="center">Or</Text>
              {alternatives.map(({ title, onPress }) => (
                <Button key={title} mode="contained" onPress={onPress}>
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
