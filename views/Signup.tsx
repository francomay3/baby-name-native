import React, { useEffect, useState } from "react";
import { useAuth } from "@/authentication";
import { router } from "expo-router";
import { Container } from "@/components/layout";
import CredentialsForm from "@/components/CredentialsForm";
import { Text } from "@/components/typography";
import { Button, Card } from "react-native-paper";
import SignupForm from "@/components/form/SignupForm";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
  const { user, hasAccess, signIn } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const awaitingVerification = credentials.email !== "";
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hasAccess) {
      router.replace("/");
    }
  }, [user]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signIn(credentials.email, credentials.password);
    } catch (error) {
      router.navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitSuccess = (cr: { email: string; password: string }) => {
    console.log("onSubmitSuccess");
    setCredentials(cr);
  };

  if (awaitingVerification) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Container center>
          <Card>
            <Container center gap="lg">
              <Text align="center">
                A verification email has been sent to{" "}
                <Text bold>{credentials.email}</Text>. Please click on the link
                in the email to verify your account, then return to this app and
                click on the login button!
              </Text>
              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
              >
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
