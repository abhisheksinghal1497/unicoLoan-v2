import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import OtpLogin from '../auth_screens/Login/Otp_login'
import PhoneNumber from '../auth_screens/Login/PhoneNumber'
import SignupForm from '../auth_screens/SignUp/SignupForm'
import Splash from '../auth_screens/splash';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
   
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OtpLogin"
              component={OtpLogin}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="PhoneNumber"
              component={PhoneNumber}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="SignupForm"
              component={SignupForm}
              options={{ headerShown: false }}
            /> 
                <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            /> 
          </Stack.Navigator>
        </NavigationContainer>
     
  )
}

export default AuthStack

const styles = StyleSheet.create({})