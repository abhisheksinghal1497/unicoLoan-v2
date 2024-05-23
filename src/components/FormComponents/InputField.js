import React, { useState } from "react";
import { View, StyleSheet, Image, KeyboardAvoidingView } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import { Controller } from "react-hook-form";
import { colors } from "../../colors";
import customTheme from "../../colors/theme";
import { getErrMsg } from "../../services/globalHelper";
import CustomShadow from "./CustomShadow";
import {
  fieldContainerStyle,
  fieldLabelViewStyle,
  fieldLabelStyle,
} from "../../constants/commonStyles";

export default InputField = ({
  control,
  validations = {},
  setValue,
  name,
  label,
  type,
  right,
  isDisabled = false,
  isRequired = false,
  tooltipText = "",
  placeholder,
  style = {},
  showRightComp = false,
  iconName,
  rightComp,
  isMultiline,
  rightCompPress,
  onChangeText,
  value: defaultValue,
  ...rest
}) => {
  const { colors, fonts } = useTheme();

  return (
    <Controller
      control={control}
      rules={{required: isRequired, ...validations}}
      defaultValue={defaultValue}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error, invalid },
      }) => {
        return (
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text style={[styles.label]}>
                {isRequired && <Text style={styles.asterisk}>* </Text>}
                {label}
              </Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <CustomShadow shadowColor={error ? colors.error : colors.primary}>
                <TextInput
                  onBlur={onBlur}
                  keyboardType={type}
                  inputMode={type}
                  returnKeyType="done"
                  error={error?.message}
                  scrollEnabled={false}
                  onChangeText={(value) => {
                    if (onChangeText) {
                      onChangeText(value);
                    } else {
                      if (type === "numeric") {
                        try {
                          let isValid = !Number.isNaN(Number(value));
                          if (isValid) {
                            onChange(Number(value));
                          } else {
                            onChange(0);
                          }
                        } catch (error) {
                          console.log(
                            "unable to convret to number: ",
                            value,
                            error
                          );
                          onChange(value);
                        }
                      } else {
                        onChange(value);
                      }
                    }
                  }}
                  value={value?.toString()}
                  disabled={isDisabled}
                  dense={true}
                  style={[
                    styles.textInput,
                    style,
                    isDisabled ? styles.disabledInput : {},
                    {height:isMultiline ? 100 : 0}
                  ]}
                  mode="outlined"
                  outlineColor={colors.border}
                  activeOutlineColor="transparent"
                  outlineStyle={styles.inputOutline}
                  contentStyle={[
                    styles.inputContent,
                    isDisabled ? styles.disabledContent : {},
                  ]}
                  placeholder={placeholder}
                  placeholderTextColor={colors.seconderyText}
                  right={
                    showRightComp ? (
                      <TextInput.Icon
                        onPress={() => {
                          if (rightCompPress) {
                            rightCompPress();
                          }
                        }}
                        // had to pass like this for right for TextInput
                        icon={
                          iconName
                            ? iconName
                            : () => (rightComp ? rightComp() : null)
                        }
                        style={styles.rightIconStyle}
                      />
                    ) : null
                  }
                  cursorColor={colors.primary}
                  multiline={isMultiline}
                  {...rest}
                />
              </CustomShadow>
            </KeyboardAvoidingView>

            {error && (
              <Text style={styles.error}>
                {" "}
                &#9432; {getErrMsg(error, label)}
              </Text>
            )}
          </View>
        );
      }}
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...fieldContainerStyle,
  },
  labelContainer: {
    ...fieldLabelViewStyle,
    marginBottom:10
  },
  label: {
    ...fieldLabelStyle,
  },
  labelText: {
    color: colors.labelColor,
  },
  asterisk: {
    color: colors.asteriskRequired,
  },
  error: {
    color: customTheme.colors.error,
    marginTop: 5,
  },
  textInput: {
    backgroundColor: customTheme.colors.textInputBackground,
    paddingHorizontal: 5,
    padding: 5,

  },
  disabledInput: {
    backgroundColor: customTheme.colors.disableBg,
  },
  disabledContent: {
    color: customTheme.colors.primaryText
  },
  inputOutline: {
    borderWidth: 0.5,
    borderRadius: 30,
  },
  inputContent: {
    minHeight: 48,
    textAlignVertical: "center",
  },
  rightIconStyle: { marginTop: 15 },
});
