import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/Header'
import AdhaarSection from '../../components/AdhaarSection'
import CameraSection from '../../components/CameraSection'
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from "react-native-paper";

const CaptureAdhaar = ({ navigation }) => {

    const buttonLabels = [{ id: 0, name: "Retry" }, { id: 1, name: "Use this Photo", }]

    const route = useRoute();
    const { method } = route.params || {};
    console.log(method)
    const [selectedImage, setSelectedImage] = useState(null);
    const [width, setWidth] = useState(350);
    const [height, setHeight] = useState(500);
    const onCameraPress = () => {
        ImagePicker.openCamera({
            width,
            height,
            cropping: true,
        })
            .then((image) => {
                setSelectedImage(image.path);
                setHeight(height);
                setWidth(width);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const ButtonActions = async (value) => {
        if(value === "Retry"){
            setSelectedImage(null)
        }
    }

    return (
        <>
            <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
            />
            <SafeAreaView style={{ flex: 1, padding: 15, paddingTop: 50 }}>
                <Header title={selectedImage ? 'Review Your Document' : 'Capture Adhaar'} navigation={navigation} />
                <AdhaarSection uri={selectedImage}AdhaarText={method === 'Front' ? 'Front Side' :  'Back Side' } />
                {selectedImage ? (
                    <>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 100, }}>
                            {buttonLabels.map(function (value) {
                                return (
                                    <View style={{
                                        width: "48%",
                                    }}>
                                        <Button
                                            style={{ height: 60, borderRadius: 30, justifyContent: 'center' }}
                                            mode="contained"
                                            textColor="white"
                                            onPress={() => { ButtonActions(value.name) }}
                                        >
                                            <Text style={{ color: "white", fontSize: 16, fontFamily: '500' }}>{value.name}</Text>

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

export default CaptureAdhaar

const styles = StyleSheet.create({})


