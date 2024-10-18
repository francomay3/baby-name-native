import React, { useState } from "react";
import { Formik, Form as FormikForm, FormikProps } from "formik";
import { Button, useTheme } from "react-native-paper";
import { GestureResponderEvent } from "react-native";
import { Column } from "../layout";
import { Text } from "../typography";

const Form = <T extends Record<string, any>>({
  children: fields,
  onSubmit,
  submitText,
  initialValues,
  errorMessage,
  onSubmitSuccess,
  onSubmitFailure,
  validate,
}: {
  children: React.ReactNode;
  onSubmit: (values: T) => Promise<void>;
  submitText: string;
  initialValues: T;
  errorMessage?: string;
  onSubmitSuccess?: () => void;
  onSubmitFailure?: () => void;
  validate: (values: T) => { [key: string]: string | undefined };
}) => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const handleSubmit = async (values: T) => {
    setLoading(true);
    try {
      await onSubmit(values);
      onSubmitSuccess?.();
    } catch (error) {
      onSubmitFailure?.();
    }
    setLoading(false);
  };

  return (
    <Formik<T>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validate}
    >
      {(props: FormikProps<T>) => (
        <FormikForm>
          {errorMessage && <Text c={theme.colors.error}>{errorMessage}</Text>}
          <Column gap="md" align="stretch">
            {React.Children.map(fields, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, props);
              }
              return child;
            })}
            <Button
              loading={loading}
              mode="contained"
              onPress={
                props.handleSubmit as unknown as (
                  e: GestureResponderEvent
                ) => void
              }
            >
              {submitText}
            </Button>
          </Column>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
