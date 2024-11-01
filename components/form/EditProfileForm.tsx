import React from "react";
import { ConnectedTextInput } from "./TextInput";
import { updateProfile } from "@/api";
import { useAuth } from "@/providers/auth";
import { Formik, FormikProps } from "formik";
import { Button } from "react-native-paper";
import { Column } from "../layout";

type Values = { name: string; subtitle: string };

const EditProfileForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { user, token } = useAuth();

  const handleEditProfile = async ({
    name,
    subtitle,
  }: {
    name: string;
    subtitle: string;
  }) => {
    if (!user?.id) {
      throw new Error("User ID not provided");
    }
    await updateProfile({ token, uid: user.id, name, subtitle });
    onSuccess();
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
