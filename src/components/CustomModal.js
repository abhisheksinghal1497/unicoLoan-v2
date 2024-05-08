import React, { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";

const CustomModal = ({type="center",showModal = true, setShowModal = () => {}, children}) => {

  
  return (
    <View style={[styles.centeredView, {justifyContent:type==="center" ? "center" : "flex-end"}]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!modalVisible);
        }}
      >
        <View style={[styles.centeredView, {justifyContent:type==="center" ? "center" : "flex-end"}]}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </Modal>
     </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
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
  },
});
