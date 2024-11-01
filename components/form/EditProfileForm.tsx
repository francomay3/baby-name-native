import React, { useState } from "react";
import { ConnectedTextInput } from "./TextInput";
import { FirebaseError } from "firebase/app";
import errorMessageMap from "@/utils/errorMessageMap";
import { updateProfile } from "@/api";
import { useAuth } from "@/authentication";

import { Formik, FormikProps } from "formik";
import { Button } from "react-native-paper";
import { Column } from "../layout";
import { Text } from "../typography";

type Values = { name: string; subtitle: string };

const EditProfileForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const { user, token } = useAuth();

  const handleEditProfile = async ({
    name,
    subtitle,
  }: {
    name: string;
    subtitle: string;
  }) => {
    setErrorMessage("");
    try {
      if (!user?.id) {
        throw new Error("User ID not provided");
      }
      await updateProfile({ token, uid: user.id, name, subtitle });
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
    <Formik
      initialValues={{
        name: user?.name!,
        subtitle: user?.subtitle!,
      }}
      onSubmit={handleEditProfile}
    >
      {(props: FormikProps<Values>) => (
        <Column gap="md" align="stretch" w="100%">
          {errorMessage ? <Text c="error">{errorMessage}</Text> : null}
          <ConnectedTextInput
            name="name"
            label="Name"
            placeholder={user?.name}
            {...props}
          />
          <ConnectedTextInput
            name="subtitle"
            label="Subtitle"
            placeholder={user?.subtitle}
            {...props}
          />
          <Button
            loading={props.isSubmitting}
            mode="contained"
            // @ts-ignore
            onPress={props.handleSubmit}
          >
            Submit
          </Button>
        </Column>
      )}
    </Formik>
  );
};

export default EditProfileForm;
