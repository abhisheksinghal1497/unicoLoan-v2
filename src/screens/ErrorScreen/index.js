import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './style/style';

const ErrorScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/TechnicalError.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.Nointernet}>
               Technical Error Screen !
            </Text>
            <Text style={styles.connection}>
               We are Facing some technical Issues, please try after sometime
            </Text>
        </View>
    )
}

export default ErrorScreen;
