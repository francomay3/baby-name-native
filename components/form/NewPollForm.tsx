import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import { composeValidators, getFormValidate, required } from "./validators";
import { FirebaseError } from "firebase/app";
import errorMessageMap from "@/utils/errorMessageMap";
import { createPoll } from "@/api";
import { useAuth } from "@/authentication";

type Values = {
  title: string;
  avatar: string;
};

const validate = getFormValidate({
  title: composeValidators(required),
} as Record<keyof Values, any>);

const NewPollForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user, token } = useAuth();

  const handleNewPoll = async ({ title, avatar }: Values) => {
    setErrorMessage("");
    try {
      if (!user?.id) {
        throw new Error("User ID not provided");
      }
      await createPoll(token, user.id, title, avatar);
      onSuccess();
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
      onSubmit={handleNewPoll}
      submitText="Create Poll"
      initialValues={{ title: "", avatar: "" }}
      errorMessage={errorMessage}
    >
      <ConnectedTextInput name="title" label="Title" />
      {/* TODO: Add avatar picker */}
      <ConnectedTextInput name="avatar" label="Avatar" />
    </Form>
  );
};

export default NewPollForm;
