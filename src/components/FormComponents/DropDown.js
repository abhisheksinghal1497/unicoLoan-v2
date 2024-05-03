import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "react-native-paper";
import { Controller } from "react-hook-form";
import { colors } from "../../colors";
import customTheme from "../../colors/theme";

export default DropDown = ({
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
  ...rest
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
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
                <Text>
                  {isRequired && <Text style={styles.asterisk}>* </Text>}
                  {label}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.selectContainer}
                activeOpacity={1}
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <View
                  style={[
                    styles.selectField,
                    error && { borderColor: colors.error },
                  ]}
                >
                  <Text style={[value ? { color: colors.grey } : {}]}>
                    {value || "Select"}
                  </Text>
                  <Text style={styles.selectArr}>&#9013;</Text>
                </View>
              </TouchableOpacity>

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

      {/* //! show modal when modalVisible is true */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 10,
    paddingBottom: 0,
  },
  selectArr: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "900",
  },
  asterisk: {
    color: colors.asteriskRequired,
  },
  error: {
    color: customTheme.colors.error,
    marginTop: 5,
  },
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
  selectContainer: {
    backgroundColor: customTheme.colors.textInputBackground,
    padding: 10,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  selectField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
