import * as React from 'react';
import { TouchableRipple, useTheme } from 'react-native-paper';
import { colors } from '../colors';
import { StyleSheet, Text, View } from 'react-native';
import customTheme from '../colors/theme';

export default function Button(props) {
    const { type, label, left, right, buttonContainer, labelStyle, icon, onPress, rippleColor,isDisabled } = props;
    const theme = useTheme();
    return type === "primary" ? (
        <TouchableRipple
            rippleColor={rippleColor || "rgba(255, 255, 255, .32)"}
            style={[styles.buttonContainer, buttonContainer, isDisabled ? {backgroundColor: '#D3D3D3', borderWidth: 0}: {}]}
            onPress={onPress} 
            disabled={isDisabled}
            >
            <View style={styles.rowContainer}>
                {left}
                <Text style={[theme.fonts.buttonText, labelStyle, isDisabled ? {color: colors.black}: {}]} numberOfLines={1}>{label}</Text>
                {right}
            </View>
        </TouchableRipple>
    ) : type === "secondery" ? (
        <TouchableRipple
            style={[styles.seconderyButtonContainer, buttonContainer]}
            rippleColor={rippleColor || "rgba(0, 0, 0, .32)"}
            onPress={onPress} >
            <View style={styles.rowContainer}>
                {left}
                <Text style={[theme.fonts.seconderyButtonText, labelStyle]} numberOfLines={1}>{label}</Text>
                {right}
            </View>
        </TouchableRipple>
    ) : type === "circle" ? (
        <TouchableRipple style={[styles.circleButtonContainer, buttonContainer]}>
            {icon}
        </TouchableRipple>
    ) : null
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        backgroundColor: customTheme.colors.primary,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: customTheme.colors.primary,
        borderRadius: 50,
    },
    seconderyButtonContainer: {
        backgroundColor: colors.white,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        borderWidth: 1,
        borderColor: customTheme.colors.primary,
        borderRadius: 50,
    },
    circleButtonContainer: {
        backgroundColor: customTheme.colors.primary,
        alignSelf: "flex-start",
        width: 40,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        borderRadius: 50,
    }
})