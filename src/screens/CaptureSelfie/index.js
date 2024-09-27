import {
  Text,
  View,
  SafeAreaView,
  Image,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import SelfieSection from "../../components/SelfieSection";
import CameraSection from "../../components/CameraSection";
import ImagePicker from "react-native-image-crop-picker";
import { styles } from "./style/style";
import { useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screens } from "../../constants/screens";
import CustomButton from "../../components/Button";
import { useRoute } from "@react-navigation/native";
import { useSaveSelfie } from "../../services/ApiUtils";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import Toast from "react-native-toast-message";
import {
  updateAadharDataToApplicant,
  useResetRoutes,
} from "../../utils/functions";
import Geolocation from "react-native-geolocation-service";

const CaptureSelfie = ({ navigation }) => {
  const { fonts } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const route = useRoute();
  const resetRoute = useResetRoutes();
  const { loanData = {} } = route?.params || {};
  console.log("loanData", loanData?.adhaarDetails);
  const selfieMutate = useSaveSelfie(loanData);
  const [location, setLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      console.log("granted", granted);
      if (granted === "granted") {
        console.log("You can use Geolocation");
        return true;
      } else {
        console.log("You cannot use Geolocation");
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const onCameraPress = ({ front = false }) => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.6,
      useFrontCamera: front,
      includeBase64: true,
      multiple: false,
      mediaType: "photo",
    })
      .then((image) => {
        setSelectedImage(image);
        AsyncStorage.setItem("selfieCapture", JSON.stringify(image));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cameraCross = () => {
    setSelectedImage(null);
  };

  const onCameraReload = () => {
    onCameraPress(true);
  };

  const getLocation = async () => {
    const result = await requestLocationPermission();
    if (result) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation(position);
        },
        (error) => {
          // See error code charts below.
          console.log("LOCATION ISSUE", error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const onSubmit = async () => {
    if (!selectedImage) {
      Toast.show({ type: "error", text1: "Please upload image" });
      return;
    }
    selfieMutate.mutate({
      selfie: selectedImage,
      lat: location ? location?.coords?.latitude : null,
      long: location ? location?.coords?.longitude : null,
    });
  };

  useEffect(() => {
    if (selfieMutate?.data) {
      navigation?.navigate(screens.KYCDocuments, {
        loanData: selfieMutate.data,
      });
    }
  }, [selfieMutate?.data]);

  useEffect(() => {
    if (selfieMutate?.error) {
      console.log(selfieMutate?.error);
      // navigation?.navigate(screens.KYCDocuments, {
      //   loanData: selfieMutate.data,
      // });
    }
  }, [selfieMutate?.error]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          title={"Selfie Capture"}
          left={require("../../images/back.png")}
          onPressLeft={() => {
            resetRoute(screens.HomeScreen);
          }}
          onPressRight={() => {}}
          colour="white"
        />
        <ActivityIndicatorComponent visible={selfieMutate?.isPending} />
        <SelfieSection uri={selectedImage?.path} />
        <CameraSection
          onCameraPress={onCameraPress}
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

export default CaptureSelfie;
