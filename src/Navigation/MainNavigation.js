import React from 'react'
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import { screens } from '../constants/screens';
import Splash from '../screens/Splash';
import PanDetails from '../screens/PanDetails';
import NoInternet from '../screens/NoInternet';
import ErrorScreen from '../screens/ErrorScreen';
import CongratulationScreen from '../screens/Congratulation';
import KYC from '../screens/KYC';
import CaptureAdhaar from '../screens/CaptureAdhaar';
import Eligibility from '../screens/Eligibility';
import ProfileImageScreen from '../screens/ProfileImage';
import CaptureSelfie from '../screens/CaptureSelfie';
import ApplicationDetails from '../screens/ApplicationDetails';
import KYCDocuments from '../screens/KYCDocuments';
import Sanction from '../screens/Sanction';
import LoanDetails from '../screens/LoanDetails';
import MyTickets from '../screens/MyTickets';
import RaiseTicket from '../screens/RaiseTicket';

const Stack = createStackNavigator();

const Dashboard = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={screens.HomeScreen}>

        {/* <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
            />
      <Stack.Navigator initialRouteName={screens.Eligibility} >
            /> */}
        <Stack.Screen
          name={screens.Splash}
          component={Splash}
          options={{ headerShown: false, }}
        />

        <Stack.Screen
          name={screens.NoInternet}
          component={NoInternet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.ErrorScreen}
          component={ErrorScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={screens.PanDetails}
          component={PanDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={screens.MyTickets}
          component={MyTickets}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={screens.KYC}
          component={KYC}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.CaptureAdhaar}
          component={CaptureAdhaar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.CaptureSelfie}
          component={CaptureSelfie}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={screens.HomeScreen}
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={screens.CongratulationScreen}
          component={CongratulationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.Eligibility}
          component={Eligibility}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.ProfileImageScreen}
          component={ProfileImageScreen}
        />
        <Stack.Screen
          name={screens.KYCDocuments}
          component={KYCDocuments}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.ApplicantDetails}
          component={ApplicationDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.Sanction}
          component={Sanction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={screens.LoanDetails}
          component={LoanDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name={screens.RaiseTicket}
          component={RaiseTicket}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default Dashboard
