import React from "react";
import { StyleSheet } from "react-native";
import { View, Image, Text } from "react-native";
import { Svg, Circle, Path } from 'react-native-svg';
import { colors } from "../colors";

const CircularProgress = ({ size, strokeWidth, bgColor, pgColor, progressPercent, ImageData, TextData, imageStyle }) => {
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - progressPercent;

  return (
    <>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={bgColor ? bgColor : '#F2F2F2'}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />

        {/* Progress Circle */}
        <Circle
          stroke={pgColor ? pgColor : '#2E52A1'}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap="round"
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth }}
        />

        <View style={{ height: size, width: size, justifyContent: 'center', alignItems: 'center' }}>
          {ImageData && <View style={{ height: size, width: size, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={ImageData} style={[styles.image, imageStyle]} />
          </View>}
        </View>
      </Svg>
    </>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 35,
    width: 40,
  },
});

export default CircularProgress;