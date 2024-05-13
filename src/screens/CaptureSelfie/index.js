import { Text, View, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import SelfieSection from '../../components/SelfieSection'
import CameraSection from '../../components/CameraSection'
import ImagePicker from 'react-native-image-crop-picker';
import { styles } from './style/style';
import { useTheme } from 'react-native-paper'

const CaptureSelfie = ({ navigation }) => {
    const { fonts } = useTheme();
    const [selectedImage, setSelectedImage] = useState(null);
    const onCameraPress = () => {
        ImagePicker.openCamera({
            cropping: true,
            compressImageQuality: 0.6
        })
            .then((image) => {
                setSelectedImage(image.path);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const cameraCross = () => {
        setSelectedImage(null)
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header
                    title={'Selfie Capture'}
                    left={require('../../images/back.png')}
                    onPressLeft={() => { navigation.goBack() }}
                    onPressRight={() => { }}
                    colour="white" />
                <SelfieSection uri={selectedImage} />
                <CameraSection onCameraPress={onCameraPress} onCameraCross={cameraCross} onCameraReload={cameraCross} reload={true} cross={true} />
                <View style={styles.noteContainer}>
                    <Image source={require('../../images/bulb.png')} style={styles.bulbImage} />
                    <Text style={fonts.bodySmall}>Place <Text style={fonts.bodyBold}>your</Text>Face within Circle</Text>
                </View>
            </SafeAreaView>
        </>
    )
}

export default CaptureSelfie;






