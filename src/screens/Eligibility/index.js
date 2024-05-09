import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import InputField from "../../components/FormComponents/InputField";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Button";
import Card from "../../components/Card";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import customTheme from "../../colors/theme";
import { assets } from "../../assets/assets";

const cardData = {
  Product: "Home Loan",
  "Request Loan Amount": "50 lac",
  "Cibil Score": 846,
  "Number of Enquiries in the last 6 months": 2,
  "Eligible Status": "Eligible",
  "Eligible Loan Amount": "45 lac",
};

const Eligibility = () => {
  const [showBottomModal, setShowBottomModal] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: "",
    mode: "all",
  });

  return (
    <ScrollView>
      <View style={styles.topCon}>
        <Card cardStyle={styles.cardCon}>
          <ImageBackground
            source={assets.Frame2}
            resizeMode="cover"
            style={{ height: 168 }}
          >
            <View style={styles.cardInnView}>
              <Text style={styles.cardText1}>You are eligible for upto</Text>
              <Text style={styles.cardText2}>₹ 1.2 Crore</Text>
              <Text style={styles.cardText3}>@6.75% - 7.25% interest p.a</Text>
            </View>
          </ImageBackground>
        </Card>
        <Card>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => setShowBottomModal(!showBottomModal)}
          >
            <Text style={styles.textStyle}>Add Co-Aplicant</Text>
          </TouchableOpacity>
          {Object.keys(cardData).map((el, i) => (
            <CustomComponent title={el} value={cardData[el]} />
          ))}
        </Card>
      </View>

      <CustomModal
        type="bottom"
        showModal={showBottomModal}
        setShowModal={setShowBottomModal}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <InputField
            control={control}
            validations={{
              required: true,
              minLength: 2,
            }}
            setValue={setValue}
            name=""
            label="Co-Applicant Name"
          />
          <InputField
            control={control}
            validations={{
              required: true,
              minLength: 2,
            }}
            setValue={setValue}
            name=""
            label="Co-Applicant DOB"
          />
          <InputField
            control={control}
            validations={{
              required: true,
              minLength: 2,
            }}
            setValue={setValue}
            name=""
            label="Co-Applicant Income"
          />
          <CustomButton
            type="primary"
            label="Save"
            onPress={() => setShowBottomModal(!showBottomModal)}
          />
          <CustomButton
            type="primary"
            label="Cancel"
            onPress={() => setShowBottomModal(!showBottomModal)}
            buttonContainer={{ marginTop: 20 }}
          />
        </ScrollView>
      </CustomModal>
    </ScrollView>
  );
};

const CustomComponent = ({ title, value }) => {
  return (
    <View style={styles.customCompCon}>
      <Text variant="titleSmall" style={styles.titleStyle}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.valueStyle}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topCon: {
    marginHorizontal: 20,
  },
  cardCon: {
    paddingTop: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    marginVertical: 15,
  },
  cardInnView: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "center",
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: "#2E52A1",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 20,
  },
  customCompCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textStyle: {
    ...customTheme.fonts.smallText,
    color: "#2E52A1",
  },
  titleStyle: {
    ...customTheme.fonts.mediumText,
    maxWidth: "50%",
  },
  valueStyle: {
    ...customTheme.fonts.mediumText,
    fontWeight: "400",
    fontSize: 11,
    color: "#2E52A1",
  },
  cardText1: {
    ...customTheme.fonts.mediumText,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
  },
  cardText2: {
    ...customTheme.fonts.largeText,
    color: "#FFFFFF",
    fontSize: 32,
    marginBottom: 10,
  },
  cardText3: {
    ...customTheme.fonts.mediumText,
    color: "#FFFFFF",
    fontSize: 9,
    marginBottom: 10,
  },
});

export default Eligibility;
