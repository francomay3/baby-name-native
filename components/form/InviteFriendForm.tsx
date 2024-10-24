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
  // TODO: send a friend request to the user with the given email.
  // if the user is already a friend or already received a friend request, do nothing.
  // if the user does not exist, send an email to the user with the given email.
  // if the user exists and is not a friend, send a push notification to the wannabe friend.
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
