import { useRoute } from "@react-navigation/native";
import React from "react";
import { screens } from "../constants/screens";

export const getCurrentScreenNameForResume = (item) => {
  if (!item?.panDetails) {
    return screens.PanDetails;
  } else if (!item?.adhaarDetails) {
    return screens.KYC;
  } else if (!item?.selfieDetails) {
    return screens.CaptureSelfie;
  } else if (!item?.currentAddressDetails) {
    return screens.KYCDocuments;
  } else if (!item?.loanDetails) {
    return screens.LoanDetails;
  } else if (!item?.eligibilityDetails) {
    return screens.Eligibility;
  } else {
    return screens.Eligibility;
  }
};

const useGetProgressPercentage = (item) => {
  const route = useRoute();
  let routeName = route.name;
  if (routeName === screens.HomeScreen) {
    routeName = getCurrentScreenNameForResume(item);
  }
  const ProgressBarPercent = route?.params?.ProgressBarPercent;
  let percentage = 0;
  if (ProgressBarPercent) {
    percentage = ProgressBarPercent;
  } else if (routeName === screens.ApplicantDetails) {
    percentage = 10;
  } else if (routeName === screens.PanDetails) {
    percentage = 20;
  } else if (routeName === screens.KYC) {
    percentage = 40;
  } else if (routeName === screens.CaptureSelfie) {
    percentage = 50;
  } else if(routeName === screens.KYCDocuments){
    percentage = 60;
  } else if (routeName === screens.LoanDetails) {
    percentage = 80;
  } else if (routeName === screens.Eligibility) {
    percentage = 100;
  } else if (routeName === "COMPLETED") {
    percentage = 100;
  }
  return percentage;
};

export default useGetProgressPercentage;
