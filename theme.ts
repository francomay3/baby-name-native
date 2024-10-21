import { MD3LightTheme, MD3Theme } from "react-native-paper";

const theme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#00696C",
    onPrimary: "#FFFFFF",
    primaryContainer: "#9CF1F3",
    onPrimaryContainer: "#002021",
    secondary: "#8F4A4C",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#FFDAD9",
    onSecondaryContainer: "#3B080E",
    tertiary: "#4D5F7C",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#D5E3FF",
    onTertiaryContainer: "#061C36",
    error: "#BA1A1A",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#F4FBFA",
    onBackground: "#161D1D",
    surface: "#F4FBFA",
    onSurface: "#161D1D",
    surfaceVariant: "#DAE4E4",
    onSurfaceVariant: "#3F4949",
    outline: "#6F7979",
    outlineVariant: "#BEC8C8",
    shadow: "#000000",
    scrim: "#000000",
    inverseSurface: "#2B3232",
    inverseOnSurface: "#ECF2F2",
    inversePrimary: "#80D4D7",

    surfaceDisabled: "#D5DBDB",
    onSurfaceDisabled: "#455151",
    backdrop: "#D5DBDB",
  },
};

export default theme;
