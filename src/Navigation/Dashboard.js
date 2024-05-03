import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Splash from '../screens/splash';
import HomeScreen from '../screens/HomeScreen';
import ApplicantDetails from '../screens/ApplicantDetails';
import ApplyForLoan from '../screens/ApplyForLoan';
import Calculators from '../screens/Calculators';
import StatusCheck from '../screens/StatusCheck';
import AadharBack from '../screens/Documents/AadharBack';
import AadharDocUplaod from '../screens/Documents/AadharDocUplaod';
import AadharFront from '../screens/Documents/AadharFront';
import AadharNumber from '../screens/Documents/AadharNumber';
import Documentsverified from '../screens/Documents/Documentsverified';
import SelfPicture from '../screens/Documents/SelfPicture';
import Eligiblity from '../screens/Loan/Eligiblity';
import InPrincipleSection from '../screens/Loan/InPrincipleSection';
import LoanDetail from '../screens/Loan/LoanDetail';
import PancardNumber from '../screens/Pancard/PancardNumber';
import PandcardDetails from '../screens/Pancard/PandcardDetails';

const Stack = createStackNavigator();


const Dashboard = () => {
    return (
      
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Splash"
                        component={Splash}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="ApplicantDetails"
                        component={ApplicantDetails}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="ApplyForLoan"
                        component={ApplyForLoan}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="Calculators"
                        component={Calculators}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="StatusCheck"
                        component={StatusCheck}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="AadharBack"
                        component={AadharBack}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="AadharDocUplaod"
                        component={AadharDocUplaod}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="AadharFront"
                        component={AadharFront}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="AadharNumber"
                        component={AadharNumber}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="Documentsverified"
                        component={Documentsverified}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="SelfPicture"
                        component={SelfPicture}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="Eligiblity"
                        component={Eligiblity}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="InPrincipleSection"
                        component={InPrincipleSection}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="LoanDetail"
                        component={LoanDetail}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="PancardNumber"
                        component={PancardNumber}
                        options={{ headerShown: false }}
                    />
                      <Stack.Screen
                        name="PandcardDetails"
                        component={PandcardDetails}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
      
    )
}

export default Dashboard

const styles = StyleSheet.create({})