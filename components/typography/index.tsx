import React from "react";
import styled from "styled-components/native";
import { Box } from "../layout";
import { Text as NativeText, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

// ... existing imports ...

type TextChildrenType = React.ReactNode;

const Text = ({
  children,
  align = "left",
  c,
  weight = "regular",
  italic = false,
  ...props
}: {
  children: TextChildrenType;
  align?: "left" | "center" | "right" | "justify" | "auto";
  c?: keyof MD3Colors;
  weight?: "regular" | "medium" | "bold";
  italic?: boolean;
} & React.ComponentProps<typeof Box>) => {
  const theme = useTheme();
  const color = (c ? theme.colors[c] : theme.colors.onSurface) as string;

  return (
    <Box {...props}>
      <NativeText
        style={{
          textAlign: align,
          color,
          fontWeight: weight,
          fontStyle: italic ? "italic" : "normal",
          fontSize: 16,
        }}
      >
        {children}
      </NativeText>
    </Box>
  );
};

const Bold = ({ children, ...props }: { children: TextChildrenType }) => (
  <Text weight="bold" {...props}>
    {children}
  </Text>
);

const Italic = ({ children, ...props }: { children: TextChildrenType }) => (
  <Text italic {...props}>
    {children}
  </Text>
);

export { Text, Bold, Italic };
