import React, { useEffect, useState } from "react";
import { useAuth } from "@/authentication";
import { router } from "expo-router";
import { Container } from "@/components/layout";
import { FirebaseError } from "firebase/app";
import CredentialsCard from "@/components/CredentialsCard";

export default function Login() {
  const { signIn, user, hasAccess } = useAuth();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(hasAccess);

  useEffect(() => {
    if (hasAccess) {
      router.replace("/");
    }
  }, [user]);

  const handleLogin = async (email: string, password: string) => {
    setEmailError(false);
    setPasswordError(false);
    setErrorMessage("");
    try {
      await signIn(email, password);
    } catch (error) {
      let errorMessage = "";
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
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
      setErrorMessage(errorMessage);
    }
  };

  const handleSignup = async () => {
    router.push("/signup");
  };

  return (
    <Container center>
      <CredentialsCard
        errorMessage={errorMessage}
        emailError={emailError}
        passwordError={passwordError}
        title="Log In"
        onSubmit={handleLogin}
        alternatives={[
          { title: "Sign Up", onPress: handleSignup },
          // { title: "Forgot Password", onPress: handleForgotPassword },
        ]}
      />
    </Container>
  );
}
