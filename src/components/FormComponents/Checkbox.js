import React from "react";
import { Checkbox, Text } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Controller } from "react-hook-form";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { colors } from "../../colors";
import { assets } from "../../assets/assets";

export default function CheckBox({
  control,
  validations={},
  name,
  label,
  checkboxProps,
  isRequired = false,
}) {
  const getCheckboxImage = (value, error) => {
    if (!!error) {
      return assets.checkboxError;
    } else if (value) {
      return assets.checkboxOn;
    } else {
      return assets.checkboxOff;
    }
  };
  return (
    <View key={label + name}>
      <Controller
        control={control}
        rules={{required: isRequired, ...validations}}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View style={styles.container}>
            <Text style={styles.label}>
              {label} {isRequired && <Text style={styles.asterisk}>*</Text>}
            </Text>

            <TouchableOpacity
              onPress={() => {
                onChange(!value);
              }}
            >
              <Image
                source={getCheckboxImage(value, error)}
                style={{ height: verticalScale(30) }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* <Checkbox
              {...checkboxProps}
              onPress={() => {
                setChecked(!checked);
                onChange(!checked);
              }}
              
              status={checked ? "checked" : "unchecked"}
            /> */}
            {/* {error.message && <Text>{error?.message}</Text>} */}
          </View>
        )}
        name={name}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(23),
    marginVertical: verticalScale(6),
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    paddingTop: verticalScale(5),
    marginRight: horizontalScale(2),
  },
  asterisk: {
    color: colors.asteriskRequired,
  },
});
