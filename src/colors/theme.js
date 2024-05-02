import { MD3LightTheme as DefaultTheme } from "react-native-paper";

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
   primary: "#2E52A1",
    primaryContainer: "#E1F3FF",
    primaryShadow: "rgba(105, 87, 211, 0.3)",
    surfaceVariant: "#D7E7F4",
    surface: "#0076C7",
    background: "#FFFFFF",
    textInputBackground: "#FFFFFF",
    elevation: {
      level3: "rgba(0, 0, 0, 0.25)",
      // level0: "#E6F4FF",
      // level1: "#E6F4FF",
      // level2: "#E6F4FF",
      // level4: "#E6F4FF",
      // level5: "#E6F4FF",
    },
  },
  shape: {
    ...DefaultTheme.shape,
    roundness: 6,
  },
  fonts: {
    ...DefaultTheme.fonts,
    smallText: {
      fontFamily: "Nunito",
      fontWeight: "normal",
      fontSize: 12,
    },
    regularText: {
      fontFamily: "Nunito",
      fontWeight: "normal",
      fontSize: 14,
    },
    mediumText: {
      fontFamily: "Nunito",
      fontWeight: "bold",
      fontSize: 14,
    },
    default: {
      fontFamily: "Nunito",
      fontWeight: "normal",
      letterSpacing: 0,
    },

    titleMedium: {
      fontFamily: "Nunito",
      fontSize: 20,
      fontWeight: "400",
      letterSpacing: 0.15,
      lineHeight: 24,
    },
    titleLarge: {
      fontFamily: "Nunito",
      fontSize: 22,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 28,
    },
    bodySmall: {
      fontFamily: "Nunito",
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0.4,
      lineHeight: 16,
    },
    labelSmall: {
      fontFamily: "Nunito",
      fontSize: 11,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelMedium: {
      fontFamily: "Nunito",
      fontSize: 12,
      fontWeight: "500",
      letterSpacing: 0.5,
      lineHeight: 16,
    },
    labelLarge: {
      fontFamily: "Nunito",
      fontSize: 14,
      fontWeight: "500",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    headlineSmall: {
      fontFamily: "Nunito",
      fontSize: 24,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 32,
    },
    headlineMedium: {
      fontFamily: "Nunito",
      fontSize: 28,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 36,
    },
    headlineLarge: {
      fontFamily: "Nunito",
      fontSize: 32,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 40,
    },
  },
};

export default customTheme;
