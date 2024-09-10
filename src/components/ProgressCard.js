import { View, Text, StyleSheet } from "react-native";
import React from "react";
import customTheme from "../colors/theme";
import { colors } from "../colors";
import { useTheme } from "react-native-paper";
import CircularProgress from "./CircularProgress";
import home from "./../assets/home_icon.png";
import useGetProgressPercentage from "../utils/useGetProgressPercentage";
import { useRoute } from "@react-navigation/native";
import { brandDetails } from "../constants/stringConstants";

const ProgressCard = ({ screenName }) => {
  const { fonts } = useTheme();
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const { loanId = '', applicationDetails = {} } = loanData;
  const { Product__c } = applicationDetails;

  const percentage = useGetProgressPercentage()
  return (
    <View style={styles.cardContainer}>
      <View style={{
        flexDirection: 'row', alignItems: "center",
        marginHorizontal: 5,
        justifyContent: 'space-between',
      }}>
        <View style={{}}>
          <Text style={[fonts.labelMedium, { color: "rgba(46, 82, 161, 1)" }, styles.textStyle]}>
            {screenName}
          </Text>
          <Text
            style={[
              fonts.labelMedium,
              { color: "rgba(46, 82, 161, 1)", marginVertical: 8, },
              styles.textStyle,
            ]}
          >
            LAN:-  {applicationDetails?.Name}
          </Text>
          <Text style={[fonts.labelSmall, { color: "rgba(46, 82, 161, 1)" }, styles.textStyle, {
            fontSize: 12
          }]}>
            {Product__c}
          </Text>

        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            size={90}
            strokeWidth={8}
            ImageData={home}
            progressPercent={percentage}
            bgColor={"#FFFFFF"}
            pgColor={"#2E52A1"}
          />

        </View>

      </View>
      <Text
        style={[
          fonts.smallText,
          { marginTop: 10 },
          styles.textStyle,
          { fontSize: 10, alignSelf:'flex-end' }
        ]}
      >
        {brandDetails.name}
      </Text>
    </View>
  );
};

export default ProgressCard;

const styles = StyleSheet.create({
  cardContainer: {


    padding: 15,
    borderRadius: 10,
    borderRadius: 6,
    backgroundColor: colors.LIGHT_BLUE,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4
    },
    elevation: 4,
    shadowRadius: 4,
    shadowOpacity: 1
  },
  textStyle: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 14,
    color: colors.coreBlue,

  }
});