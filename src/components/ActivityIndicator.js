import React from "react";
import { Modal, StyleSheet, View, ActivityIndicator } from "react-native";

import { colors } from "../colors";

const ActivityIndicatorComponent = (props) => {
  const onPressed = () => {
    props.closed();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={props?.visible}
      onRequestClose={() => {
        props?.closed?.();
      }}
    >
      <View style={styles.centeredView}>
        <ActivityIndicator size={"large"} color={colors.white} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.MODAL_BG_COLOR,
  },
});

export default ActivityIndicatorComponent;
