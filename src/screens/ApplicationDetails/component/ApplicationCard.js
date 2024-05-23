import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { assets } from "../../../assets/assets";
import CircularProgress from "../../../components/CircularProgress";
import DimensionUtils from "./../../../utils/DimensionUtils";
import { useRoute } from "@react-navigation/native";
const horizontalScale = DimensionUtils.pixelSizeHorizontal;
const verticalScale = DimensionUtils.pixelSizeVertical;

const ApplicationCard = ({ percentage }) => {
  const { colors } = useTheme();
  const styles = style(colors);
  const route = useRoute();
  const ProgressBarPercent = route?.params?.ProgressBarPercent;
  // console.log('ProgressBarPercent',ProgressBarPercent)

  return (
    <View style={styles.applicationContainer}>
      <View style={styles.loanContentContainer}>
        <Text style={styles.applicationContentText}>Applicant Details</Text>
        <Text style={styles.applicationContentText}>LXC537676727</Text>
        <Text
          style={[
            styles.applicationContentText,
            { marginBottom: verticalScale(0) },
          ]}
        >
          Housing Loan
        </Text>
      </View>
      <View style={styles.loaderContainer}>
        <View style={styles.circularProgressBarContainer}>
          <CircularProgress
            imageStyle={{ width: 47, height: 39 }}
            ImageData={require("../../../../assets/images/Home2.png")}
            size={105}
            strokeWidth={12}
            progressPercent={!!ProgressBarPercent ? ProgressBarPercent : 10}
            bgColor={"#F2F2F2"}
            pgColor={"#2E52A1"}
          />
        </View>
        <Text style={styles.loaderText}>UNICO HOUSING FINANCE LIMITED</Text>
      </View>
    </View>
  );
};

const style = (colors) =>
  StyleSheet.create({
    applicationContainer: {
      backgroundColor: colors.primaryContainer,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: horizontalScale(8),
      marginVertical: verticalScale(18),
      paddingLeft: horizontalScale(23),
      paddingVertical: verticalScale(13),
      paddingRight: horizontalScale(12),
    },
    loanContentContainer: { flex: 1 },
    applicationContentText: {
      color: "#2E52A1",
      fontSize: DimensionUtils.fontPixel(16),
      marginBottom: verticalScale(10),
    },
    loaderContainer: { flex: 1.6, alignItems: "center" },
    circularProgressBarContainer: {
      position: "relative",
      marginBottom: DimensionUtils.pixelSizeVertical(10),
    },
    homeIconContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    loaderText: { fontSize: DimensionUtils.fontPixel(11), color: "#2E52A1" },
  });

export default ApplicationCard;
