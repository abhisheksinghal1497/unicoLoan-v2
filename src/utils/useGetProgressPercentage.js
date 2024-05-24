import { useRoute } from "@react-navigation/native";
import React from "react";
import { screens } from "../constants/screens";

const useGetProgressPercentage = () => {
  const route = useRoute();
  const routeName = route.name;
  console.log('ROUTE NAME',route.name);
  const ProgressBarPercent = route?.params?.ProgressBarPercent;
  let percentage = 0;
  if(ProgressBarPercent){
    percentage = ProgressBarPercent;
  }else if(routeName === screens.ApplicantDetails){
    percentage = 10;
  }else if(routeName === screens.PanDetails){
    percentage = 25;
  }
  return percentage;
};

export default useGetProgressPercentage;
