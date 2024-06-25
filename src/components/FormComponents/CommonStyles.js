import { StyleSheet } from "react-native";
import { colors } from "../../colors";

export const commonStyles = StyleSheet.create({
    labelStyle: {
        color: colors.LABEL_COLOR,
        textAlign: 'center',
        fontFamily: 'Nunito',
        fontSize: 14,
        fontWeight: '400'
    },
    valueStyle:{
        fontFamily: "Nunito",
        fontSize: 14,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 14,
        
        color: colors.black
    },
    shadowView: {
        // backgroundColor: colors.white,
        // shadowColor: colors.black,
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 3,

        // borderRadius: 40,
        // borderTopWidth:0.15,
        // borderLeftWidth:0.15,
        // borderRightWidth:0.15,

        borderRadius: 28,
        backgroundColor: colors.white,
        shadowColor: colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 6,
        shadowRadius: 4,
        shadowOpacity: 1,
        borderStyle: 'solid',
        borderWidth: 0.5,
        borderColor: colors.borderColor,
        minHeight: 50,



    },
})