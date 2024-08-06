import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, useTheme, Text } from "react-native-paper";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { colors } from "../../colors/index";
import customTheme from "../../colors/theme";
import { Controller } from "react-hook-form";
import { getErrMsg } from "../../services/globalHelper";
import CustomShadow from "./CustomShadow";

export default function OtpInput({
  control,
  validations = {},
  validationProps,
  setValue,
  name,
  label,
  isVisible = true,
  isDisabled = false,
  otpLimit = 6,
  isRequired = false,
  trigger = () => { },
  ...rest
}) {
  const { colors: themeColor } = useTheme();
  if (!isVisible) {
    return null;
  }

  const inputRefs = [];

  const handleTextChange = (text, index, otp, setOtp) => {
    try {
      const newValue = otp ? otp.split("") : [];
      newValue[index] = text?.split("")[text?.length - 1];
      // onChange(newValue.join(''));
      setOtp(newValue.join(""));
      if (text && index < inputRefs.length - 1) {
        inputRefs[index + 1]?.focus();
      }

    } catch (error) {

    }
  }


  const handleKeyPress = (e, index, otp) => {
    if (e.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs[index - 1]?.focus();
    }
  };

  return (
    <Controller
      control={control}
      rules={{ required: isRequired, ...validations }}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error, invalid },
      }) => {
        return (
          <View style={styles.container}>
            <View style={styles.otpContainer}>
              {Array.from({ length: otpLimit }, (_, index) => (

                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs[index] = ref)}
                  keyboardType="numeric"
                  underlineColor="transparent"
                  cursorColor={colors.coreBlue}
                  disabled={isDisabled}
                  onChangeText={(text) =>
                    handleTextChange(text, index, value, onChange)
                  }
                  onKeyPress={(e) => handleKeyPress(e, index, value)}
                  value={value?.charAt(index) || ""}
                  style={[styles.textInput, index !== 0 && styles.otpInput, {
                    backgroundColor: '#fffff'
                  }]}


                  maxLength={1}
                  mode="outlined"

                  outlineStyle={{

                    backgroundColor: colors.white,
                    margin: -2,


                    borderColor: "rgba(232, 232, 234, 1.0)"
                  }}
                  {...rest}
                />

              ))}
            </View>

            {error && (
              <Text style={styles.error}>
                {" "}
                &#9432; {getErrMsg(error, label)}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(8),
    marginVertical: verticalScale(6),
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textInput: {
    flex: 1,


  },
  error: {
    color: customTheme.colors.error,
    marginTop: 5,
  },

  otpInput: {
    marginLeft: horizontalScale(8),
    borderBottomWidth: 0,
  },
});
