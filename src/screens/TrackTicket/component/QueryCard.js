import React from "react";
import { StyleSheet, View } from "react-native";
import dimensionUtil from "../../../utils/DimensionUtils";
import Image from "react-native-fast-image";
import { assets } from "../../../assets/assets";
import { Text } from "react-native-paper";

const QueryCard = () => {
  //
  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentContainer}>
        <Image
          resizeMode="contain"
          source={assets.homeIconPerson}
          style={styles.imageStyle}
        />
        <View style={styles.titleContainer}>
          <View
            style={styles.queryContainer}
          >
            <Text style={styles.queryTitle}>Query</Text>
            <Text
              style={styles.ticketIdText}
            >
              Ticket no. #214
            </Text>
          </View>

          <Text style={styles.queryDescription}>
            Subject to be placed on the case.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: dimensionUtil.pixelSizeHorizontal(9),
    flex: 1,
  },
  queryDescription: {
    color: "#7C7B7B",
  },
  queryTitle: {
    color: "#2E52A1",
    fontSize: dimensionUtil.fontPixel(20),
    fontWeight: "500",
    marginBottom: dimensionUtil.pixelSizeVertical(12),
  },
  contentContainer: { flexDirection: "row" },
  imageStyle: {
    width: dimensionUtil.pixelSizeHorizontal(80),
    height: dimensionUtil.pixelSizeHorizontal(80),
  },
  containerStyle: {
    backgroundColor: "#FEF9EB",
    paddingVertical: dimensionUtil.pixelSizeVertical(18),
    paddingLeft: dimensionUtil.pixelSizeHorizontal(10),
    marginTop: dimensionUtil.pixelSizeVertical(16),
  },
  queryContainer: { flexDirection: "row", justifyContent: "space-between" },
  ticketIdText:{
    marginRight: dimensionUtil.pixelSizeHorizontal(18),
    color: "#7C7B7B",
    fontSize: dimensionUtil.fontPixel(15),
  }
});

export default QueryCard;
