import React from "react";
import { Dimensions } from "react-native";
import { BoxShadow } from "react-native-shadow";
import { colors } from "../constants/colorConstant";

const { width: deviceWidth } = Dimensions.get("screen");

const CustomShadow = ({ children, shadowColor = colors.primary }) => {
  const shadowOpt = {
    width: deviceWidth - 40,
    height: 50,
    color: shadowColor,
    border: 3,
    radius: 8,
    opacity: 0.65,
    blur: 10,
    x: 3,
    y: 3,
    style: { marginVertical: 5, borderRadius: 8 },
  };

  return <BoxShadow setting={shadowOpt}>{children}</BoxShadow>;
};

export default CustomShadow;
