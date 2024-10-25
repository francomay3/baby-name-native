import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import { FirebaseError } from "firebase/app";
import errorMessageMap from "@/utils/errorMessageMap";
import { updateProfile } from "@/database";
import { useAuth } from "@/authentication";

type Values = { name: string; avatar: string; subtitle: string };

const EditProfileForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const handleEditProfile = async ({
    name,
    avatar,
    subtitle,
  }: {
    name: string;
    avatar: string;
    subtitle: string;
  }) => {
    setErrorMessage("");
    try {
      await updateProfile(user?.id!, name, subtitle, avatar);
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
      initialValues={{ name: "", avatar: "", subtitle: "" }}
      errorMessage={errorMessage}
    >
      <ConnectedTextInput name="name" label="Name" />
      {/* TODO: Add avatar picker */}
      <ConnectedTextInput name="avatar" label="Avatar" />
      <ConnectedTextInput name="subtitle" label="Subtitle" />
    </Form>
  );
};

export default EditProfileForm;
