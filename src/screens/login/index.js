import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ImageBackground,
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

const LoginComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [timer, setTimer] = useState(10);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    setValue,
    setError,
    trigger,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const handleSendOtp = async () => {
    try {
      const result = await trigger();
      if (!result) return;
      setShowOtpField(true);
    } catch (error) {}
  };

  const onOtpSubmit = async () => {
    try {
      const result = await trigger();
      if (!result) return;
      navigation.navigate(screens.Register);
    } catch (error) {}
  };

  const handleOtpResend = () => {
    if (timer === 0) {
      setTimer(60);
    }
  };

  const LoginInput = () => {
    return (
      <View>
        <Text style={[styles.text_font_14, { lineHeight: verticalScale(16) }]}>
          As you are our existing user,{"\n"}please login using your mobile
          number
        </Text>
        <Controller
          control={control}
          rules={{ required: true, ...validations.phone }}
          name="phone-number"
          render={({
            field: { onChange, onBlur, value },
            fieldState: { error, invalid },
          }) => {
            console.log({ error });
            return (
              <View>
                <CustomShadow
                  shadowColor={error ? customTheme.colors.error : ""}
                  containerStyle={{ marginTop: 24 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      minHeight: 60,
                      alignItems: "center",
                      // paddingHorizontal: 8,
                      // justifyContent: "space-around",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingHorizontal: horizontalScale(20),
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.text_font_18}>+91</Text>
                      <TextInput
                        includeFontPadding={false}
                        style={[
                          {
                            marginHorizontal: 0,
                            paddingHorizontal: 0,
                            paddingVertical: 0,
                            paddingLeft: horizontalScale(5),
                          },
                          styles.text_font_18,
                        ]}
                        maxLength={10}
                        placeholder="Mobile number"
                        keyboardType="phone-pad"
                        value={value}
                        onChangeText={onChange}
                        placeholderTextColor={"#BDBDBD"}
                        onBlur={onBlur}
                      />
                    </View>
                    <Text
                      onPress={handleSendOtp}
                      style={[
                        {
                          alignItems: "flex-end",
                          fontFamily: "Nunito",
                          fontSize: 14,
                          fontWeight: "400",
                          fontStyle: "normal",
                          lineHeight: 14,
                          color: "#21005B",
                        },
                      ]}
                    >
                      Verify
                    </Text>
                  </View>
                </CustomShadow>
                {error && (
                  <Text
                    style={{ color: customTheme.colors.error, marginTop: 5 }}
                  >
                    {" "}
                    &#9432; {getErrMsg(error, "Phone number", "phone-number")}
                  </Text>
                )}
              </View>
            );
          }}
        />

        <View style={{ marginTop: verticalScale(15) }}>
          <Button
            type="primary"
            label="Continue"
            labelStyle={{ color: "#fff" }}
            onPress={handleSendOtp}
            disabled={!phoneNumber}
          />
        </View>
      </View>
    );
  };

  const OtpInput = () => {
    useEffect(() => {
      let interval;
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }, [timer]);

    return (
      <View>
        <Text style={[styles.text_font_20, { fontWeight: "bold" }]}>
          Enter OTP
        </Text>
        <Text style={[styles.text_font_14]}>
          OTP has sent to your Mobile Number
        </Text>
        <FormControl
          compType={component.otpInput}
          control={control}
          validations={validations.otpLogin}
          name={"otp"}
          label={"OTP"}
          errors={errors?.otp}
          isRequired={true}
          otpLimit={4}
          style={styles.otpInputContainer}
          // placeholder={'Enter otp'}
          setValue={setValue}
          outlineStyle={{
            borderRadius: 10,
            borderWidth: 0,
            borderColor: "transparent",
          }}
          //   value={comp.value}
        />

        <View style={{ marginTop: verticalScale(15) }}>
          <Button
            type="primary"
            label="Submit"
            labelStyle={{ color: "#fff" }}
            onPress={onOtpSubmit}
            // disabled={!phoneNumber}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            onPress={() => handleOtpResend(timer)}
            style={[styles.text_font_14, { lineHeight: verticalScale(16) }]}
          >
            {timer > 0 && `OTP will expire in 00:${timer} `}
            <Text style={{ color: "#0076C7" }}>Resend otp</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ padding: verticalScale(20) }}>
        <View style={{ marginTop: verticalScale(10) }}>
          <Text style={[styles.text_font_20, { fontWeight: "600" }]}>
            Welcome Back
          </Text>
          <Text style={[styles.text_font_18, { marginTop: verticalScale(5) }]}>
            Let's resume your journey!
          </Text>
        </View>
        {showOtpField ? <OtpInput /> : <LoginInput />}
      </View>

      <View style={{ flex: 1, paddingTop: verticalScale(50) }}>
        <ImageBackground
          source={City}
          style={{ height: "100%", width: "100%", justifyContent: "flex-end" }}
          resizeMode="contain"
        >
          <View
            style={{
              padding: verticalScale(20),
              paddingBottom: verticalScale(30),
            }}
          >
            <Text style={[styles.notRegisteredText]}>
              Not registered yet?{" "}
              <Text onPress={() => navigation.navigate(screens.Register)} style={{ color: "#0076C7" }}>Click here to register</Text>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
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
