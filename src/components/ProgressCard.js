import { View, Text, StyleSheet } from "react-native";
import React from "react";
import customTheme from "../colors/theme";
import { colors } from "../colors";
import { useTheme } from "react-native-paper";
import CircularProgress from "./CircularProgress";
import home from "./../assets/home_icon.png";
import useGetProgressPercentage from "../utils/useGetProgressPercentage";

const ProgressCard = ({ screenName }) => {
  const { fonts } = useTheme();
  const percentage = useGetProgressPercentage()
  return (
    <View style={styles.cardContainer}>
      <View style={{ flexGrow: 1 }}>
        <Text style={[fonts.labelMedium, { color: "rgba(46, 82, 161, 1)" }, styles.textStyle]}>
          {screenName}
        </Text>
        <Text
          style={[
            fonts.labelMedium,
            { color: "rgba(46, 82, 161, 1)", marginVertical: 8, },
            styles.textStyle
          ]}
        >
          LXC537676727
        </Text>
        <Text style={[fonts.labelSmall, { color: "rgba(46, 82, 161, 1)" }, styles.textStyle, {
          fontSize: 12
        }]}>
          Housing Loan
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
        <Text
          style={[
            fonts.smallText,
            { color: "rgba(46, 82, 161, 1)", fontSize: 7, marginTop: 10 },
            styles.textStyle,{fontSize:9}
          ]}
        >
          UNICO HOUSING FINANCE LIMITED
        </Text>
      </View>
    </View>
  );
};

export default ProgressCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    justifyContent: 'space-between',

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
    color: colors.coreBlue

  }
});