import React, { useEffect, useState } from "react";
import { useAuth } from "@/authentication";
import { router } from "expo-router";
import { Container } from "@/components/layout";
import CredentialsForm from "@/components/CredentialsForm";
import { Bold, Text } from "@/components/typography";
import { Button, Card } from "react-native-paper";
import SignupForm from "@/components/form/SignupForm";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const { user, hasAccess } = useAuth();
  const [email, setEmail] = useState("");
  const awaitingVerification = email !== "";

  useEffect(() => {
    if (hasAccess) {
      router.navigate("/");
    }
  }, [user]);

  const handleLogin = async () => {
    router.navigate("/login");
  };

  const onSubmitSuccess = ({ email }: { email: string }) => {
    setEmail(email);
  };

  if (awaitingVerification) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container center>
          <Card>
            <Container center gap="lg">
              <Text align="center">
                A verification email has been sent to <Bold>{email}</Bold>.
                Please click on the link in the email to verify your account,
                then return to this app and log in!
              </Text>
              <Button mode="contained" onPress={handleLogin}>
                Log In
              </Button>
            </Container>
          </Card>
        </Container>
      </SafeAreaView>
    );
  }

  return (
    <Container center>
      <CredentialsForm
        title="Sign Up"
        form={<SignupForm onSubmitSuccess={onSubmitSuccess} />}
        alternatives={[
          { title: "Log In", onPress: handleLogin },
          // TODO: Add forgot password
          // { title: "Forgot Password", onPress: handleForgotPassword },
        ]}
      />
    </Container>
  );
};

export default Signup;
