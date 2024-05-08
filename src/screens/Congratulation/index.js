import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './style/style';

const CongratulationScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/images/Congratulations.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.Nointernet}>
               Congratulations !
            </Text>
            <Text style={styles.connection}>
               Your loan application has been successfully submitted, RM will connect with you shortly.
            </Text>
        </View>
    )
}

export default CongratulationScreen;
