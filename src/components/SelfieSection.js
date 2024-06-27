import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { horizontalScale } from "../utils/matrcis";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { ActivityIndicator } from "react-native-paper";

export default function AdhaarSection({
  AdhaarText,
  uri,
  cameraRef,
  frontDevice,
}) {
  return (
    <View style={styles.container}>
      {uri ? (
        <>
          <View style={styles.emptySection}>
            <Image source={{ uri }} style={styles.imageContainer} />
          </View>
        </>
      ) : (
        <View style={styles.emptySection}>
          {!!frontDevice ? (
            <Camera
              ref={cameraRef}
              style={{ flex: 1 }}
              device={frontDevice}
              isActive={true}
              photo={true}
            />
          ) : (
            <ActivityIndicator size={20} color={"red"} />
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    height: "40%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    height: "80%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "grey",
  },
  imageContainer: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "#C8D0EF",
  },
  emptySection: {
    // height: 300,
    // borderRadius: 150,
    borderWidth: 2,
    borderColor: "#C8D0EF",
    // width: 300,
    // justifyContent: "center",
    // alignItems: "center",
    // overflow: "hidden",
    width: horizontalScale(300),
    height: horizontalScale(300),
    borderRadius: horizontalScale(300) / 2, // Half of width and height to make a perfect circle
    overflow: "hidden",
    marginBottom: 20,
  },
  textSection: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "300",
    color: "#7C7E8B",
  },
});
