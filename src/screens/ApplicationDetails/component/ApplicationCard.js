import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme, Text } from "react-native-paper";
import { assets } from "../../../assets/assets";
import { horizontalScale, verticalScale } from "../../../utils/matrcis";
import CircularProgress from "../../../components/CircularProgress";
import { useRoute } from '@react-navigation/native';
import { colors } from "../../../colors";
import { screens } from "../../../constants/screens";


const ApplicationCard = ({navigation}) => {
  const { colors } = useTheme();
  const route = useRoute();
  const ProgressBarPercent = route.params.ProgressBarPercent;
  console.log('ProgressBarPercent',ProgressBarPercent)
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
        {/* <Image
          source={assets.homeCircle}
          style={{
            height: verticalScale(120),
            width: horizontalScale(180),
            marginBottom: verticalScale(10),
            // alignSelf: "flex-end",
          }}
          resizeMode="contain"
        /> */}
       <CircularProgress   imageStyle={{ width: 47, height: 39 }}
 ImageData={require('../../../../assets/images/Home2.png')} size ={105} strokeWidth={12} progressPercent={ProgressBarPercent} bgColor ={'#F2F2F2'} pgColor={'#2E52A1'} />
        <Text style={{ fontSize: verticalScale(11), color: "#2E52A1", marginTop: verticalScale(10) }}>
          UNICO HOUSING FINANCE LIMITED
        </Text>
        <TouchableOpacity onPress={()=> navigation.navigate(screens.PayNow)} style={styles.PayNowButton}>
      <Text style={styles.PayNowText}>Pay Now</Text>
    </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  PayNowButton: {
    justifyContent: 'center',
    alignSelf: 'center',
  marginTop: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(4),
    backgroundColor:colors.coreCream,
    borderRadius: 4,
    width: verticalScale(65),
   
  },
  PayNowText: {
    fontSize: 10,
    color: colors.coreBlue,
    alignSelf:'center'
  },
})
export default ApplicationCard;
