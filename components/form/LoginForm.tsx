import Form from "./Form";
import React from "react";
import { ConnectedTextInput } from "./TextInput";
import {
  composeValidators,
  emailFormat,
  getFormValidate,
  required,
} from "./validators";
import { useAuth } from "@/providers/auth";
type Values = {
  email: string;
  password: string;
};

const validate = getFormValidate({
  email: composeValidators(required, emailFormat),
  password: composeValidators(required),
});

const LoginForm = () => {
  const { signIn } = useAuth();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await signIn(email, password);
  };

  return (
    <Form<Values>
      validate={validate}
      onSubmit={handleLogin}
      submitText="Log In"
      initialValues={{ email: "", password: "" }}
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
