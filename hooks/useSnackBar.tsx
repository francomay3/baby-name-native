import { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

interface SnackbarState {
  visible: boolean;
  message: string;
  options: Options;
}

type SnackBarProps = {
  visible: boolean;
  onDismiss: () => void;
  children: string;
  theme?: { colors: { inverseOnSurface: string } };
  duration?: number;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
};

type Options = {
  type?: "error" | "info";
  duration?: number;
};

const useSnackbar = () => {
  const theme = useTheme();
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: "",
    options: {
      type: "info",
      duration: 3000,
    },
  });

  const showSnackbar = (message: string, options: Options = {}) => {
    setSnackbar({
      visible: true,
      message,
      options,
    });
  };

  const onDismiss = () => {
    setSnackbar((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const snackbarProps: SnackBarProps = {
    visible: snackbar.visible,
    onDismiss,
    children: snackbar.message,
    duration: snackbar.options.duration,
  };

  if (snackbar.options.type === "error") {
    snackbarProps.style = {
      backgroundColor: theme.colors.errorContainer,
    };
    snackbarProps.theme = {
      colors: { inverseOnSurface: theme.colors.onErrorContainer },
    };
  }

  return {
    showSnackbar,
    snackbarProps,
  };
};

export default useSnackbar;
