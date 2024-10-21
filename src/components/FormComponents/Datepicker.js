// import { Button } from "@rneui/base";
import React from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { TextInput, Text, useTheme } from "react-native-paper";
import { horizontalScale, verticalScale } from "./../../utils/matrcis";
import { colors } from "../../colors";
import customTheme from "../../colors/theme";
import CustomShadow from "./CustomShadow";
import moment from "moment";
import {
  fieldContainerStyle,
  fieldLabelViewStyle,
  fieldLabelStyle,
} from "../../constants/commonStyles";
import { getErrMsg } from "../../services/globalHelper";

export default function CustomDatepicker({
  control,
  validations = {},
  setValue,
  name,
  label,
  datepickerProps,
  isDisabled = false,
  isRequired = false,
  isVisible = true,
  trigger = () => { },
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
    try {
      if (typeof dateString !== "string") {
        return dateString;
      } else {
        return new Date(dateString);
      }
    } catch (error) {
      return new Date();
    }
  };

  const formatDate = (date) => {
    try {
      if (!date) return "";

      // Create a moment object with the input date
      const momentDate = moment(date, "DD-MM-YYYY", true);
      if (momentDate.isValid()) {
        return momentDate.format("DD-MM-YYYY");
      } else {
        return date;
      }
    } catch (error) {
      return date;
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{ required: isRequired, ...validations }}
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
              <TouchableOpacity
                onPress={() => {
                  !isDisabled && setOpen(true);
                }}
              >
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
                    mode="outlined"
                    outlineColor={colors.border}
                    outlineStyle={styles.inputOutline}
                    {...rest}
                  />
                </CustomShadow>
              </TouchableOpacity>
              {/* {error?.message && (
                <Text style={styles.errorMessage}>{error?.message}</Text>
              )} */}

              {error && (
                <Text style={styles.errorMessage}>
                  {" "}
                  &#9432; {getErrMsg(error, label, name)}
                </Text>
              )}

              <DatePicker
                modal
                // date={value ? jsCoreDateCreator(value) : new Date()}
                date={new Date()}
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
                placeholder="select Date"
                format="DD-MM-YYYY"
                is24hourSource="device"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                {...datepickerProps}
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
  labelText: {
    color: colors.labelColor,
  },
  inputOutline: {
    borderWidth: 0,
    borderRadius: 30,
  },
  container: {
    ...fieldContainerStyle,
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
