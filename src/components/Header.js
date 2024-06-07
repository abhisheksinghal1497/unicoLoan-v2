import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../colors'
import { useTheme } from 'react-native-paper'
import { verticalScale } from '../utils/matrcis'
import { debounce } from '../utils/functions'

const Header = (props) => {
    const { rightImages = [], onPressRight, onPressLeft = () => { } } = props;
    const { fonts } = useTheme();
    
    const handlePressRight = (index) => {
        debounce(() => {
            if (onPressRight) {
                onPressRight(index);
            }
        })();
    };

    return (
        <View style={[styles.container, props.containerStyle, { backgroundColor: props?.colour ? props?.colour : colors.bgColor, }]}>
            {props.left && (
                <TouchableOpacity onPress={() => debounce(onPressLeft())}>
                    <Image source={props.left} style={[styles.backImage, props.leftStyle]} {...props.leftImageProps} />
                </TouchableOpacity>
            )}
            <Text style={[fonts.headerText, styles.titleText, props.titleStyle]}>{props.title}</Text>
            {rightImages.map((imageProps, index) => (
                <TouchableOpacity key={index} onPress={() => handlePressRight(index)}>
                    <Image source={imageProps.source} style={[styles.rightImage, props.rightStyle]} {...imageProps.imageProps} />
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: verticalScale(10),
    },
    backImage: {
        width: 20,
        height: 18,
        marginRight: 20,
        tintColor: colors.black,
    },
    rightImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 10,
    },
    titleText: {
        marginTop: 2,
        flexGrow: 1,
        fontWeight: 'bold'
    }
})