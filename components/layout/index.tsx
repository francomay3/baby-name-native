import styled from "styled-components/native";
import { Divider as PaperDivider } from "react-native-paper";

const sizeMap = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

type Size = keyof typeof sizeMap | number | string;

const toUnit = (value?: Size): string => {
  if (!value) return "0px";
  if (typeof value === "number") {
    return `${value}px`;
  }
  if (value in sizeMap) {
    return `${sizeMap[value as keyof typeof sizeMap]}px`;
  }
  return value;
};

const Box = styled.View<{
  bg?: string;
  br?: number;
  h?: Size;
  m?: Size;
  mb?: Size;
  mh?: Size;
  ml?: Size;
  mr?: Size;
  mt?: Size;
  mw?: Size;
  p?: Size;
  w?: Size;
}>`
  background-color: ${({ bg }) => bg ?? "transparent"};
  border-radius: ${({ br }) => toUnit(br)};
  height: ${({ h }) => toUnit(h ?? "auto")};
  margin: ${({ m }) => toUnit(m)};
  margin-bottom: ${({ mb }) => toUnit(mb)};
  margin-left: ${({ ml }) => toUnit(ml)};
  margin-right: ${({ mr }) => toUnit(mr)};
  margin-top: ${({ mt }) => toUnit(mt)};
  max-height: ${({ mh }) => toUnit(mh ?? "auto")};
  max-width: ${({ mw }) => toUnit(mw ?? "auto")};
  padding: ${({ p }) => toUnit(p)};
  width: ${({ w }) => toUnit(w ?? "auto")};
`;

const Flex = styled(Box)<{
  gap?: Size;
  justify?: "center" | "start" | "end" | "between" | "around" | "evenly";
  align?: "center" | "start" | "end" | "stretch" | "baseline";
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
}>`
  display: flex;
  gap: ${({ gap }) => toUnit(gap)};
  justify-content: ${({ justify }) => justify ?? "start"};
  align-items: ${({ align }) => align ?? "start"};
  flex-direction: ${({ direction }) => direction ?? "row"};
`;

const Row = styled(Flex)`
  flex-direction: row;
`;

const Column = styled(Flex)`
  flex-direction: column;
`;

const Container = ({
  children,
  center,
  ...props
}: {
  children: React.ReactNode;
  center: boolean;
} & React.ComponentProps<typeof Column>) => (
  <Column
    align={center ? "center" : "start"}
    justify={center ? "center" : "start"}
    w="100%"
    h="100%"
    p="md"
    {...props}
  >
    {children}
  </Column>
);

const Divider = ({
  margin,
  ...props
}: React.ComponentProps<typeof Box> & { margin?: Size }) => {
  return (
    <Box {...props} mt={margin} mb={margin}>
      <PaperDivider />
    </Box>
  );
};

export { Box, Flex, Row, Column, Container, Divider };
