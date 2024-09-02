import React from 'react';
import { View, Image, Text } from 'react-native';
import { styles } from './style/style';
import CustomButton from '../../components/Button';
import { screens } from '../../constants/screens';

const CongratulationScreen = (props) => {
    return (
        <View style={styles.container}>
            {/* <Image
                source={require('../../assets/congratulations.png')}
                style={styles.image}
                resizeMode="contain"
            /> */}
            <Text style={styles.Nointernet}>
                Congratulations !
            </Text>
            <Text style={styles.connection}>
                Your loan application has been successfully submitted, RM will connect with you shortly.
            </Text>
            <View style={{ marginVertical: 16, width: "60%" }}>
                <CustomButton
                    type="primary"
                    label="Continue"
                    buttonContainer={styles.buttonContainer}
                    // buttonContainer={{}}
                    onPress={() => {
                        props?.navigation?.reset?.({
                            index: 0,
                            routes: [{
                                name:screens.HomeScreen
                            }],
                        });
                    }} />
            </View>

        </View>
    )
}

export default CongratulationScreen;
