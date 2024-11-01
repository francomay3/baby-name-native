import Form from "./Form";
import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import { sendMessageToDeveloper } from "@/api";
import { useAuth } from "@/authentication";

type Values = { message: string };

const ContactDeveloperForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useAuth();

  const handleSubmitMessage = async ({ message }: { message: string }) => {
    setErrorMessage("");
    try {
      await sendMessageToDeveloper(token, message);
    } catch (error) {
      // TODO: implement
    }
  };

  // TODO: add validation. message should not be empty.
  return (
    <Form<Values>
      onSubmit={handleSubmitMessage}
      submitText="Send Message"
      initialValues={{ message: "" }}
      errorMessage={errorMessage}
    >
      {/* TODO: field should be a textarea */}
      <ConnectedTextInput name="message" label="Message" />
    </Form>
  );
};

export default ContactDeveloperForm;
