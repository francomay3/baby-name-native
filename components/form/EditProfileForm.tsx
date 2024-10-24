import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import { FirebaseError } from "firebase/app";
import errorMessageMap from "@/utils/errorMessageMap";

type Values = { name: string; avatar: string };

const EditProfile = async (name: string, avatar: string) => {
  // TODO: edit profile in the database
  console.log(name, avatar);
};

const EditProfileForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditProfile = async ({
    name,
    avatar,
  }: {
    name: string;
    avatar: string;
  }) => {
    setErrorMessage("");
    try {
      await EditProfile(name, avatar);
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
      onSubmit={handleEditProfile}
      submitText="Submit"
      initialValues={{ name: "", avatar: "" }}
      errorMessage={errorMessage}
    >
      <ConnectedTextInput name="name" label="Name" />
      {/* TODO: Add avatar picker */}
      <ConnectedTextInput name="avatar" label="Avatar" />
    </Form>
  );
};

export default EditProfileForm;
