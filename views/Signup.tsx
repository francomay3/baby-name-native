import React, { useEffect, useState } from "react";
import { useAuth } from "@/authentication";
import { router } from "expo-router";
import { Container } from "@/components/layout";
import CredentialsCard from "@/components/CredentialsCard";
import { Text } from "@/components/typography";
import { Button, Card } from "react-native-paper";
import SignupForm from "@/components/form/SignupForm";

const Signup = () => {
  const { user, hasAccess } = useAuth();
  const [awaitingVerification, setAwaitingVerification] = useState(false);
  useEffect(() => {
    if (hasAccess) {
      router.push("/");
    }
  }, [user]);

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
        title="Sign Up"
        form={
          <SignupForm onSubmitSuccess={() => setAwaitingVerification(true)} />
        }
        alternatives={[
          { title: "Log In", onPress: handleLogin },
          // { title: "Forgot Password", onPress: handleForgotPassword },
        ]}
      />
    </Container>
  );
};

export default Signup;
