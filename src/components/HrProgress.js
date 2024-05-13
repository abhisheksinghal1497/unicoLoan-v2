import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Rect, Svg } from "react-native-svg";
import { useTheme } from "react-native-paper";

const HrProgress = (props) => {
  const { colors } = useTheme();

  const {
    width = 200,
    height = 20,
    borderColor = colors.borderColor,
    fillColor = colors.success,
    progress = 0,
  } = props;
  return (
    <Svg height={height + 2} width={width + 2}>
      <Rect
        x="0"
        width={width}
        height={height}
        rx={height}
        ry={height}
        stroke={borderColor}
        fill={"white"}
      />
      <Rect
        x="0"
        width={progress * width}
        height={height}
        rx={height}
        ry={height}
        fill={fillColor}
      />
    </Svg>
  );
};

export default HrProgress;

const styles = StyleSheet.create({});
