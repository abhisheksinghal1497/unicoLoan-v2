import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { assets } from "../../assets/assets";
import customTheme from "../../colors/theme";
import CustomButton from "../../components/Button";
import Header from "../../components/Header";

const KYCDocuments = () => {
  return (
    <ScrollView>
      <Header
        title="KYC Documents"
        left={true}
        containerStyle={{ marginHorizontal: 20 }}
      />
      <View style={styles.topCon}>
        <Image source={assets.protection} />
        <Text>
          Your data is 100% secure. We do not sell or misuse your personal data.
          Read our Privacy Policy
        </Text>
      </View>

      <View style={styles.con2}>
        <CustomImageContainer />
        <CustomImageContainer />
      </View>
      <SuccessText />
      <View style={styles.con3} />
      <View style={styles.con4}>
        <CustomImageContainer />
        <SuccessText />
        <CustomButton
          type="primary"
          label="Confirm and Continue"
          onPress={() => {}}
          buttonContainer={{ width: "100%", marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
};

const CustomImageContainer = () => {
  return (
    <View style={styles.customCon}>
      <View
        style={styles.customInnCon}
      >
        <Image source={assets.aadhar_front} />
      </View>
      <Text style={styles.conText1}>Upload Your Aadhaar Front Photo</Text>
    </View>
  );
};

const SuccessText = () => {
  return (
    <View style={styles.successCon}>
      <Image source={assets.tick} />
      <Text style={styles.successText}>E-Addhaar Successfully Verified</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topCon: {
    flexDirection: "row",
    backgroundColor: "#EEF4FD",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    marginHorizontal: 20,
  },
  conText1: {
    color: "#44465B",
    ...customTheme.fonts.regularText,
    textAlign: "center",
    marginTop: 10,
  },
  con2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  con3: { height: 1, width: "100%", backgroundColor: "#C0C0C0" },
  con4: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  customCon:{ width: "49%", alignItems: "center" },
  customInnCon:{
    borderColor: "#e1e3e8",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 50,
    width: "100%",
    borderRadius: 20,
  },
  successCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  successText: {
    ...customTheme.fonts.regularText,
    color: "#0F9D58",
    marginLeft: 10,
  },
});

export default KYCDocuments;
