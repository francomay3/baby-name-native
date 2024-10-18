type Values = Record<string, any>;
type Validator = (value: string, values: Values) => string | undefined;

export const required: Validator = (value) => {
  if (!value) {
    return "Required";
  }
};

export const emailFormat: Validator = (value) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(String(value))) {
    return "Invalid email address";
  }
};

export const matches: (otherField: string) => Validator =
  (otherField) => (value, values) => {
    if (value !== values[otherField]) {
      return "Values do not match";
    }
  };

export const composeValidators =
  (...validators: Validator[]): Validator =>
  (value: string, values: Values) => {
    for (const validator of validators) {
      const error = validator(value, values);
      if (error) {
        return error;
      }
    }
  };

export const getFormValidate =
  (temp: { key: string; validator: Validator }[]) => (values: Values) => {
    const errors: Partial<Values> = {};

    temp.forEach(({ key, validator }) => {
      const value = values[key];
      const error = validator(value, values);
      if (error) {
        errors[key] = error;
      }
    });

    return errors;
  };
