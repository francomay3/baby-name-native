import React, { useEffect, useState } from "react";
import { useAuth } from "@/authentication";
import { router } from "expo-router";
import { Container } from "@/components/layout";
import { FirebaseError } from "firebase/app";
import CredentialsCard from "@/components/CredentialsCard";
import errorMessageMap from "@/utils/errorMessageMap";
import LoginForm from "@/components/form/LoginForm";

const Login = () => {
  const { signIn, user, hasAccess } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (hasAccess) {
      router.replace("/");
    }
  }, [user]);

  const handleLogin = async (email: string, password: string) => {
    setErrorMessage("");
    try {
      await signIn(email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code as keyof typeof errorMessageMap;
        setErrorMessage(errorMessageMap[errorCode]);
      } else {
        setErrorMessage(errorMessageMap["unknown"]);
      }
    }
  };

  const handleSignup = async () => {
    router.push("/signup");
  };

  return (
    <Container center>
      <CredentialsCard
        title="Log In"
        form={<LoginForm />}
        alternatives={[
          { title: "Sign Up", onPress: handleSignup },
          // { title: "Forgot Password", onPress: handleForgotPassword },
        ]}
      />
    </Container>
  );
};

export default Login;
