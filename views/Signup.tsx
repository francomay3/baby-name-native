import React, { useEffect, useState } from "react";
import { useAuth } from "@/authentication";
import { Link, router } from "expo-router";
import { Column, Container, Row } from "@/components/layout";
import { FirebaseError } from "firebase/app";
import CredentialsCard from "@/components/CredentialsCard";
import { Text } from "@/components/typography";
import { Button, Card } from "react-native-paper";

export default function Signup() {
  const { signUp, user, hasAccess } = useAuth();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [awaitingVerification, setAwaitingVerification] = useState(false);

  useEffect(() => {
    if (hasAccess) {
      router.push("/");
    }
  }, [user]);

  const handleSignup = async (email: string, password: string) => {
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage("");
    try {
      await signUp(email, password);
      setAwaitingVerification(true);
    } catch (error) {
      let errorMessage = "";
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        switch (errorCode) {
          // TODO: Add more error handling
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            setEmailError(true);
            break;
          default:
            errorMessage = "Something went wrong. Please try again.";
        }
      }
      setErrorMessage(errorMessage);
    }
  };

  const handleLogin = async () => {
    router.replace("/login");
  };

  if (awaitingVerification) {
    return (
      <Container center>
        <Card>
          <Container center gap="lg">
            <Text align="center">
              A verification email has been sent to your address. Please click
              on the link in the email to verify your account, then return to
              this app and log in!
            </Text>
            <Button mode="contained" onPress={handleLogin}>
              Log In
            </Button>
          </Container>
        </Card>
      </Container>
    );
  }

  return (
    <Container center>
      <CredentialsCard
        errorMessage={errorMessage}
        emailError={emailError}
        passwordError={passwordError}
        title="Sign Up"
        onSubmit={handleSignup}
        alternatives={[
          { title: "Log In", onPress: handleLogin },
          // { title: "Forgot Password", onPress: handleForgotPassword },
        ]}
      />
    </Container>
  );
}
