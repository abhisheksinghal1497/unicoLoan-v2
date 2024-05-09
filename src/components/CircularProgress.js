import React from "react";
import { View,Image } from "react-native";
import { Svg, Circle, Path} from 'react-native-svg'

const CircularProgress = (props) => {
  const { size, strokeWidth, } = props;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - props.progressPercent;

  return (
    <>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle 
          stroke={props.bgColor ? props.bgColor : "white"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{strokeWidth}}
        />
        
        {/* Progress Circle */}
        <Circle 
          stroke={props.pgColor ? props.pgColor : "blue"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress/100)}
          strokeLinecap="round"
          transform={`rotate(-90, ${size/2}, ${size/2})`}
          {...{strokeWidth}}
        />
        <View style={{height:size,width:size,justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../../assets/images/Home.png')} style={{height:30,width:30}} />
        </View>
      </Svg>
    </>
  )
}

export default CircularProgress;