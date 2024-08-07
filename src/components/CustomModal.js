import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { horizontalScale } from "../utils/matrcis";

const CustomModal = ({
  type = "center",
  showModal = true,
  setShowModal = () => {},
  children,
  modalStyle,
  centeredViewStyle = {},
  withFeedback = true,
}) => {
  const Content = () => {
    return (
      <View
        style={[
          styles.centeredView,
          { justifyContent: type === "center" ? "center" : "flex-end" },
          centeredViewStyle,
        ]}
      >
        <View style={[styles.modalView, modalStyle]}>{children}</View>
      </View>
    );
  };

  return (
    // <View style={[styles.centeredView, {justifyContent:type==="center" ? "center" : "flex-end"}]}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(!showModal);
      }}
    >
      {withFeedback ? (
        <TouchableWithoutFeedback
          style={{ zIndex: 0 }}
          onPress={() => setShowModal(!showModal)}
        >
          <Content />
        </TouchableWithoutFeedback>
      ) : (
        <Content />
      )}
    </Modal>
    //  </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    // alignSelf:'center'
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "70%",
    marginHorizontal: horizontalScale(15),
  },
});
