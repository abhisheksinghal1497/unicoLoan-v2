import React from "react";
import { View, Image } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { assets } from "../../../assets/assets";
import { verticalScale } from "../../../utils/matrcis";

const ApplicationCard = () => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.primaryContainer,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View>
        <Text>Applicant Details</Text>
        <Text>LXC537676727</Text>
        <Text>Housing Loan</Text>
      </View>
      <View>
        <Image
          source={assets.homeCircle}
          style={{ height: verticalScale(100) }}
          resizeMode="contain"
        />
        <Text>UNICO HOUSING FINANCE LIMITED</Text>
      </View>
    </View>
  );
};

export default ApplicationCard;
