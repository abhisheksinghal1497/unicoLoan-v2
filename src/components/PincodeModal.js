import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomModal from "./CustomModal";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { verticalScale } from "../utils/matrcis";
import { getPinCodes } from "../services/ApiUtils";
import Button from "./Button";
import { useTheme } from "react-native-paper";
import { screens } from "../constants/screens";
import { useResetRoutes } from "../utils/functions";

const PincodeModal = ({ modalVisible = false, setModalVisible = () => {} }) => {
  const [pinCode, setPinCode] = useState("");
  const { data: pincodeDataRes = [], mutate: getPincodeMutate } = getPinCodes();
  const { colors } = useTheme();
  const resetRoute = useResetRoutes()

  const HandlePinCode = (value) => {
    setPinCode(value);
  };

  const HandlePinSearch = async (value) => {
    setPinCode(value);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const FilteredPincode = useMemo(() => {
    function filterDuplicatePincode(pinData) {
      const uniquePins = new Set();
      const uniquePinData = [];
      pinData.forEach((item) => {
        if (item && item.PinCode__r && item.PinCode__r.PIN__c) {
          const pinCode = item.PinCode__r.PIN__c;
          if (!uniquePins.has(pinCode)) {
            uniquePins.add(pinCode);
            uniquePinData.push(item);
          }
        }
      });
      return uniquePinData;
    }
    const matchingPincodes = filterDuplicatePincode(pincodeDataRes)?.filter(
      (pin) =>
        pinCode?.length > 0 &&
        pin?.PinCode__r?.PIN__c.toString().includes(pinCode)
    );
    return matchingPincodes;
  }, [pinCode, pincodeDataRes]);

  const handleOkPress = () => {
    if (FilteredPincode?.length >= 1) {
      setPinCode("");
      setModalVisible(false);
      setTimeout(() => {
        resetRoute(screens.ApplicantDetails, { pincode: pinCode, pincodeData: FilteredPincode[0] });
      }, 200);
    }
  };

  const isValid = FilteredPincode.length !== 0 || pinCode.length === 0;

  useEffect(() => {
    getPincodeMutate();
  }, []);

  return (
    <CustomModal
      type="center"
      showModal={modalVisible}
      setShowModal={setModalVisible}
      centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      modalStyle={[styles.modal]}
    >
      <StatusBar hidden={modalVisible} backgroundColor="transparent" />
      <View style={styles.modalHeader}>
        <Text style={styles.modalHeaderTxt}>Enter Pin code</Text>
        <EvilIcons
          onPress={closeModal}
          name="close"
          size={verticalScale(22)}
          color={"#828282"}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.pinValue}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={(val) => HandlePinSearch(val)}
          value={pinCode}
          placeholder="Enter pincode here"
        />
      </View>

      {!isValid && (
        <View>
          <Text style={{ color: colors.error }}>
            Pincode is not serviceable
          </Text>
        </View>
      )}

      <ScrollView style={styles.scrollView} propagateSwipe={true}>
        {FilteredPincode.map((pincode, index) => (
          <TouchableOpacity
            onPress={() => HandlePinCode(pincode?.PinCode__r?.PIN__c)}
            key={index}
          >
            <Text style={styles.additionalText}>
              {pincode?.PinCode__r?.PIN__c} {pincode?.PinCode__r?.State__c}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.button}>
        <Button
          disable={pinCode?.length != 6 || !isValid}
          label="Ok"
          type="primary"
          onPress={handleOkPress}
        />
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
    marginBottom: 80,
  },
  modal: {
    width: "95%",
    height: "55%",
    alignSelf: "center",
  },
  modalHeader: {
    justifyContent: "space-between",
    paddingBottom: verticalScale(15),
    flexDirection: "row",
    alignItems: "center",
  },
  modalHeaderTxt: {
    fontSize: verticalScale(19),
    color: "#44465B",
  },
  textInputContainer: {
    height: 50,
    width: "105%",
    borderRadius: 33,
    backgroundColor: "white",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 12,
  },
  pinValue: {
    fontSize: 16,
    color: "black",
    marginHorizontal: 10,
  },

  additionalText: {
    fontSize: verticalScale(12),
    marginVertical: 14,
    marginHorizontal: 15,
  },
  button: {
    maxHeight: 65,
    marginBottom: 25,
    borderRadius: 33,
    width: "50%",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
});

export default PincodeModal;
