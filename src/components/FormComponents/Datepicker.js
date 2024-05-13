// import { Button } from "@rneui/base";
import React from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { TextInput, Text, useTheme } from "react-native-paper";
import { horizontalScale, verticalScale } from "./../../utils/matrcis";
import { colors } from "../../colors";
import customTheme from "../../colors/theme";
import CustomShadow from "./CustomShadow";
import {
  fieldContainerStyle,
  fieldLabelViewStyle,
  fieldLabelStyle,
} from "../../constants/commonStyles";

export default function CustomDatepicker({
  control,
  validations,
  setValue,
  name,
  label,
  datepickerProps,
  isDisabled = false,
  isRequired = false,
  isVisible = true,
  ...rest
}) {
  const { colors: themeColor } = useTheme();
  const [open, setOpen] = useState(false);
  if (!isVisible) {
    return null; // If isVisible is false, the component won't be rendered
  }
  const jsCoreDateCreator = (dateString) => {
    // dateString *HAS* to be in this format "YYYY-MM-DD HH:MM:SS"
    // console.log('date String', dateString, typeof dateString);
    if (typeof dateString !== "string") {
      return dateString;
    } else {
      return new Date(dateString);
    }
  };
  const formatDate = (date) => {
    if (!date) return "";
    let newdate;
    newdate = jsCoreDateCreator(date);
    const day = newdate && newdate?.getDate().toString().padStart(2, "0");
    const month =
      newdate && (newdate?.getMonth() + 1).toString().padStart(2, "0");
    const year = newdate && newdate?.getFullYear();

    return `${day}-${month}-${year}`;
  };
  return (
    <View>
      <Controller
        control={control}
        rules={validations}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View style={styles.container}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>
                  {isRequired && <Text style={styles.asterisk}>* </Text>}
                  {label}
                </Text>
              </View>
              <CustomShadow
                shadowColor={error ? themeColor.error : themeColor.primary}
              >
                <TextInput
                  value={value ? formatDate(value) : ""}
                  editable={false}
                  disabled={isDisabled}
                  error={error?.message}
                  style={styles.textInput}
                  placeholder="MM/DD/YYYY"
                  right={
                    <TextInput.Icon
                      icon="calendar-month"
                      onPress={() => {
                        !isDisabled && setOpen(true);
                      }}
                    />
                  }
                  mode="outlined"
                  outlineColor={colors.border}
                  outlineStyle={styles.inputOutline}
                  {...rest}
                />
              </CustomShadow>
              {error?.message && (
                <Text style={styles.errorMessage}>{error?.message}</Text>
              )}

              <DatePicker
                {...datepickerProps}
                modal
                date={value ? jsCoreDateCreator(value) : new Date()}
                open={open}
                onBlur={onBlur}
                onCancel={() => {
                  setOpen(false);
                }}
                onConfirm={(value) => {
                  // let formattedDate = format(value, 'dd/MM/yyyy');
                  onChange(value);
                  setOpen(false);
                }}
                mode="date"
                // locale="enGB"
                placeholder="select Date"
                format="DD-MM-YYYY"
                is24hourSource="device"
                // minDate="01-01-1916"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
              />
            </View>
          );
        }}
        name={name}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputOutline: {
    borderWidth: 0.5,
    borderRadius: 30,
  },
  container: {
    ...fieldContainerStyle,
    // marginHorizontal: horizontalScale(8),
    // marginVertical: verticalScale(6),
    // paddingBottom: 0,
  },
  label: {
    ...fieldLabelStyle,
  },
  labelContainer: {
    ...fieldLabelViewStyle,
  },
  datePickerStyle: {
    width: horizontalScale(200),
    marginTop: verticalScale(20),
  },
  asterisk: {
    color: colors.asteriskRequired,
  },
  textInput: {
    backgroundColor: customTheme.colors.textInputBackground,
    paddingHorizontal: horizontalScale(5),
  },
  errorMessage: {
    color: customTheme.colors.error,
    marginTop: verticalScale(2),
  },
});
