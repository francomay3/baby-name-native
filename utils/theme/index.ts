import { MD3LightTheme, MD3Theme, MD3DarkTheme } from "react-native-paper";
import materialTheme from "./material-theme.json";
import { MD3Typescale } from "react-native-paper/lib/typescript/types";

const fonts = {
  displayLarge: {
    fontFamily: "afacad",
    letterSpacing: 0,
    fontWeight: "400",
    lineHeight: 64,
    fontSize: 57,
  },
  displayMedium: {
    fontFamily: "afacad",
    letterSpacing: 0,
    fontWeight: "400",
    lineHeight: 52,
    fontSize: 45,
  },
  displaySmall: {
    fontFamily: "afacad",
    letterSpacing: 0,
    fontWeight: "400",
    lineHeight: 44,
    fontSize: 36,
  },
  headlineLarge: {
    fontFamily: "afacad",
    letterSpacing: 0,
    fontWeight: "400",
    lineHeight: 40,
    fontSize: 32,
  },
  headlineMedium: {
    fontFamily: "afacad",
    letterSpacing: 0,
    fontWeight: "400",
    lineHeight: 36,
    fontSize: 28,
  },
  headlineSmall: {
    fontFamily: "afacad",
    letterSpacing: 0,
    fontWeight: "400",
    lineHeight: 32,
    fontSize: 24,
  },
  titleLarge: {
    fontFamily: "afacad",
    letterSpacing: 0,
    fontWeight: "400",
    lineHeight: 28,
    fontSize: 22,
  },
  titleMedium: {
    fontFamily: "afacad",
    letterSpacing: 0.15,
    fontWeight: "500",
    lineHeight: 24,
    fontSize: 16,
  },
  titleSmall: {
    fontFamily: "afacad",
    letterSpacing: 0.1,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: 14,
  },
  labelLarge: {
    fontFamily: "afacad",
    letterSpacing: 0.1,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: 14,
  },
  labelMedium: {
    fontFamily: "afacad",
    letterSpacing: 0.5,
    fontWeight: "500",
    lineHeight: 16,
    fontSize: 12,
  },
  labelSmall: {
    fontFamily: "afacad",
    letterSpacing: 0.5,
    fontWeight: "500",
    lineHeight: 16,
    fontSize: 11,
  },
  bodyLarge: {
    fontFamily: "afacad",
    letterSpacing: 0.15,
    fontWeight: "400",
    lineHeight: 24,
    fontSize: 16,
  },
  bodyMedium: {
    fontFamily: "afacad",
    letterSpacing: 0.25,
    fontWeight: "400",
    lineHeight: 20,
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: "afacad",
    letterSpacing: 0.4,
    fontWeight: "400",
    lineHeight: 16,
    fontSize: 12,
  },
  default: {
    fontFamily: "afacad",
    letterSpacing: 0,
    fontWeight: "400",
  },
} as MD3Typescale;

const createTheme = (scheme: "light" | "dark"): MD3Theme => {
  const baseTheme = scheme === "light" ? MD3LightTheme : MD3DarkTheme;
  const themeColors = materialTheme.schemes[scheme];

  return {
    ...baseTheme,
    fonts,
    colors: {
      ...baseTheme.colors,
      primary: themeColors.primary,
      onPrimary: themeColors.onPrimary,
      primaryContainer: themeColors.primaryContainer,
      onPrimaryContainer: themeColors.onPrimaryContainer,
      secondary: themeColors.secondary,
      onSecondary: themeColors.onSecondary,
      secondaryContainer: themeColors.secondaryContainer,
      onSecondaryContainer: themeColors.onSecondaryContainer,
      tertiary: themeColors.tertiary,
      onTertiary: themeColors.onTertiary,
      tertiaryContainer: themeColors.tertiaryContainer,
      onTertiaryContainer: themeColors.onTertiaryContainer,
      error: themeColors.error,
      onError: themeColors.onError,
      errorContainer: themeColors.errorContainer,
      onErrorContainer: themeColors.onErrorContainer,
      background: themeColors.background,
      onBackground: themeColors.onBackground,
      surface: themeColors.surface,
      onSurface: themeColors.onSurface,
      surfaceVariant: themeColors.surfaceVariant,
      onSurfaceVariant: themeColors.onSurfaceVariant,
      outline: themeColors.outline,
      outlineVariant: themeColors.outlineVariant,
      shadow: themeColors.shadow,
      scrim: themeColors.scrim,
      inverseSurface: themeColors.inverseSurface,
      inverseOnSurface: themeColors.inverseOnSurface,
      inversePrimary: themeColors.inversePrimary,
      // Add these new properties
      surfaceDisabled: themeColors.surfaceContainer,
      onSurfaceDisabled: themeColors.onSurfaceVariant,
      backdrop: themeColors.scrim,
    },
  };
};

const light: MD3Theme = createTheme("light");
const dark: MD3Theme = createTheme("dark");

export default { light, dark };
