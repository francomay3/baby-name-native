import materialTheme from "../utils/theme/material-theme.json";

const lightScheme = materialTheme.schemes.light;
const darkScheme = materialTheme.schemes.dark;

export const Colors = {
  light: {
    text: lightScheme.onSurface,
    background: lightScheme.surface,
    tint: lightScheme.primary,
    icon: lightScheme.onSurfaceVariant,
    tabIconDefault: lightScheme.onSurfaceVariant,
    tabIconSelected: lightScheme.primary,
  },
  dark: {
    text: darkScheme.onSurface,
    background: darkScheme.surface,
    tint: darkScheme.primary,
    icon: darkScheme.onSurfaceVariant,
    tabIconDefault: darkScheme.onSurfaceVariant,
    tabIconSelected: darkScheme.primary,
  },
};
