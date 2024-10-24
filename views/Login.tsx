import React from "react";
import { router } from "expo-router";
import { Container } from "@/components/layout";
import CredentialsForm from "@/components/CredentialsForm";
import LoginForm from "@/components/form/LoginForm";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const handleSignup = async () => {
    router.navigate("/signup");
  };

  const handleForgotPassword = async () => {
    router.navigate("/forgot-password");
  };

  const handleLoginWithGoogle = async () => {
    // TODO: implement login with google
    console.log("login with google");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container center>
        <CredentialsForm
          title="Welcome Back to Baby Poll!"
          form={<LoginForm />}
          alternatives={[
            { title: "Forgot Password?", onPress: handleForgotPassword },
            { title: "Login with Google", onPress: handleLoginWithGoogle },
            { title: "Sign Up", onPress: handleSignup },
          ]}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Login;
