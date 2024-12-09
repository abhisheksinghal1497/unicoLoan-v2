import { View, Animated, Text, StyleSheet, Image } from 'react-native';
import React, { useRef, useEffect } from 'react'
import { colors } from '../../colors';
import { makeMetadataApiCall } from '../../services/sfDataServices/salesforceApiService';
import { useResetRoutes } from '../../utils/functions';
import { screens } from '../../constants/screens';





const Splash = (props) => {
  const connectionRef = useRef(null)
  const getData = makeMetadataApiCall();
  const resetRoute = useResetRoutes();
  const makeApiCall = async () => {
    try {
      await getData?.mutateAsync()

    } catch (error) {

    }
    resetRoute(screens.HomeScreen)



  }


  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    if (connectionRef.current) {
      
      makeApiCall()


    }
    // makeApiCall()
    props.navigation.setOptions({
      headerShown: false
    });
  }, []);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white }}>
      <Image
        ref={connectionRef}
        source={require('../../assets/unicoLogo.png')}
        style={{ resizeMode: 'contain', width: 200, height: 200 }}

      />
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