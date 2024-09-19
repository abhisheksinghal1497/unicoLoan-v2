import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Header from "../../components/Header";
import { assets } from "../../assets/assets";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { useForm } from "react-hook-form";
import { colors } from "../../colors";
import {
  component,
  FormControl,
} from "../../components/FormComponents/FormControl";
import {
  getServiceForm,
  useSubmitServiceForm,
  useVerifyOtpService,
} from "../../services/ApiUtils";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import CustomButton from "../../components/Button";
import { StyleSheet } from "react-native";
import customTheme from "../../colors/theme";
import { validations } from "../../constants/validations";
import { fieldLabelStyle } from "../../constants/commonStyles";
import { screens } from "../../constants/screens";

const formId = {
  MainServiceRequest: "MainServiceRequest",
  MakePayment: "MakePayment",
  ViewStatementRequest: "ViewStatementRequest",
  recentTransaction: "recentTransaction",
  ServiceRequest: "ServiceRequest",
  LoanNumber: "LoanNumber",
};

const Services = (props) => {
  const [{ data: formData = [], error, isLoading }] = getServiceForm();
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
  const MainServiceRequest = watch(formId.MainServiceRequest);
  const submitFormData = useSubmitServiceForm();

  const onSubmit = (data) => {
    if (isValid) {
      submitFormData.mutate(data);
    }
  };

  const RenderForm = () => {
    const checkConditionRender = (id) => {
      if (id === formId.MainServiceRequest) {
        return true;
      } else if (id !== formId.MainServiceRequest && !MainServiceRequest) {
        return false;
      } else if (id !== MainServiceRequest) {
        return false;
      }
      return true;
    };

    return (
      <View style={{ marginVertical: 16 }}>
        {formData.map((comp, index) => {
          if (!checkConditionRender(comp.id)) {
            return <></>;
          }
          return (
            <FormControl
              key={comp.id}
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
              onChangeText={(value) => ChangeValue(value, comp.id)}
              type={comp.keyboardtype}
              trigger={trigger}
            />
          );
        })}
      </View>
    );
  };

  const RenderButton = () => {
    const label = "Continue";
    const onPress = handleSubmit(onSubmit);
    return (
      !!MainServiceRequest && (
        <CustomButton type="primary" label={label} onPress={onPress} />
      )
    );
  };

  useEffect(() => {
    if (submitFormData.data) {
      console.log({ data: submitFormData.data });
      const keys = Object.keys(submitFormData.data);
      props.navigation.navigate(screens.ServiceOtp, {
        requestedService: submitFormData.data[keys[0]],
        requestedServiceSubCategory: submitFormData.data[keys[1]],
      });
    }
  }, [submitFormData.data]);

  return (
    <ScrollView contentContainerStyle={style.contentContainerStyle}>
      <Header
        title="Services"
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
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: colors.white,
        }}
      >


          <ActivityIndicatorComponent visible={isLoading || submitFormData.isPending} />

        <RenderForm />
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
    marginBottom: 0,
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
});

export default Services;
