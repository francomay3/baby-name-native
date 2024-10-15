import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "@/authentication";
import { router } from "expo-router";
import { TextInput, Button, Text } from "@/components/ui/typography";
import { Card, Column, Divider, PageContainer } from "@/components/ui/layout";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();

  const handleSignup = async () => {
    try {
      console.log("email", email);
      console.log("password", password);
      // await signUp(email, password);
      // router.replace("/");
    } catch (error) {
      // console.error("Login error:", error);
    }
  };

  const handleLogin = async () => {
    router.push("/login");
  };

  return (
    <PageContainer center>
      <Card>
        <Column w="300px" maxW="100%" align="stretch" gap={16}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoFocus
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button onPress={handleSignup}>Sign Up</Button>
          <Divider />
          <Text align="center">Already have an account?</Text>
          <Button onPress={handleLogin}>Log In</Button>
        </Column>
      </Card>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
