import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import CustomModal from "./CustomModal";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { verticalScale } from "../utils/matrcis";
import { getPinCodes } from "../services/ApiUtils";

import { useTheme } from "react-native-paper";
import { screens } from "../constants/screens";
import { useResetRoutes } from "../utils/functions";
import { useNavigation } from "@react-navigation/native";
import { ConfiguratonConstants } from "../constants/ConfigurationConstants";
import SearchBarText from "./SearchBarText";

const PincodeModal = ({ modalVisible = false, setModalVisible = () => { } }) => {
  const [pinCode, setPinCode] = useState("");
  const { data, mutate: getPincodeMutate } = getPinCodes();
  const { colors } = useTheme();
  const resetRoute = useResetRoutes()
  const navigation = useNavigation()
  const [pincodeDataRes, setPinCodeRes] = useState(false)

  const HandlePinCode = (value) => {
   
    setPinCode(value);
  };

  const HandlePinSearch = async (value) => {
    setPinCode(value);
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  useEffect(() => {

    if (data) {
      setPinCodeRes(data)
    }
  }, [data])

  useEffect(() => {
    if (pincodeDataRes?.length > 0) {

    } else {
      getPincodeMutate()
    }

  }, [pincodeDataRes])

  const continueClicked = (pincode, pincodeData) =>{
      setModalVisible(false);
    setTimeout(() => {
      navigation?.navigate?.(screens.ApplicantDetails, { pincode: pincode, pincodeData: pincodeData });
    }, ConfiguratonConstants.setTimeoutTime);
  
  }

  


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
     




      {/* <ScrollView style={styles.scrollView} propagateSwipe={true}>
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
      </ScrollView> */}
      <SearchBarText pincodeDataRes={pincodeDataRes} continueClicked={continueClicked} />
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
    height: "65%",
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
