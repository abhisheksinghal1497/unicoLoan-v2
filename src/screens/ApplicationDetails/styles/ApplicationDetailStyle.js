import { StyleSheet } from "react-native";
import { horizontalScale } from "../../../utils/matrcis";

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
  });
