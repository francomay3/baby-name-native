import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import { sendMessageToDeveloper } from "@/api";
import { useAuth } from "@/authentication";

type Values = { name: string; message: string };

const ContactDeveloperForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const handleSubmitMessage = async ({
    name,
    message,
  }: {
    name: string;
    message: string;
  }) => {
    setErrorMessage("");
    try {
      await sendMessageToDeveloper(name, user?.email!, message);
    } catch (error) {
      // TODO: implement
    }
  };

  return (
    <Form<Values>
      onSubmit={handleSubmitMessage}
      submitText="Send Message"
      initialValues={{ name: "", message: "" }}
      errorMessage={errorMessage}
    >
      <ConnectedTextInput name="name" label="Name" />
      <ConnectedTextInput name="message" label="Message" />
    </Form>
  );
};

export default ContactDeveloperForm;
