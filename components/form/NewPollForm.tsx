import Form from "./Form";
import React from "react";
import { ConnectedTextInput } from "./TextInput";
import { composeValidators, getFormValidate, required } from "./validators";
import { createPoll } from "@/api";
import { useAuth } from "@/providers/auth";
import { useMessage } from "@/providers/message";

type Values = {
  title: string;
  avatar: string;
};

const validate = getFormValidate({
  title: composeValidators(required),
} as Record<keyof Values, any>);

const NewPollForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { user, token } = useAuth();
  const { errorBoundary } = useMessage();

  const handleNewPoll = async ({ title, avatar }: Values) => {
    await errorBoundary(async () => {
      if (!user?.id) {
        throw new Error("User ID not provided");
      }
      await createPoll(token, user.id, title, avatar);
      onSuccess();
    });
  };

  return (
    <Form<Values>
      validate={validate}
      onSubmit={handleNewPoll}
      submitText="Create Poll"
      initialValues={{ title: "", avatar: "" }}
    >
      <ConnectedTextInput name="title" label="Title" />
      {/* TODO: Add avatar picker */}
      <ConnectedTextInput name="avatar" label="Avatar" />
    </Form>
  );
};

export default NewPollForm;
