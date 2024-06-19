import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../colors";

const CustomShadow = ({ children, containerStyle = {}, shadowSyle = {} }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.shadowView, shadowSyle]}>{children}</View>
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
    // backgroundColor: colors.white,
    // shadowColor: colors.black,
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
   
    // borderRadius: 40,
    // borderTopWidth:0.15,
    // borderLeftWidth:0.15,
    // borderRightWidth:0.15,

    borderRadius: 30,
    backgroundColor: colors.white,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: colors.borderColor,
    elevation: 10,
  },
});
