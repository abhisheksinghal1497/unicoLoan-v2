import {
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  Alert,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import SelfieSection from "../../components/SelfieSection";
import CameraSection from "../../components/CameraSection";
import ImagePicker from "react-native-image-crop-picker";
import { styles } from "./style/style";
import { ActivityIndicator, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screens } from "../../constants/screens";
import CustomButton from "../../components/Button";
import { Camera, useCameraDevices, } from "react-native-vision-camera";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";

const CaptureSelfie = ({ navigation }) => {
    const [isFrontCamera, setFrontCamera] = useState('front')
  const devices = useCameraDevices();
  const frontDevice = devices[isFrontCamera];
  
  const cameraRef = useRef(null);
  const { fonts } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const cameraCross = () => {
    setSelectedImage(null);
  };

  const onCameraReload = () => {
    setFrontCamera(isFrontCamera === 'front' ? 'back' : 'front');
    // navigation?.navigate(screens.KYCDocuments)
  };

  const onSubmit = () => {
    navigation?.navigate(screens.KYCDocuments);
  };

  useEffect(() => {
    const onDeniedPermissionCamera = () => {
      Alert.alert("Please give camera permission from setting");
      Linking.openSettings();
    };

    (async () => {
      if (Platform.OS !== "android") {
        return;
      }
      const granted = await check(PERMISSIONS.ANDROID.CAMERA);
      if (granted === RESULTS.GRANTED) {
        return;
      } else if (granted === RESULTS.DENIED) {
        const result = await request([PERMISSIONS.ANDROID.CAMERA]);
        if (result !== RESULTS.GRANTED) {
          onDeniedPermissionCamera();
        }
      } else {
        onDeniedPermissionCamera();
      }
    })();
    (async () => {
      if (Platform.OS !== "ios") {
        return;
      }
      const granted = await check(PERMISSIONS.IOS.CAMERA);
      if (granted === RESULTS.DENIED) {
        const result = await request([PERMISSIONS.IOS.CAMERA]);
        if (result !== RESULTS.GRANTED) {
          onDeniedPermissionCamera();
        }
      } else {
        onDeniedPermissionCamera();
      }
    })();
  }, []);

  const takePicture = async () => {
    try {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePhoto();
            console.log("Photo taken:", photo);
            setSelectedImage('file://'+photo.path);
          }
    } catch (error) {
        console.log('Phot taken',error)
    }
    
  };

  console.log({selectedImage})

  return (
    <>
      <SafeAreaView style={StyleSheet.absoluteFill}>
        <Header
          title={"Selfie Capture"}
          left={require("../../images/back.png")}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {}}
          colour="white"
        />
        <SelfieSection cameraRef={cameraRef} frontDevice={frontDevice} uri={selectedImage} />
        {/* {!!frontDevice ? (
          <View style={style.cameraContainer}>
            <Camera
              ref={cameraRef}
              style={style.cameraPreview}
              device={frontDevice }
              isActive={true}
              photo={true}
            />
          </View>
        ) : (
          <ActivityIndicator size={20} color={"red"} />
        )} */}
        <CameraSection
          onCameraPress={takePicture}
          onCameraCross={cameraCross}
          onCameraReload={onCameraReload}
          reload={true}
          cross={true}
        />
        <View style={styles.noteContainer}>
          <Image
            source={require("../../images/bulb.png")}
            style={styles.bulbImage}
          />
          <Text style={fonts.bodySmall}>
            Place <Text style={fonts.bodyBold}>your</Text>Face within Circle
          </Text>
        </View>

        <CustomButton
          type="primary"
          label="Continue"
          buttonContainer={styles.buttonContainer}
          onPress={() => {
            onSubmit();
          }}
          disable={Boolean(selectedImage) ? false : true}
        />
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  cameraContainer: {
    width: 250,
    height: 250,
    borderRadius: 125, // Half of width and height to make a perfect circle
    overflow: "hidden",
    marginBottom: 20,
  },
  cameraPreview: {
    flex: 1,
  },
});

export default CaptureSelfie;
