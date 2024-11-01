import Form from "./Form";
import React from "react";
import { ConnectedTextInput } from "./TextInput";
import { sendMessageToDeveloper } from "@/api";
import { useAuth } from "@/providers/auth";
import { useMessage } from "@/providers/message";
type Values = { message: string };

const ContactDeveloperForm = () => {
  const { token } = useAuth();
  const { errorBoundary } = useMessage();

  const handleSubmitMessage = async ({ message }: { message: string }) => {
    await errorBoundary(async () => {
      await sendMessageToDeveloper(token, message);
    });
  };

  // TODO: add validation. message should not be empty.
  return (
    <Form<Values>
      onSubmit={handleSubmitMessage}
      submitText="Send Message"
      initialValues={{ message: "" }}
    >
      {/* TODO: field should be a textarea */}
      <ConnectedTextInput name="message" label="Message" />
    </Form>
  );
};

export default ContactDeveloperForm;
