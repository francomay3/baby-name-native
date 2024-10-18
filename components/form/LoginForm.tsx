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
import { TextInput, useTheme } from "react-native-paper";

type Values = {
  email: string;
  password: string;
};

const validate = getFormValidate([
  { key: "email", validator: composeValidators(required, emailFormat) },
  { key: "password", validator: composeValidators(required) },
]);

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signIn } = useAuth();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();

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

  const eyeIcon = (
    <TextInput.Icon
      icon={secureTextEntry ? "eye-off" : "eye"}
      onPress={() => setSecureTextEntry((prev) => !prev)}
      color={theme.colors.backdrop}
    />
  );

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
        name="password"
        label="Password"
        secureTextEntry={secureTextEntry}
        right={eyeIcon}
      />
    </Form>
  );
};

export default LoginForm;
