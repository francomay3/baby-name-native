import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import {
  composeValidators,
  emailFormat,
  getFormValidate,
  required,
} from "./validators";
import { useAuth } from "@/authentication";
import { FirebaseError } from "firebase/app";
import errorMessageMap from "@/utils/errorMessageMap";

type Values = {
  email: string;
  password: string;
};

const validate = getFormValidate({
  email: composeValidators(required, emailFormat),
  password: composeValidators(required),
});

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = useAuth();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
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

  return (
    <Form<Values>
      validate={validate}
      onSubmit={handleLogin}
      submitText="Log In"
      initialValues={{ email: "", password: "" }}
      errorMessage={errorMessage}
    >
      <ConnectedTextInput name="email" label="Email" />
      <ConnectedTextInput
        autoCapitalize="none"
        name="password"
        label="Password"
        secureTextEntry
      />
    </Form>
  );
};

export default LoginForm;
