import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  component,
  FormControl,
} from "../../components/FormComponents/FormControl";
import { validations } from "../../constants/validations";
import { Text } from "react-native-paper";
import { useForm } from "react-hook-form";
import {
  useResendOtpService,
  useVerifyOtpService,
} from "../../services/ApiUtils";
import CustomButton from "../../components/Button";
import { colors } from "../../colors";
import { fieldLabelStyle } from "../../constants/commonStyles";
import customTheme from "../../colors/theme";
import { verticalScale } from "../../utils/matrcis";
import Header from "../../components/Header";
import { assets } from "../../assets/assets";
import { useRoute } from "@react-navigation/native";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import { TouchableOpacity } from "react-native-gesture-handler";

const ServiceOtp = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });
  const route = useRoute();
  const { requestedService = "", requestedServiceSubCategory = "" } =
    route?.params || {};
  console.log({ requestedService, requestedServiceSubCategory });
  const onOtpVerify = (data) => {
    props.navigation.navigate(screens.HomeScreen);
  };
  const { isPending: isVerifyOtpLoading, mutate: verifyOtpMutate } =
    useVerifyOtpService(onOtpVerify);
  const {
    isPending: isResendOtpLoading,
    mutate: resendOtpMutate,
    data: resendOtpData,
  } = useResendOtpService();

  const RenderOtpComponent = () => {
    return (
      <View style={{ marginVertical: verticalScale(15) }}>
        <View style={style.labelContainer}>
          <Text style={[style.label]}>
            <Text style={style.asterisk}>* </Text>
            Enter otp
          </Text>
        </View>
        <FormControl
          compType={component.otpInput}
          control={control}
          watch={watch}
          validations={validations.otp}
          name="otp"
          label="otp"
          errors={errors.otp}
          isRequired
          setValue={setValue}
          style={style.otpInputContainer}
          maxLength={6}
          trigger={trigger}
        />
      </View>
    );
  };

  const RenderButton = () => {
    const label = "Verify";
    const onPress = handleSubmit(verifyOtpMutate);
    return <CustomButton type="primary" label={label} onPress={onPress} />;
  };

  const RenderResendOtp = () => {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
      const oneSecondInMs = 1000;
      let timeout;
      timeout = setTimeout(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearTimeout(timeout);
        }
      }, oneSecondInMs);

      return () => {
        clearTimeout(timeout);
      };
    }, [timer]);

    useEffect(() => {
      if (resendOtpData) {
        setTimer(30);
      }
    }, [isResendOtpLoading, resendOtpData]);

    return (
      <View style={{ marginBottom: verticalScale(15) }}>
        {timer > 0 ? (
          <View>
            <Text style={style.resendOtpText}>Resend otp in {timer}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() =>
              resendOtpMutate({ requestedService, requestedServiceSubCategory })
            }
          >
            <Text
              style={[
                style.resendOtpText,
                {
                  color: customTheme.colors.primary,
                },
              ]}
            >
              Resend otp
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={style.contentContainerStyle}>
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: colors.white,
        }}
      >
        <Header
          title="Service"
          left={assets.back}
          leftStyle={{ height: verticalScale(15), width: verticalScale(15) }}
          leftImageProps={{ resizeMode: "contain" }}
          rightStyle={{
            height: verticalScale(23),
            width: verticalScale(23),
            marginHorizontal: 10,
          }}
          rightImageProps={{ resizeMode: "contain" }}
          titleStyle={{ fontSize: verticalScale(18) }}
          onPressLeft={() => {
            props?.navigation?.goBack();
          }}
        />

        <ActivityIndicatorComponent
          visible={isVerifyOtpLoading || isResendOtpLoading}
        />

        <RenderOtpComponent />
        <RenderResendOtp />
        <RenderButton />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  contentContainerStyle: { flex: 1, backgroundColor: colors.white },
  otpInputContainer: {
    flex: 1,
    backgroundColor: customTheme.colors.greyShadow,
    // marginLeft: 10,
    // height: 60,
    // marginVertical: 20,
    borderWidth: 2,
    borderColor: "#E8E8EA",
  },
  labelContainer: {
    ...fieldLabelStyle,
    textAlign: "left",
    marginVertical: 0,
  },
  label: {
    ...fieldLabelStyle,
    textAlign: "left",
    marginBottom: 0,
  },
  labelText: {
    color: colors.labelColor,
  },
  asterisk: {
    color: colors.asteriskRequired,
  },
  resendOtpText: {
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default ServiceOtp;
