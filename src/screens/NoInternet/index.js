import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './style/style';

const NoInternet = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/no_internet.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.Nointernet}>
                No Internet !
            </Text>
            <Text style={styles.connection}>
                Check Your connection and try again
            </Text>
        </View>
    )
}

export default NoInternet;
