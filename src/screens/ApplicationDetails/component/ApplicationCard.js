import React from "react";
import { View, Image } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { assets } from "../../../assets/assets";
import { horizontalScale, verticalScale } from "../../../utils/matrcis";

const ApplicationCard = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.primaryContainer,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: horizontalScale(8),
        marginVertical: verticalScale(18),
        paddingLeft: horizontalScale(23),
        paddingVertical: verticalScale(13),
        paddingRight: horizontalScale(12),
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "#2E52A1",
            fontSize: verticalScale(14),
            marginBottom: verticalScale(10),
          }}
        >
          Applicant Details
        </Text>
        <Text
          style={{
            color: "#2E52A1",
            fontSize: verticalScale(14),
            marginBottom: verticalScale(10),
          }}
        >
          LXC537676727
        </Text>
        <Text
          style={{
            color: "#2E52A1",
            fontSize: verticalScale(14),
          }}
        >
          Housing Loan
        </Text>
      </View>
      <View style={{ flex: 1.6, alignItems: "center" }}>
        <Image
          source={assets.homeCircle}
          style={{
            height: verticalScale(120),
            width: horizontalScale(180),
            marginBottom: verticalScale(10),
            // alignSelf: "flex-end",
          }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: verticalScale(11), color: "#2E52A1" }}>
          UNICO HOUSING FINANCE LIMITED
        </Text>
      </View>
    </View>
  );
};

export default ApplicationCard;
