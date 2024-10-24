import { MD3LightTheme, MD3Theme, MD3DarkTheme } from "react-native-paper";
import materialTheme from "./material-theme.json";

const createTheme = (scheme: "light" | "dark"): MD3Theme => {
  const baseTheme = scheme === "light" ? MD3LightTheme : MD3DarkTheme;
  const themeColors = materialTheme.schemes[scheme];

  return {
    ...baseTheme,
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
