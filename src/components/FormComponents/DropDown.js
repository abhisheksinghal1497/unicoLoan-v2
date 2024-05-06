import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Controller } from "react-hook-form";
import { colors } from "../../colors";
import customTheme from "../../colors/theme";
import CustomShadow from "./CustomShadow";
import { getErrMsg } from "../../services/globalHelper";

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
  style = {},
  data = [],
  ...rest
}) => {
  const { colors, fonts } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const [valueText, setValueText] = useState("");

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
                  style={[styles.selectContainer, style]}
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
                      {valueText || placeholder}
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
            <FlatList
              data={data}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.itemView}
                    onPress={() => {
                      if (setValue) {
                        setValue(name, item.value);
                        setValueText(item.label);
                      }
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.itemText}>{item?.label}</Text>
                  </TouchableOpacity>
                );
              }}
            />
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
  itemView: {
    padding: 10,
    borderTopWidth: 0.5,
  },
  itemText: {
    color: colors.black,
  },
});
