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

type Values = {
  email: string;
  password: string;
  confirmPassword: string;
};

const validate = getFormValidate({
  email: composeValidators(required, emailFormat),
  password: composeValidators(required),
  confirmPassword: composeValidators(required, matches("password")),
});

const SignupForm = ({
  onSubmitSuccess,
}: {
  onSubmitSuccess?: (values: Values) => void;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { signUp } = useAuth();
  const handleSignup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setErrorMessage("");
    await signUp(email, password);
  };

  const onSubmitFailure = (error: unknown) => {
    if (error instanceof FirebaseError) {
      const errorCode = error.code as keyof typeof errorMessageMap;
      setErrorMessage(errorMessageMap[errorCode]);
    } else {
      setErrorMessage(errorMessageMap["unknown"]);
    }
  };

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
        autoCapitalize="none"
        name="password"
        label="Password"
        secureTextEntry
      />
      <ConnectedTextInput
        autoCapitalize="none"
        name="confirmPassword"
        label="Confirm Password"
        secureTextEntry
      />
    </Form>
  );
};

export default SignupForm;
