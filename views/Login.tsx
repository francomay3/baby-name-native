import React, { useEffect } from "react";
import { useAuth } from "@/authentication";
import { router } from "expo-router";
import { Container, Flex } from "@/components/layout";
import CredentialsForm from "@/components/CredentialsForm";
import LoginForm from "@/components/form/LoginForm";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const { user, hasAccess } = useAuth();

  useEffect(() => {
    if (hasAccess) {
      router.navigate("/");
    }
  }, [user]);

  const handleSignup = async () => {
    router.navigate("/signup");
  };

  const handleForgotPassword = async () => {
    router.navigate("/forgot-password");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container center>
        <CredentialsForm
          title="Welcome Back to Baby Poll!"
          form={<LoginForm />}
          alternatives={[
            { title: "Forgot Password?", onPress: handleForgotPassword },
            { title: "Sign Up", onPress: handleSignup },
          ]}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Login;
