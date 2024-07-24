import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import { screens } from "../constants/screens";
import Splash from "../screens/Splash";
import PanDetails from "../screens/PanDetails";
import NoInternet from "../screens/NoInternet";
import ErrorScreen from "../screens/ErrorScreen";
import CongratulationScreen from "../screens/Congratulation";
import KYC from "../screens/KYC";
import CaptureAdhaar from "../screens/CaptureAdhaar";
import Eligibility from "../screens/Eligibility";
import ProfileImageScreen from "../screens/ProfileImage";
import CaptureSelfie from "../screens/CaptureSelfie";
import ApplicationDetails from "../screens/ApplicationDetails";
import KYCDocuments from "../screens/KYCDocuments";
import Sanction from "../screens/Sanction";
import LoanDetails from "../screens/LoanDetails";
import FAQ from "../screens/FAQ";
import MyTickets from "../screens/MyTickets";
import RaiseTicket from "../screens/RaiseTicket";
import CreateTicket from "../screens/CreateTicket";
import TrackTicket from "../screens/TrackTicket/index";
import PayNow from "../screens/PayNow";
import StatusCheck from "../screens/StatusCheck";
import Profile from "../screens/Profile";
import EmiCalculator from "../screens/EmiCalculator";
import CurrentAddress from "../screens/CurrentAddress";
import OtpScreen from "../screens/OtpEnter";
import PinCodeVerify from "../screens/PinCode";
import Services from "../screens/Services";
import { makeMetadataApiCall } from "../services/sfDataServices/salesforceApiService";
import ServiceOtp from "../screens/ServiceOtp";

const Stack = createStackNavigator();

const Dashboard = () => {
  const getData = makeMetadataApiCall();
  useEffect(() => {
    getData.mutate();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={screens.HomeScreen}
      >
        <Stack.Screen name={screens.Splash} component={Splash} />
        <Stack.Screen name={screens.NoInternet} component={NoInternet} />
        <Stack.Screen name={screens.ErrorScreen} component={ErrorScreen} />
        <Stack.Screen name={screens.HomeScreen} component={HomeScreen} />
        <Stack.Screen name={screens.MyTickets} component={MyTickets} />
        <Stack.Screen name={screens.KYC} component={KYC} />
        <Stack.Screen name={screens.CaptureAdhaar} component={CaptureAdhaar} />
        <Stack.Screen name={screens.CaptureSelfie} component={CaptureSelfie} />
        <Stack.Screen
          name={screens.CongratulationScreen}
          component={CongratulationScreen}
        />
        <Stack.Screen name={screens.Eligibility} component={Eligibility} />
        <Stack.Screen
          name={screens.ProfileImageScreen}
          component={ProfileImageScreen}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen name={screens.KYCDocuments} component={KYCDocuments} />
        <Stack.Screen
          name={screens.ApplicantDetails}
          component={ApplicationDetails}
        />
        <Stack.Screen name={screens.PanDetails} component={PanDetails} />
        <Stack.Screen name={screens.Sanction} component={Sanction} />
        <Stack.Screen name={screens.LoanDetails} component={LoanDetails} />
        <Stack.Screen name={screens.FAQ} component={FAQ} />
        <Stack.Screen name={screens.CreateTicket} component={CreateTicket} />
        <Stack.Screen name={screens.RaiseTicket} component={RaiseTicket} />
        <Stack.Screen name={screens.TrackTicket} component={TrackTicket} />
        <Stack.Screen name={screens.EmiCalculator} component={EmiCalculator} />
        <Stack.Screen
          name={screens.CurrentAddress}
          component={CurrentAddress}
        />
        <Stack.Screen name={screens.OtpScreen} component={OtpScreen} />
        <Stack.Screen name={screens.PinCodeVerify} component={PinCodeVerify} />
        <Stack.Screen
          name={screens.PayNow}
          component={PayNow}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={screens.StatusCheck}
          component={StatusCheck}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={screens.Profile} component={Profile} />

        <Stack.Screen name={screens.Services} component={Services} />

        <Stack.Screen name={screens.ServiceOtp} component={ServiceOtp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Dashboard;
