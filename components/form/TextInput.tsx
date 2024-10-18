import React, {
  ComponentProps,
  RefAttributes,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Field } from "formik";
import { TextInput } from "react-native-paper";
import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { Box } from "@/components/layout";

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
  errorMessage?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleChange = (text: string) => {
    onChangeText && onChangeText(text);
  };

  return (
    <Box {...rest}>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={handleChange}
        onBlur={handleBlur}
        error={error}
        onFocus={handleFocus}
        placeholder={!label ? placeholder : undefined}
        label={
          isFocused
            ? `${label}${error ? ` - ${error}` : ""}`
            : `${label}${error ? `*` : ""}`
        }
        {...rest}
      />
    </Box>
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
      error={error}
      name={name}
      label={label}
      placeholder={placeholder}
      value={value}
      values={values}
      {...rest}
    />
  );
};
