import Form from "./Form";
import React from "react";
import { ConnectedTextInput } from "./TextInput";
import {
  composeValidators,
  emailFormat,
  getFormValidate,
  required,
} from "./validators";

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
  const handleInviteFriend = async ({ email }: { email: string }) => {
    await InviteFriend(email);
  };

  return (
    <Form<Values>
      validate={validate}
      onSubmit={handleInviteFriend}
      submitText="Send Invite"
      initialValues={{ email: "" }}
    >
      <ConnectedTextInput name="email" label="Email" />
    </Form>
  );
};

export default InviteFriendForm;
