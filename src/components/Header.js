import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../colors'
import { useTheme } from 'react-native-paper'


const Header = (props) => {
    const { fonts } = useTheme();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image source={require('../images/back.png')} style={styles.backImage} />
            </TouchableOpacity>
            <Text style={[fonts.bodyBold, styles.titleText]}>{props.title}</Text>
            <Image source={require('../images/question.png')} style={styles.questionImage} />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    backImage: {
        width: 20,
        height: 18,
        marginRight: 10,
        tintColor: colors.black,
    },
    questionImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    titleText: {
        marginTop: 2,
        flexGrow: 1,
    }
})