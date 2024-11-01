import Form from "./Form";
import React from "react";
import { ConnectedTextInput } from "./TextInput";
import {
  composeValidators,
  emailFormat,
  required,
  matches,
  getFormValidate,
} from "./validators";
import { useAuth } from "@/providers/auth";

type Values = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const validate = getFormValidate({
  name: composeValidators(required),
  email: composeValidators(required, emailFormat),
  password: composeValidators(required),
  confirmPassword: composeValidators(required, matches("password")),
});

const SignupForm = ({
  onSubmitSuccess,
}: {
  onSubmitSuccess?: (values: Values) => void;
}) => {
  const { signUp } = useAuth();
  const handleSignup = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    await signUp(name, email, password);
  };

  return (
    <Form<Values>
      onSubmit={handleSignup}
      submitText="Sign Up"
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmitSuccess={onSubmitSuccess}
      validate={validate}
    >
      <ConnectedTextInput name="name" label="Name" />
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
