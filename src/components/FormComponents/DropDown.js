import React, { useEffect, useState } from "react";
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
import CustomModal from "../CustomModal";
import {
  fieldContainerStyle,
  fieldLabelViewStyle,
  fieldLabelStyle,
} from "../../constants/commonStyles";

export default DropDown = ({
  control,
  validations,
  setValue,
  name,
  label,
  type,
  right,
  value="",
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

  const [valueText, setValueText] = useState( "");


  

  const renderOptions = ({ item }) => {
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
  };

  const getTextFromVal = (value) => {
    if (value && valueText === "") {
      let valText = data.filter((el) => el.value === value);
      if (valText.length > 0) {
        return valText[0].label;
      }
    }
    return "";
  };

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
                <Text style={styles.label}>
                  {isRequired && <Text style={styles.asterisk}>* </Text>}
                  {label}
                </Text>
              </View>

              <CustomShadow shadowColor={error ? colors.error : colors.primary}>
                <TouchableOpacity
                  style={[styles.selectContainer, style,{backgroundColor : isDisabled ? customTheme.colors.disableBg : "transparent" }]}
                  disabled={isDisabled}
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
                    
                    <Text style={[value ? {color: isDisabled ? "#000" :colors.grey  } : {}]}>
                      {valueText || getTextFromVal(value) || placeholder}
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

      <CustomModal
        type="bottom"
        showModal={modalVisible}
        setShowModal={setModalVisible}
      >
        <View>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderTxt}> Select {label}</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={renderOptions}
            // ItemSeparatorComponent={<View style={styles.itemSeparator} />}
          />
        </View>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    color: colors.labelColor,
  },
  container: {
    ...fieldContainerStyle,
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
  labelContainer: {
    ...fieldLabelViewStyle,
  },
  label: {
    ...fieldLabelStyle,
  },
  selectContainer: {
    backgroundColor: customTheme.colors.textInputBackground,
    padding: 13,
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
  },
  itemText: {
    ...customTheme.fonts.regularText,
    color: colors.black,
  },
  modalHeader: {
    paddingVertical: 10,
  },
  modalHeaderTxt: {
    fontWeight: "bold",
    fontSize: 18,
  },
  itemSeparator: {
    borderTopWidth: 1,
    borderTopColor: customTheme.colors.border,
  },
});
