import { Text, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';
import Header from '../../components/Header'
import AdhaarSection from '../../components/AdhaarSection'
import CameraSection from '../../components/CameraSection'
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from "react-native-paper";
import { styles } from './style/style';
import { AadharBasicDetails } from "../../constants/stringConstants";
// import { useQuery,useMutation } from '@tanstack/react-query';

const CaptureAdhaar = ({ navigation }) => {

    const { firstButtonName, lastButtonName, headerText, headerTextSecond, imageMethod, imageSide, imageSideSecond } = AadharBasicDetails

    const buttonLabels = [{ id: 0, name: firstButtonName, }, { id: 1, name: lastButtonName, }]

    const route = useRoute();
    const { method } = route.params || {};
    console.log(method)
    const [selectedImage, setSelectedImage] = useState(null);
    // const [width, setWidth] = useState(100);
    // const [height, setHeight] = useState(300);
    const onCameraPress = () => {
        ImagePicker.openCamera({
            // width,
            // height,
            cropping: true,
            compressImageQuality: 0.6
        })
            .then((image) => {
                setSelectedImage(image.path);
                // useQuery({queryKey:["ImageData"],queryFn: () => [{
                //     "id": 10,
                //     "Image":image.path,
                //      }
                // ]})

                // setHeight(height);
                // setWidth(width);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const ButtonActions = async (value) => {
        if (value === firstButtonName) {
            // setSelectedImage(null)
            onCameraPress()
        }
        else {
            navigation.goBack()
        }
    }





    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header
                    title={selectedImage ? headerText : headerTextSecond}
                    left={require('../../images/back.png')}
                    onPressLeft={() => { navigation.goBack() }}
                    onPressRight={() => { }}
                    colour="white" />
                <AdhaarSection uri={selectedImage} AdhaarText={method === imageMethod ? imageSide : imageSideSecond} />
                {selectedImage ? (
                    <>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 100, }}>
                            {buttonLabels.map(function (value) {
                                return (
                                    <View style={styles.buttonStyle}>
                                        <Button
                                            style={value.name === firstButtonName ? styles.buttonInner : styles.buttonInnerSecond}
                                            mode="contained"
                                            textColor="white"
                                            onPress={() => { ButtonActions(value.name) }}
                                        >
                                            <Text style={value.name === firstButtonName ? styles.buttonTextSecond : styles.buttonText}>{value.name}</Text>
                                        </Button>
                                    </View>
                                );
                            })}
                        </View>
                    </>
                ) :
                    <>
                        <CameraSection onCameraPress={onCameraPress} />
                    </>
                }
            </SafeAreaView>
        </>
    )
}

export default CaptureAdhaar;






