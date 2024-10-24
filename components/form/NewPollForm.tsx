import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import { composeValidators, getFormValidate, required } from "./validators";
import { FirebaseError } from "firebase/app";
import errorMessageMap from "@/utils/errorMessageMap";
import { Poll } from "@/database";

type Values = Omit<Poll, "id" | "ownerId">;

const validate = getFormValidate({
  title: composeValidators(required),
  avatar: composeValidators(required),
} as Record<keyof Values, any>);

const CreatePoll = async (title: string, avatar: string) => {
  // TODO: create poll in the database
  console.log(title, avatar);
};

const NewPollForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewPoll = async ({
    title,
    avatar,
  }: {
    title: string;
    avatar: string;
  }) => {
    setErrorMessage("");
    try {
      await CreatePoll(title, avatar);
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
