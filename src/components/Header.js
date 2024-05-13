import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../colors'
import { useTheme } from 'react-native-paper'


const Header = (props) => {
    const { fonts } = useTheme();
    return (
        <View style={styles.container}>
            {props.left && <TouchableOpacity onPress={() => props.onPressLeft()}>
                <Image source={props.left} style={styles.backImage} />
            </TouchableOpacity>}
            <Text style={[fonts.headerText, styles.titleText]}>{props.title}</Text>
            {props.right && <TouchableOpacity onPress={() => props.onPressRight()}>
                <Image source={props.right} style={styles.questionImage} />
            </TouchableOpacity>}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    backImage: {
        width: 20,
        height: 18,
        marginRight: 20,
        tintColor: colors.black,
    },
    questionImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    titleText: {
        marginTop: 2,
        flexGrow: 1,
    }
})