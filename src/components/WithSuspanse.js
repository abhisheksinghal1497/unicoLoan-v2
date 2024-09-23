import React, { Suspense } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { colors } from "../colors";

export const withSuspend = (Component) => {
  return (props) => (
    <Suspense
      fallback={
        <View style={styles.centeredView}>
          <ActivityIndicator size={"large"} color={colors.white} />
        </View>
      }
    >
      <Component {...props} />
    </Suspense>
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
