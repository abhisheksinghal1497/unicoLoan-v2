import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { colors } from "../../colors";
import CustomShadow from "../../components/FormComponents/CustomShadow";
import InputField from "../../components/FormComponents/InputField";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import Button from "../../components/Button";
import City from "../../assets/city.png";
import {
  component,
  FormControl,
} from "../../components/FormComponents/FormControl";
import { Controller, useForm } from "react-hook-form";
import { validations } from "../../constants/validations";
import { getErrMsg } from "../../services/globalHelper";
import customTheme from "../../colors/theme";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../constants/screens";
import { TouchableOpacity } from "react-native";

const LoginComponent = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation();

  const form = [
    {
      id: "FirstName",
      label: "First Name",
      type: component.textInput,
      placeHolder: "Enter first Name",
      validations: validations.name,
      isRequired: true,
      value: "",
    },
    {
      id: "LName__c",
      label: "Last Name",
      type: component.textInput,
      placeHolder: "Enter last Name",
      validations: validations.name,
      isRequired: true,
      maxLength: 255,
      value: "",
    },
    {
      id: "MobNumber__c",
      label: "Mobile number",
      type: component.textInput,
      placeHolder: "Enter mobile number",
      validations: validations.phone,
      isRequired: true,
      value: "",
      maxLength: 10,
    },
    {
      id: "EmailId__c",
      label: "Email",
      type: component.textInput,
      placeHolder: "Enter email",
      validations: validations.email,
      isRequired: true,
      value: "",
    },
  ];

  const handleCheckBoxClick = () => {
    setIsChecked(!isChecked);
  };

  const {
    control,
    formState: { errors, isValid },
    trigger,
    setValue,
    handleSubmit
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    try {
      const result = await trigger();
      if (!result) return;
      navigation.navigate(screens.HomeScreen)
    } catch (error) {}
  };

  const LoginInput = () => {
    return (
      <View>
        {form.map((comp, index) => {
          return (
            <FormControl
              key={index?.toString()}
              compType={comp.type}
              control={control}
              validations={comp.validations}
              name={comp.id}
              label={comp.label}
              errors={errors[comp.id]}
              isRequired={comp.isRequired}
              placeholder={comp.placeHolder}
              data={comp.data}
              keyIndex={comp.id}
              setValue={setValue}
              isMultiline={comp.isMultiline}
              maxLength={comp.maxLength}
              isDisabled={comp.isDisabled}
              isCheckboxType={comp.isCheckboxType}
              //   onChangeText={(value) => ChangeValue(value, comp.id)}
              type={comp.keyboardtype}
              trigger={trigger}
            />
          );
        })}
        <View style={{ marginTop: verticalScale(15) }}>
          <Button
            type="primary"
            label="Continue"
            onPress={handleSubmit(onSubmit)}
            labelStyle={{ color: "#fff" }}
          />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: verticalScale(20) }}>
        <View style={{ marginTop: verticalScale(10) }}>
          <Text style={[styles.text_font_20, { fontWeight: "600" }]}>
            Welcome
          </Text>
          <Text style={[styles.text_font_18, { marginTop: verticalScale(5) }]}>
            Let's sign you up.
          </Text>
        </View>
        <LoginInput />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "84%",
            marginHorizontal: horizontalScale(20),
            marginTop: verticalScale(25),
            marginBottom: verticalScale(15),
          }}
        >
          <TouchableOpacity style={{}} onPress={handleCheckBoxClick}>
            <Image
              style={{ width: 22, height: 22, resizeMode: "contain" }}
              source={
                isChecked
                  ? require("../../assets/checked.png")
                  : require("../../assets/box.png")
              }
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: verticalScale(5),
              fontSize: 14,
              lineHeight: 18,
              color: "#000000",
            }}
            onPress={() => setModalVisible2(true)}
          >
            By signing up, I accept all terms & conditions of Unico Housing
            Finance Private Limited.
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, paddingTop: verticalScale(50), paddingBottom: verticalScale(15), }}>
        <ImageBackground
          source={City}
          style={{ height: verticalScale(250), width: "100%", justifyContent: "flex-end" }}
          resizeMode="cover"
        >
          <View
            style={{
                alignItems:'center',
                paddingBottom: verticalScale(5),
            //   padding: verticalScale(20),
             
            }}
          >
            <Text style={[styles.notRegisteredText]}>
              Not registered yet?{" "}
              <Text style={{ color: "#0076C7" }}>Click here to Login</Text>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  otpInputContainer: {
    flex: 1,
    backgroundColor: customTheme.colors.greyShadow,
    marginLeft: 10,
    height: 60,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#E8E8EA",
  },
  notRegisteredText: {
    fontSize: verticalScale(14),
    color: "#000",
  },
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  otpSentMessage: {
    marginTop: 10,
    textAlign: "center",
  },

  text_font_20: {
    fontFamily: "Nunito",
    fontSize: verticalScale(18),
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 28,
    color: colors.black,
  },
  text_font_18: {
    fontFamily: "Nunito",
    fontSize: 18,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 28,
    color: colors.black,
  },
  text_font_14: {
    fontFamily: "Nunito",
    fontSize: 14,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 14,

    color: "#464646",
    marginVertical: 16,
  },
});

export default LoginComponent;
