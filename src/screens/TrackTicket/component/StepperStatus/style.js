import { StyleSheet, I18nManager, Platform } from "react-native";
import DimensionUtils from "../../../../utils/DimensionUtils";

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    // marginVertical: 5
  },
  timeContainer: {
    flexBasis: "25%"
  },
  time: {
    fontSize: 12,
    color: "#aaa",
    fontStyle: "italic",
    textAlign: 'center'
  },
  iconContainer: {
    flexBasis: "6%",
    alignItems: "center",
    alignSelf: "stretch",
    marginHorizontal: "5%"
  },
  verticalLine: {
    flex: 1,
    width: 1,
    backgroundColor: "#1EC239"
  },
  eventContainer: {
    flexBasis: "80%",
    alignItems: "flex-start",
    backgroundColor: "#FFF",
    // padding: 16,
    borderRadius: 15,
    shadowOffset: { width: I18nManager.isRTL ? 8 : -8, height: 0 },
    shadowColor: "#ccc",
    shadowOpacity: 0.2,
    marginBottom: 10,
    borderTopLeftRadius: 0,
  },
  icon: {
    textAlign: "center",
    width: 20,
    height: 20,
    backgroundColor: "#1EC239",
    paddingTop: Platform.OS === "ios" ? 2.5 : 5,
    borderRadius: 10,
    color: '#e0e9ff',
    fontSize: 9,
    overflow: "hidden",
    alignItems:'center',
    justifyContent:'center'
    // borderWidth: 3,
    // borderColor: '#e0e9ff'
  },
  title: {
    fontSize: DimensionUtils.fontPixel(14.5),
    color: "#888888",
    textAlign: "left",
    marginBottom:  DimensionUtils.fontPixel(5),
    // lineHeight: 20
  },
  description: {
    textAlign: "left",
    fontSize: DimensionUtils.fontPixel(10),
    lineHeight: 18,
    paddingBottom: 10,
    color: '#888888'
  }
});

export default style