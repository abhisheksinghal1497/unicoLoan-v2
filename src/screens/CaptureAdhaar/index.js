import { Text, View, SafeAreaView } from 'react-native'
import React, { useState,useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import Header from '../../components/Header'
import AdhaarSection from '../../components/AdhaarSection'
import CameraSection from '../../components/CameraSection'
import ImagePicker from 'react-native-image-crop-picker';
import { Button } from "react-native-paper";
import { styles } from './style/style';
import { AadharBasicDetails } from "../../constants/stringConstants";
// import { useQuery,useMutation } from '@tanstack/react-query';
import {  toast } from "../../utils/functions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screens } from "../../constants/screens";
import { uploadAdhaarMethod } from "../../services/ApiUtils";
const CaptureAdhaar = ({ navigation }) => {

    const uploadAdhaarMethodFn=uploadAdhaarMethod();

    useEffect(() => {
      if (uploadAdhaarMethodFn?.data) {
        
        console.log('Success came here')
        try {
            navigation?.goBack()
        } catch (error) {
            
        }
      }
    }, [uploadAdhaarMethodFn?.data]);
  
    useEffect(() => {
      if (uploadAdhaarMethodFn?.error) {
        
        console.log('Error came here')
      }
    }, [uploadAdhaarMethodFn?.error]);


    const { firstButtonName, lastButtonName, headerText, headerTextSecond, imageMethod, imageSide, imageSideSecond } = AadharBasicDetails

    const buttonLabels = [{ id: 0, name: firstButtonName, }, { id: 1, name: lastButtonName, }]

    const route = useRoute();
    const { method } = route.params || {};
    console.log(method)
    const [selectedImage, setSelectedImage] = useState(null);
    const onCameraPress = async() => {
        ImagePicker.openPicker({
            cropping: true,
            compressImageQuality: 0.4,
            includeBase64: true,
        })
            .then(async(image) => {
                console.log(image,'image value')
                setSelectedImage(image);
                console.log(method,'method')        
                if(method === 'Front'){
                    await AsyncStorage.setItem('FrontAdhaar', JSON.stringify(image));
                }
                else{
                    await AsyncStorage.setItem('BackAdhaar', JSON.stringify(image));
                }  
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const ButtonActions = async (value) => {
        if (value === firstButtonName) {
            onCameraPress()
        }
        else {
            const data= [{
                id:0,
                font:selectedImage,
                back:selectedImage
            }]
            if(method === 'Front'){
                toast('success', "Aadhar Front Successfully Uploaded");
            }
            else{
                toast('success', "Aadhar Back Successfully Uploaded");
            }  
            uploadAdhaarMethodFn.mutate(data);
            // navigation?.navigate(screens.KYC)
        }
    }





    return (
        <>
            <SafeAreaView style={styles.container}>
                <Header
                    title={selectedImage ? headerText : headerTextSecond}
                    left={require('../../assets/back2.png')}
                    onPressLeft={() => { navigation.goBack() }}
                    onPressRight={() => { }}
                    colour="white" />
                <AdhaarSection image={selectedImage} AdhaarText={method === imageMethod ? imageSide : imageSideSecond} />
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






