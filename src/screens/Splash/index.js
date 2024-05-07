import { View, Animated, Text, StyleSheet } from 'react-native';
import React, { useRef, useEffect } from 'react'



const Splash = ({ progress, size, strokeWidth, color }) => {

  propStyle = (percent) => {
    const base_degrees = -135;
    const rotateBy = base_degrees + (percent * 3.6);
    return {
      transform: [{ rotateZ: `${rotateBy}deg` }]
    };
  }

  renderThirdLayer = (percent) => {
    if (percent > 50) {
      /**
      * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
      * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
      * before passing to the propStyle function
      **/
      return <View style={[styles.secondProgressLayer, propStyle((percent - 50), 45)]}></View>
    } else {
      return <View style={styles.offsetLayer}></View>
    }
  }

  const CircularProgress = ({ percent }) => {
    let firstProgressLayerStyle;
    if (percent > 50) {
      firstProgressLayerStyle = propStyle(50, -135);
    } else {
      firstProgressLayerStyle = propStyle(percent, -135);
    }

    return (
      <View style={styles.container}>
        <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
        {renderThirdLayer(50)}
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress percent={30} />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstProgressLayer: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{ rotateZ: '-135deg' }]
  },
  secondProgressLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{ rotateZ: '45deg' }]
  },
  offsetLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'grey',
    borderTopColor: 'grey',
    transform: [{ rotateZ: '-135deg' }]
  }
})