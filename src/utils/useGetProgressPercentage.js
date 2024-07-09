import { useRoute } from "@react-navigation/native";
import React from "react";
import { screens } from "../constants/screens";

const useGetProgressPercentage = () => {
  const route = useRoute();
  const routeName = route.name;
  const ProgressBarPercent = route?.params?.ProgressBarPercent;
  let percentage = 0;
  if(ProgressBarPercent){
    percentage = ProgressBarPercent;
  }else if(routeName === screens.ApplicantDetails){
    percentage = 10;
  }else if(routeName === screens.PanDetails){
    percentage = 40;
  }else if(routeName === screens.KYC){
    percentage = 60;
  }else if(routeName === screens.LoanDetails){
    percentage = 80;
  }else if(routeName === screens.Eligibility){
    percentage = 100;
  }
  return percentage;
};

export default useGetProgressPercentage;
