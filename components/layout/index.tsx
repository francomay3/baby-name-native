import styled from "styled-components/native";
import { Divider as PaperDivider, useTheme } from "react-native-paper";
import { MD3Colors } from "react-native-paper/lib/typescript/types";

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

export interface BoxProps {
  bg?: keyof MD3Colors;
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
  pb?: Size;
  pl?: Size;
  pr?: Size;
  pt?: Size;
  w?: Size;
  flex?: number;
}

const Box = styled.View<BoxProps>`
  ${({ bg }) => {
    const theme = useTheme();
    return `background-color: ${bg ? theme.colors[bg] : "transparent"};`;
  }}
  border-radius: ${({ br }) => toUnit(br)};
  height: ${({ h }) => toUnit(h ?? "auto")};
  margin-bottom: ${({ m, mb }) => (mb ? toUnit(mb) : toUnit(m))};
  margin-left: ${({ m, ml }) => (ml ? toUnit(ml) : toUnit(m))};
  margin-right: ${({ m, mr }) => (mr ? toUnit(mr) : toUnit(m))};
  margin-top: ${({ m, mt }) => (mt ? toUnit(mt) : toUnit(m))};
  max-height: ${({ mh }) => toUnit(mh ?? "auto")};
  max-width: ${({ mw }) => toUnit(mw ?? "auto")};
  padding-bottom: ${({ p, pb }) => (pb ? toUnit(pb) : toUnit(p))};
  padding-left: ${({ p, pl }) => (pl ? toUnit(pl) : toUnit(p))};
  padding-right: ${({ p, pr }) => (pr ? toUnit(pr) : toUnit(p))};
  padding-top: ${({ p, pt }) => (pt ? toUnit(pt) : toUnit(p))};
  width: ${({ w }) => toUnit(w ?? "auto")};
  ${({ flex }) => (flex ? `flex: ${flex};` : "")}
`;

const Flex = styled(Box)<{
  gap?: Size;
  justify?:
    | "center"
    | "start"
    | "end"
    | "space-between"
    | "around"
    | "evenly"
    | "flex-end";
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
  center = false,
  ...props
}: {
  children: React.ReactNode;
  center?: boolean;
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
    <Box {...props} mt={margin} mb={margin} w="100%">
      <PaperDivider />
    </Box>
  );
};

export { Box, Flex, Row, Column, Container, Divider };
