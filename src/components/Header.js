import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../colors'
import { useTheme } from 'react-native-paper'
import { verticalScale } from '../utils/matrcis'
import { debounce } from '../utils/functions'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Header = (props) => {
    const { rightImages = [], onPressRight, onPressLeft = () => { } } = props;
    const { fonts } = useTheme();
    const insets = useSafeAreaInsets();
    const handlePressRight = (index) => {
        debounce(() => {
            if (onPressRight) {
                onPressRight(index);
            }
        })();
    };

    return (
        <View style={[styles.container, {
            backgroundColor: props?.colour ? props?.colour : 'transparent', paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }]}>
            <View style={{ flex: 1 }}>
                {props.left && (
                    <TouchableOpacity onPress={() => debounce(onPressLeft())}>

                        <Image source={require("../../assets/images/Back.png")} style={[styles.backImage]} />
                    </TouchableOpacity>
                )}
            </View>
            <Text style={[fonts.headerText, styles.titleText, props.titleStyle]}>{props.title}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                {rightImages.map((imageProps, index) => (
                    <TouchableOpacity key={index} onPress={() => handlePressRight(index)}>
                        <Image source={imageProps.source} style={[styles.rightImage, props.rightStyle]} {...imageProps.imageProps} />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        justifyContent: 'space-around',
        width: '100%'
    },
    backImage: {
        width: 25,
        height: 25,
        marginStart:8,
        tintColor: colors.black,
    },
    rightImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 10,
    },
    titleText: {

        fontWeight: 'bold'
    }
})