import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Text, useTheme } from "react-native-paper";
import { Controller } from "react-hook-form";
import { colors } from "../../colors";
import customTheme from "../../colors/theme";
import { getErrMsg } from "../../services/globalHelper";
import CustomShadow from "./CustomShadow";

export default InputField = ({
  control,
  validations,
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
  ...rest
}) => {
  const { colors, fonts } = useTheme();

  return (
    <Controller
      control={control}
      rules={validations}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error, invalid },
      }) => {
        return (
          <View style={styles.container}>
            <View style={styles.labelContainer}>
              <Text style={[fonts.regularText, styles.labelText]}>
                {isRequired && <Text style={styles.asterisk}>* </Text>}
                {label}
              </Text>
            </View>
            <CustomShadow shadowColor={error ? colors.error : colors.primary}>
              <TextInput
                onBlur={onBlur}
                keyboardType={type}
                returnKeyType="done"
                error={error?.message}
                scrollEnabled={false}
                onChangeText={(value) => {
                  onChange(value);
                }}
                value={value?.toString()}
                disabled={isDisabled}
                dense={true}
                style={[styles.textInput, style]}
                mode="outlined"
                outlineColor={colors.border}
                outlineStyle={styles.inputOutline}
                placeholder={placeholder}
                placeholderTextColor={colors.seconderyText}
                {...rest}
              />
            </CustomShadow>

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
    marginHorizontal: 5,
    marginVertical: 10,
    paddingBottom: 0,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 2,
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
  },
  inputOutline: {
    borderWidth: 0.5,
    borderRadius: 30,
  },
});
