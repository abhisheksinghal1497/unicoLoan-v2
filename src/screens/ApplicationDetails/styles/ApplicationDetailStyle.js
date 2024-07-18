import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../../../utils/matrcis";

export const styles = (themeColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: horizontalScale(10),
    },
    scrollviewStyle: {
      flexGrow: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      padding: 15,
    },
    tickImage: {
      width: 20,
      height: 20,
      resizeMode: "contain",
      // marginTop: 10,
    },
    buttonContainer: {
      marginTop: 20,
    },
    modalstyle:{
      borderRadius: 10,
      flex:1
      // marginBottomBottom: verticalScale(30)
    }
  });
