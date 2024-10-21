import React, { useEffect } from "react";
import { useAuth } from "@/authentication";
import { router } from "expo-router";
import { Container } from "@/components/layout";
import CredentialsForm from "@/components/CredentialsForm";
import LoginForm from "@/components/form/LoginForm";

const Login = () => {
  const { user, hasAccess } = useAuth();

  useEffect(() => {
    if (hasAccess) {
      router.replace("/");
    }
  }, [user]);

  const handleSignup = async () => {
    router.push("/signup");
  };

  const handleForgotPassword = async () => {
    router.push("/forgot-password");
  };

  return (
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
  );
};

export default Login;
