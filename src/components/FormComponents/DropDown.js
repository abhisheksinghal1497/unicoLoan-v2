import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "react-native-paper";
import { Controller } from "react-hook-form";
import { colors } from "../../colors";
import customTheme from "../../colors/theme";
import CustomShadow from "./CustomShadow";

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
  placeholder,
  ...rest
}) => {
  const { colors, fonts } = useTheme();
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
                <Text style={fonts.regularText}>
                  {isRequired && <Text style={styles.asterisk}>* </Text>}
                  {label}
                </Text>
              </View>

              <CustomShadow shadowColor={error ? colors.error : colors.primary}>
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
                      {value || placeholder}
                    </Text>
                    <Text style={styles.selectArr}>&#9013;</Text>
                  </View>
                </TouchableOpacity>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modal}>
            <Text>Options</Text>
          </View>
        </TouchableOpacity>
      </Modal>
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
  modalContainer: {
    backgroundColor: customTheme.colors.elevation.level3,
    flex: 1,
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 10,
    maxHeight: 650,
    paddingBottom: 20,
  },
});
