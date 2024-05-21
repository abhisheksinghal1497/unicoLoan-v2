import React from "react";
import { View, Image, Text } from "react-native";
import { Svg, Circle, Path } from 'react-native-svg';
import { colors } from "../colors";

const CircularProgress = ({ size, strokeWidth, bgColor = colors.white, pgColor = colors.coreBlue, progressPercent, ImageData, TextData }) => {
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
            <Image source={ImageData} style={{ height: 30, width: 30 }} />
          </View>}
        </View>
      </Svg>
    </>
  )
}

export default CircularProgress;