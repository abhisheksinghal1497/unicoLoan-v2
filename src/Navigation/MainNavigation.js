import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from '../screens/HomeScreen';
import { screens } from '../constants/screens';
import Splash from '../screens/Splash';
import PanDetails from '../screens/PanDetails';

const Stack = createStackNavigator();

const Dashboard = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screens.Splash}
          component={Splash}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={screens.PanDetails}
          component={PanDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={screens.HomeScreen}
          component={HomeScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default Dashboard

const styles = StyleSheet.create({})