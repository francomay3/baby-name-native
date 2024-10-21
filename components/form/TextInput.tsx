import React, { ComponentProps, useState } from "react";
import { Field } from "formik";
import { TextInput } from "react-native-paper";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { Box, Column } from "@/components/layout";
import { Text } from "../typography";

type DumbTextInputProps = ComponentProps<typeof TextInput> &
  ComponentProps<typeof Box>;

export const DumbTextInput = ({
  value,
  onChangeText,
  onBlur,
  onFocus,
  error,
  label,
  placeholder,
  ...rest
}: DumbTextInputProps & {
  label: string;
  error?: string;
}) => {
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur && onBlur(e);
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus && onFocus(e);
  };

  const handleChange = (text: string) => {
    onChangeText && onChangeText(text);
  };

  return (
    <Column align="stretch" {...rest}>
      <TextInput
        mode="flat"
        value={value}
        onChangeText={handleChange}
        onBlur={handleBlur}
        error={error}
        onFocus={handleFocus}
        placeholder={!label ? placeholder : undefined}
        label={label}
        {...rest}
      />
      {error && <Text c="error">{error}</Text>}
    </Column>
  );
};

export const ConnectedTextInput = ({
  name,
  label,
  placeholder,
  values,

  touched: touchedFields,
  handleChange,
  handleBlur,
  errors,
  ...rest
}: ComponentProps<typeof Field> & DumbTextInputProps) => {
  const value = values[name];
  const touched = touchedFields[name];
  const error = touched && errors[name];

  return (
    <Field
      component={DumbTextInput}
      onBlur={handleBlur(name)}
      onChangeText={handleChange(name)}
      name={name}
      error={error}
      label={label}
      placeholder={placeholder}
      value={value}
      values={values}
      {...rest}
    />
  );
};
