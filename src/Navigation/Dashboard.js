import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import HomeScreen from '../screens/HomeScreen';
import ApplicantDetails from '../screens/ApplicantDetails';
import ApplyForLoan from '../screens/ApplyForLoan';
import Calculators from '../screens/Calculators';
import StatusCheck from '../screens/StatusCheck';
import AadharBack from '../screens/Documents/AadharBack';
import AadharFront from '../screens/Documents/AadharFront';
import AadharNumber from '../screens/Documents/AadharNumber';
import Eligiblity from '../screens/Loan/Eligiblity';
import InPrincipleSection from '../screens/Loan/InPrincipleSection';
import { screens } from '../constants/screens';
import Splash from '../screens/Splash';
import Documentsverified from '../screens/Documents/DocumentsVerified';
import PandcardDetails from '../screens/Pancard/PanCardDetails';
import PancardNumber from '../screens/Pancard/PanCardNumber';
import LoanDetail from '../screens/Loan/LoanDetails';
import SelfPicture from '../screens/Documents/SelfiePicture';
import AadharDocUplaod from '../screens/Documents/AadharDocUpload';

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