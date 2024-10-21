import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import { composeValidators, getFormValidate, required } from "./validators";
import { FirebaseError } from "firebase/app";
import errorMessageMap from "@/utils/errorMessageMap";

type Values = {
  name: string;
  description: string;
};

const validate = getFormValidate({
  name: composeValidators(required),
  description: composeValidators(required),
});

const CreatePoll = async (name: string, description: string) => {
  console.log(name, description);
};

const NewPollForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewPoll = async ({
    name,
    description,
  }: {
    name: string;
    description: string;
  }) => {
    setErrorMessage("");
    try {
      await CreatePoll(name, description);
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
      initialValues={{ name: "", description: "" }}
      errorMessage={errorMessage}
    >
      <ConnectedTextInput name="name" label="Name" />
      <ConnectedTextInput name="description" label="Description" />
    </Form>
  );
};

export default NewPollForm;
