import { View, Text, StyleSheet } from "react-native";
import React from "react";
import customTheme from "../colors/theme";
import { colors } from "../colors";
import { useTheme } from "react-native-paper";
import CircularProgress from "./CircularProgress";
import home from "./../assets/home_icon.png";

const ProgressCard = ({ screenName, percentage }) => {
  const { fonts } = useTheme();
  return (
    <View style={styles.cardContainer}>
      <View style={{ flexGrow: 1 }}>
        <Text style={[fonts.labelMedium, { color: "rgba(46, 82, 161, 1)" }]}>
          {screenName}
        </Text>
        <Text
          style={[
            fonts.labelMedium,
            { color: "rgba(46, 82, 161, 1)", marginVertical: 5 },
          ]}
        >
          LXC537676727
        </Text>
        <Text style={[fonts.labelSmall, { color: "rgba(46, 82, 161, 1)" }]}>
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
    backgroundColor: "rgba(225, 243, 255, 1)",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
