import * as React from "react";
import {
  ActivityIndicator,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { colors } from "../colors";
import { StyleSheet, Text, View } from "react-native";
import customTheme from "../colors/theme";

export default function CustomButton(props) {
  const {
    type,
    label,
    left,
    right,
    buttonContainer,
    labelStyle,
    icon,
    onPress,
    rippleColor,
    disable = false,
    isDisabled,
    isLoading = false,
  } = props;
  const theme = useTheme();
  return type === "primary" ? (
    <TouchableRipple
      rippleColor={rippleColor || "rgba(255, 255, 255, .32)"}
      style={[
        styles.buttonContainer,
        buttonContainer,
        { opacity: disable ? 0.5 : 1 },
      ]}
      disabled={disable || isLoading}
      onPress={onPress}
    >
      <View style={styles.rowContainer}>
        {left}
        {isLoading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <Text
            style={[
              theme.fonts.buttonText,
              labelStyle,
              disable ? { color: colors.black } : {},
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
        {right}
      </View>
    </TouchableRipple>
  ) : type === "secondery" ? (
    <TouchableRipple
      style={[styles.seconderyButtonContainer, buttonContainer]}
      rippleColor={rippleColor || "rgba(0, 0, 0, .32)"}
      onPress={onPress}
      disabled={disable || isLoading}
    >
      <View style={styles.rowContainer}>
        {left}
        {isLoading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <Text
            style={[theme.fonts.seconderyButtonText, labelStyle]}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
        {right}
      </View>
    </TouchableRipple>
  ) : type === "circle" ? (
    <TouchableRipple
      disabled={disable || isLoading}
      style={[styles.circleButtonContainer, buttonContainer]}
    >
      {isLoading ? <ActivityIndicator size={"small"} /> : icon}
    </TouchableRipple>
  ) : null;
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: customTheme.colors.primary,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: customTheme.colors.primary,
    borderRadius: 50,
  },
  seconderyButtonContainer: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: customTheme.colors.primary,
    borderRadius: 50,
  },
  circleButtonContainer: {
    backgroundColor: customTheme.colors.primary,
    alignSelf: "flex-start",
    width: 40,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 50,
  },
});
