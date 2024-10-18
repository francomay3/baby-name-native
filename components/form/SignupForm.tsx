import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import {
  composeValidators,
  emailFormat,
  required,
  matches,
  getFormValidate,
} from "./validators";
import { useAuth } from "@/authentication";
import { FirebaseError } from "firebase/app";
import errorMessageMap from "@/utils/errorMessageMap";
import { TextInput, useTheme } from "react-native-paper";

type Values = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<Values>;

const validate = getFormValidate([
  { key: "email", validator: composeValidators(required, emailFormat) },
  { key: "password", validator: composeValidators(required) },
  {
    key: "confirmPassword",
    validator: composeValidators(required, matches("password")),
  },
]);

const SignupForm = ({
  onSubmitSuccess,
  onSubmitFailure,
}: {
  onSubmitSuccess?: () => void;
  onSubmitFailure?: () => void;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const theme = useTheme();
  const { signUp } = useAuth();
  const handleSignup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setErrorMessage("");
    try {
      await signUp(email, password);
      onSubmitSuccess?.();
    } catch (error) {
      onSubmitFailure?.();
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
      onSubmit={handleSignup}
      submitText="Sign Up"
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      errorMessage={errorMessage}
      onSubmitSuccess={onSubmitSuccess}
      onSubmitFailure={onSubmitFailure}
      validate={validate}
    >
      <ConnectedTextInput name="email" label="Email" />
      <ConnectedTextInput
        name="password"
        label="Password"
        secureTextEntry={secureTextEntry}
        right={eyeIcon}
      />
      <ConnectedTextInput
        name="confirmPassword"
        label="Confirm Password"
        secureTextEntry={secureTextEntry}
        right={eyeIcon}
      />
    </Form>
  );
};

export default SignupForm;
