import { ComponentProps, ReactNode } from "react";
import { Box } from "../layout";
import { Text as NativeText, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

type BoxProps = ComponentProps<typeof Box> &
  ComponentProps<typeof NativeText> & {
    c?: keyof MD3Colors;
    align?: "left" | "center" | "right" | "justify" | "auto";
    weight?: "regular" | "medium" | "bold";
    italic?: boolean;
    bold?: boolean;
  };

const Text = ({ children, c, ...props }: BoxProps) => {
  const theme = useTheme();
  const color = (c ? theme.colors[c] : theme.colors.onSurface) as string;

  return (
    <Box {...props}>
      <NativeText
        style={{
          color,
          textAlign: props.align,
          fontWeight: props.bold ? "bold" : "normal",
          fontStyle: props.italic ? "italic" : "normal",
        }}
        {...props}
      >
        {children}
      </NativeText>
    </Box>
  );
};

export { Text };
