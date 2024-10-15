import React, { useState } from "react";
import { useAuth } from "@/authentication";
import { router } from "expo-router";
import { TextInput, Button, Text } from "@/components/ui/typography";
import {
  Card,
  Column,
  Divider,
  PageContainer,
  Row,
} from "@/components/ui/layout";
import { FirebaseError } from "firebase/app";
import { faces } from "@/database/db";
import { Image } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState("");
  const handleSetPassword = (password: string) => {
    setPassword(password);
    if (passwordError) {
      setPasswordError(false);
    }
  };

  const handleSetEmail = (email: string) => {
    setEmail(email);
    if (emailError) {
      setEmailError(false);
    }
  };

  const handleLogin = async () => {
    setEmailError(false);
    setPasswordError(false);
    setError("");
    try {
      await signIn(email, password);
      router.push("/");
    } catch (error) {
      let errorMessage = "";
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        console.log(errorCode);
        switch (errorCode) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            setEmailError(true);
            break;
          case "auth/user-disabled":
            errorMessage = "This user account has been disabled.";
            break;
          case "auth/user-not-found":
            errorMessage = "No user found with this email address.";
            setEmailError(true);
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            setPasswordError(true);
            break;
          case "auth/missing-password":
            errorMessage = "Please enter your password.";
            setPasswordError(true);
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many requests. Please try again later.";
            break;
          case "auth/invalid-credential":
            errorMessage = "Invalid credentials. Have you signed up?";
            break;
          default:
            errorMessage = "Something went wrong. Please try again.";
        }
      }
      setError(errorMessage);
    }
  };

  const handleSignup = async () => {
    router.push("/signup");
  };

  return (
    <PageContainer center>
      <Card>
        <Column w="300px" maxW="100%" align="stretch" gap={16}>
          <Row align="center" justify="center">
            <Image
              source={faces[Math.floor(Math.random() * faces.length)]}
              style={{ borderRadius: 9999, width: 54, height: 54 }}
            />
          </Row>
          <Text color="red">{error}</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={handleSetEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoFocus
            error={!!emailError}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={handleSetPassword}
            secureTextEntry
            autoComplete="password"
            error={!!passwordError}
          />
          <Button onPress={handleLogin}>Log In</Button>
          <Divider />
          <Text align="center">Or</Text>
          <Button onPress={handleSignup}>Sign Up</Button>
        </Column>
      </Card>
    </PageContainer>
  );
}
