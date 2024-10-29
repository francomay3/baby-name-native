import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import { Button } from "react-native-paper";
import { GestureResponderEvent } from "react-native";
import { Box, Column } from "../layout";
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
  onSubmitSuccess?: (values: T) => void;
  onSubmitFailure?: (error: unknown) => void;
  validate?: (values: T) => { [key: string]: string | undefined };
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: T) => {
    setLoading(true);
    try {
      await onSubmit(values);
      onSubmitSuccess?.(values);
    } catch (error) {
      onSubmitFailure?.(error);
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
        <Column gap="md" align="center">
          {errorMessage ? <Text c="error">{errorMessage}</Text> : null}
          <Box w="100%">
            {React.Children.map(fields, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, props);
              }
              return child;
            })}
          </Box>
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
      )}
    </Formik>
  );
};

export default Form;
