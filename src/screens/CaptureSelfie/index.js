import {
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
  Alert,
  Platform,
  NativeModules,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import SelfieSection from "../../components/SelfieSection";
import CameraSection from "../../components/CameraSection";
import { styles } from "./style/style";
import { useTheme } from "react-native-paper";
import { screens } from "../../constants/screens";
import CustomButton from "../../components/Button";
import { useCameraDevices } from "react-native-vision-camera";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import FaceDetection, {
  FaceDetectorContourMode,
  FaceDetectorLandmarkMode,
  FaceContourType,
  FaceLandmarkType,
  FaceDetectorPerformanceMode,
  FaceDetectorClassificationMode,
} from "react-native-face-detection";

const CaptureSelfie = ({ navigation }) => {
  const [isFrontCamera, setFrontCamera] = useState("front");
  const devices = useCameraDevices();
  const frontDevice = devices[isFrontCamera];
  const cameraRef = useRef(null);
  // loading, error, success, initial
  const [status, setStatus] = useState("initial");
  const { fonts } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);

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

  const cameraCross = () => {
    setStatus("initial");
    setSelectedImage(null);
  };

  const onCameraReload = () => {
    setFrontCamera(isFrontCamera === "front" ? "back" : "front");
    // navigation?.navigate(screens.KYCDocuments)
  };

  const onSubmit = () => {
    navigation?.navigate(screens.KYCDocuments);
  };

  const checkIfFaceInCenter = (rightEyeProbability, leftEyeProbability) => {
    if (rightEyeProbability > 0.7 && leftEyeProbability > 0.7) {
      return true;
    } else {
      return false;
    }
  };

  const processFaces = async (imagePath) => {
    try {
      const options = {
        landmarkMode: FaceDetectorLandmarkMode.ALL,
        contourMode: FaceDetectorContourMode.ALL,
        // performanceMode: FaceDetectorPerformanceMode.FAST,
        // classificationMode: FaceDetectorClassificationMode.ALL,
      };
      const faces = await FaceDetection.processImage(imagePath, options);
      if (!faces.length) {
        Alert.alert("Can't see any face in the image");
        return false;
      }
      if (faces.length > 1) {
        Alert.alert(faces.length + " faces detected in the image.");
        return false;
      }
      return true;
    } catch (error) {
      console.log("Some error while recognizing face", error);
      return false;
    }
  };

  const takePicture = async () => {
    try {
      setStatus("loading");
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto();
        const imagePath = "file://" + photo.path;
        setSelectedImage(imagePath);
        const result = await processFaces(imagePath);
        setStatus(result ? "success" : "error");
      } else {
        setStatus("initial");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title={"Selfie Capture"}
          left={require("../../images/back.png")}
          onPressLeft={() => {
            navigation.goBack();
          }}
          onPressRight={() => {}}
          colour="white"
        />
        <SelfieSection
          cameraRef={cameraRef}
          frontDevice={frontDevice}
          uri={selectedImage}
        />
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
          isLoading={status === "loading"}
          disable={status !== "success"}
        />
      </SafeAreaView>
    </>
  );
};

export default CaptureSelfie;
