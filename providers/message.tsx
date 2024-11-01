import errorMessageMap from "@/utils/errorMessageMap";
import { FirebaseError } from "firebase/app";
import { createContext, useContext, ReactNode, useState } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";

interface SnackState {
  visible: boolean;
  message: string;
  options: Options;
}

type SnackProps = {
  visible: boolean;
  onDismiss: () => void;
  children: string;
  theme?: { colors: { inverseOnSurface: string } };
  duration?: number;
  style?: StyleProp<ViewStyle>;
};

type Options = {
  type?: "error" | "info";
  duration?: number;
};

type ShowSnack = (message: string, options?: Options) => void;

const useSnackbar = () => {
  const theme = useTheme();
  const [Snack, setSnack] = useState<SnackState>({
    visible: false,
    message: "",
    options: {
      type: "info",
      duration: 3000,
    },
  });
  const showSnack: ShowSnack = (message, options = {}) => {
    setSnack({
      visible: true,
      message,
      options,
    });
  };

  const onDismiss = () => {
    setSnack((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const SnackProps: SnackProps = {
    visible: Snack.visible,
    onDismiss,
    children: Snack.message,
    duration: Snack.options.duration,
  };

  if (Snack.options.type === "error") {
    SnackProps.style = { backgroundColor: theme.colors.errorContainer };
    SnackProps.theme = {
      colors: { inverseOnSurface: theme.colors.onErrorContainer },
    };
  }

  return {
    showSnack,
    SnackProps,
  };
};

type ContextValue = {
  showMessage: ShowSnack;
  errorBoundary: (func: () => Promise<void>) => Promise<void>;
};

const SnackContext = createContext<ContextValue | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const { SnackProps, showSnack } = useSnackbar();

  const errorBoundary = async (func: () => Promise<void>) => {
    try {
      await func();
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code as keyof typeof errorMessageMap;
        showSnack(errorMessageMap[errorCode], {
          type: "error",
        });
      } else {
        showSnack(errorMessageMap["unknown"], {
          type: "error",
        });
      }
    }
  };

  const value: ContextValue = {
    showMessage: showSnack,
    errorBoundary,
  };

  return (
    <SnackContext.Provider value={value}>
      {children}
      <Snackbar {...SnackProps} />
    </SnackContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(SnackContext);
  if (context === undefined) {
    throw new Error("useSnack must be used within a SnackProvider");
  }
  return context;
};
