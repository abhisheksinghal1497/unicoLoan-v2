import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../colors";

const CustomShadow = (props) => {
  const { children } = props;

  return (
    <View style={styles.container}>
      <View style={styles.shadowView}>{children}</View>
    </View>
  );
};

export default CustomShadow;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    paddingBottom: 5,
    borderRadius: 30,
  },
  shadowView: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 8,
    borderRadius: 40,
  },
});