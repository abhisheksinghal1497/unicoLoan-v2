import { Text, View, SafeAreaView, Image } from "react-native";
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

const CaptureSelfie = ({ navigation }) => {
  const { fonts } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  console.log('loanData', loanData?.adhaarDetails)
  const selfieMutate = useSaveSelfie(loanData);

  const onCameraPress = ({ front = false }) => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.6,
      useFrontCamera: front,
      includeBase64:true,
      multiple:false,
      mediaType:'photo'
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

  const onSubmit = () => {
    if(!selectedImage){
      Toast.show({type:'error', text1:'Please upload image'})
      return
    }
    selfieMutate.mutate(selectedImage);
  };

  useEffect(() => {
    if (selfieMutate?.data) {
      navigation?.navigate(screens.KYCDocuments, {
        loanData: selfieMutate.data,
      });
    }
  }, [selfieMutate?.data]);

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
        {selfieMutate?.isPending && <ActivityIndicatorComponent />}
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
