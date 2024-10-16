import styled from "styled-components/native";
import { Box } from "../layout";
import { Text as NativeText } from "react-native-paper";

const Text = ({
  children,
  align = "left",
  c,
  weight = "regular",
  italic = false,
  ...props
}: {
  children: string | string[];
  align?: "left" | "center" | "right" | "justify" | "auto";
  c?: string;
  weight?: "regular" | "medium" | "bold";
  italic?: boolean;
} & React.ComponentProps<typeof Box>) => {
  return (
    <Box {...props}>
      <NativeText
        style={{
          textAlign: align,
          color: c,
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

const Bold = ({ children, ...props }: { children: string | string[] }) => (
  <Text weight="bold" {...props}>
    {children}
  </Text>
);

const Italic = ({ children, ...props }: { children: string | string[] }) => (
  <Text italic {...props}>
    {children}
  </Text>
);

export { Text, Bold, Italic };
