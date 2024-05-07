import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { screens } from '../../constants/screens'

const Splash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate(screens.PanDetails)}>splash</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})