import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import {
  composeValidators,
  emailFormat,
  getFormValidate,
  required,
} from "./validators";
import { FirebaseError } from "firebase/app";
import errorMessageMap from "@/utils/errorMessageMap";

type Values = {
  email: string;
};

const validate = getFormValidate({
  email: composeValidators(required, emailFormat),
});

const InviteFriend = async (email: string) => {
  console.log(email);
};

const InviteFriendForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleInviteFriend = async ({ email }: { email: string }) => {
    setErrorMessage("");
    try {
      await InviteFriend(email);
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
      onSubmit={handleInviteFriend}
      submitText="Send Invite"
      initialValues={{ email: "" }}
      errorMessage={errorMessage}
    >
      <ConnectedTextInput name="email" label="Email" />
    </Form>
  );
};

export default InviteFriendForm;
