import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { colors } from "../../colors";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useForm } from "react-hook-form";
import { Modal, useTheme } from "react-native-paper";
import CustomButton from "../../components/Button";
import Header from "../../components/Header";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { assets } from "../../assets/assets";
import { validations } from "../../constants/validations";
import customTheme from "../../colors/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screens } from "../../constants/screens";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import ProgressCard from "../../components/ProgressCard";

import { uploadOtpMethod, uploadAdhaarMethod } from "../../services/ApiUtils";
import {
  makeAdhaarEKYCCall,
  uploadAadharPhotos,
  verifyAadhar,
} from "../../services/muleService/MuleApiUtils";
import { log } from "../../utils/ConsoleLogUtils";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import { toast, useResetRoutes } from "../../utils/functions";

import Canvas, { Image as CanvasImage } from "react-native-canvas";
import { KycScreen } from "../../constants/stringConstants";
import { ConfiguratonConstants } from "../../constants/ConfigurationConstants";
import ErrorConstants from "../../constants/ErrorConstants";
import Toast from "react-native-toast-message";
import useOtpCounter from "../../hooks/useOtpCounter";

const WIDTH = Dimensions.get("window").width;
const screenName = "Documents";

const KYC = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [captcha, setCaptcha] = useState("");
  const [selectedImageBack, setSelectedImageBack] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [adharValidation, setAdhaarValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const uploadAadharToMuleService = uploadAadharPhotos();
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const resetRoute = useResetRoutes();
  const [isImageProcessing, setIsImageProcessing] = useState(false)

  const {
    applicationDetails = {},
    panDetails = { panNumber: "", panName: "" },
  } = loanData;

  console.log("panName>>>", panDetails.panName)

  // 'AMUPH7294R'
  const verifyAdharApi = verifyAadhar(
    panDetails.panNumber,
    loanData,
    panDetails.panName
  );
  // const verifyAdharApi = checkPanLinkWithAdhaar(panDetails.panNumber);
  const canvasRef = useRef(null);
  const [aadhaarBase64, setAadhaarbase64] = useState(null);
  const [adhaarApiType, setAdhaarApiType] = useState(false);
  const adhaarEkycMutate = makeAdhaarEKYCCall();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [mergeAdhaarImages, setMergeAdhaarImages] = useState('')
  const { secondsLeft, formattedTime, startCountDown } = useOtpCounter(120);

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };


  useEffect(() => {
    if (canvasRef.current && selectedImage && selectedImageBack) {
      mergeBase64Images(
        canvasRef,
        selectedImage?.data,
        selectedImageBack?.data
      );
    }
  }, [canvasRef.current, selectedImage, selectedImageBack]);

  const mergeBase64Images = (canvasRef, base64Image1, base64Image2) => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      setIsImageProcessing(true)
      const context = canvas.getContext("2d");
      canvas.width = 600;
      canvas.height = 800; 
      const image1 = new CanvasImage(canvas);
      const image2 = new CanvasImage(canvas);

      image1.src = `data:image/png;base64,${base64Image1}`;
      image2.src = `data:image/png;base64,${base64Image2}`;

      // Ensure both images are loaded before drawing
      const drawImages = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const imageHeight = canvas.height / 2;

        // Draw the first image (top half of the canvas)
        context.drawImage(image1, 0, 0, canvas.width, canvas.height / 2);
        // Draw the second image (bottom half of the canvas)
        context.drawImage(image2, 0, canvas.height / 2, canvas.width, canvas.height / 2);

        // Optionally, convert the canvas content to a data URL

        canvas.toDataURL(selectedImage?.mime).then((dataUrl) => {
          setIsImageProcessing(false)
          setMergeAdhaarImages(dataUrl);
        }).catch(e => setIsImageProcessing(false));
      };

      image1.addEventListener("load", () => {

        image2.addEventListener("load", drawImages);
      });
    } catch (error) {
      setIsImageProcessing(false)
    }

  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      await AsyncStorage.setItem("CurrentScreen", JSON.stringify(screens.KYC));
      const savedData = await AsyncStorage.getItem("FrontAdhaar");
      const currentData = JSON.parse(savedData);

      setSelectedImage(currentData);
    } catch (error) {
      console.log("error first--------------------------", error);
    }

    try {
      const savedDataBack = await AsyncStorage.getItem("BackAdhaar");
      const currentDataBack = JSON.parse(savedDataBack);
      setSelectedImageBack(currentDataBack);
    } catch (error) {
      console.log("error back--------------------------", error);
    }
  };

  const { fonts } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState(0);
  // const {
  //   control,
  //   formState: { errors, isValid },
  // } = useForm({ mode: "onBlur", defaultValues: { otp: "", checkbox: false } });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    setValue,
    setError,
    trigger,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const mock_data = [
    {
      id: "adhaarNumber",
      label: "Adhaar Number",
      type: component.textInput,
      placeHolder: "Enter Adhaar Card Number",
      validations: validations.aadhar,
      isRequired: true,
      data: [],
      value: "",
      showRightComp: false,
      maxLength: 12,
      keyboardtype: "numeric",
    },

    // {
    //   id: "adhaarName",
    //   label: "Adhaar Name",
    //   type: component.textInput,
    //   placeHolder: "Enter your Adhaar Name",
    //   isRequired: true,
    //   data: [],
    //   value: "",
    //   showRightComp: false,
    // },
  ];

  const showModal = () => {
    setValue("adhaarNumber", "");
    setValue("otp", "");
    setCaptcha("");
    setVisible(true);
    setType(0);
  };
  const hideModal = () => setVisible(false);

  // const startTimer = React.useCallback()

  const TimerContent = () => {
    return secondsLeft > 0 ? (
      <View style={styles.timerContainer}>
        <Image
          source={require("../../assets/timer.png")}
          style={styles.timerImage}
        />
        <Text
          style={[
            fonts.bodyRegular,
            { color: "rgba(124, 126, 139, 1)", marginTop: 3 },
          ]}
        >
          {formattedTime}
          {/* {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")} */}
        </Text>
      </View>
    ) : (
      <TouchableOpacity
        style={styles.timerContainer}
        onPress={() => {
          if (type === 0) {
            onSubmitAdhaar();
          } else if (type === 1) {
            uploadAadhar();
          }
        }}
      >
        <Text
          style={[
            fonts.bodyRegular,
            { color: "rgba(46, 82, 161, 1)", marginTop: 3 },
          ]}
        >
          Resend
        </Text>
      </TouchableOpacity>
    );
  };

  const uploadAadhar = async () => {
    try {
      if (!mergeAdhaarImages) {
        Toast.show({ type: 'error', text1: 'Please upload image' });
        return
      }
      const dataURL = mergeAdhaarImages;

      try {
        var data = dataURL.slice(1, -1); // remove the firstlast letter
        data = data?.split(",")[1];
        setAadhaarbase64(data);
      } catch (error) {
        console.log("error>>>", error);
      }

      uploadAadharToMuleService?.mutate(dataURL);
    } catch (error) {
      console.log("some error");
      alert(error);
    }
  };

  const onAdhaarInitiateSuccess = (adhaarType) => {
    toast("success", "Otp sent successfully.");
    setType(1);
    setVisible(true);
    setAdhaarApiType(adhaarType);
    startCountDown();
  };

  useEffect(() => {
    if (uploadAadharToMuleService.data) {
      onAdhaarInitiateSuccess(false);
    }

    if (uploadAadharToMuleService.error) {
      log("error>>>", uploadAadharToMuleService.error);
      toast("error", "Photo not captured correctly");
    }
  }, [uploadAadharToMuleService.data, uploadAadharToMuleService.error]);

  useEffect(() => {
    if (verifyAdharApi?.data) {
      toast("success", "Aadhar verified successfully");
      props.navigation.navigate(screens.CaptureSelfie, {
        loanData: verifyAdharApi.data,
      });
    }

    if (verifyAdharApi.error) {
      toast("error", verifyAdharApi.error);
      console.log("verifyAdharApi.error", verifyAdharApi.error);
    }
  }, [verifyAdharApi.data, verifyAdharApi.error]);

  const onSubmitOtp = async (otp) => {
    // hideModal(); setType(0);

    //uploadOtpMethodFn.mutate({ "otp": 1234 });
    if (await trigger("otp")) {
      const aadharInitiateResponse = !adhaarApiType
        ? uploadAadharToMuleService?.data?.data
        : adhaarEkycMutate?.data?.data;
      // will remove later

      try {
        verifyAdharApi?.mutate({
          otp: otp,
          intitialResponse: aadharInitiateResponse,
          imageBase64: aadhaarBase64,
        });
      } catch (error) { }
    }
  };

  const onSubmitAdhaar = () => {
    const AdhaarDetails = watch("adhaarNumber");
    //const AdhaarName = watch("adhaarName");

    if (!AdhaarDetails && AdhaarDetails?.toString()?.length !== 12) {
      setError("adhaarNumber", "Please enter valid adhaar number");
    }
    //  else if (!AdhaarName) {
    //   setError("adhaarName", "Please enter the Name.");
    // } 
    else {
      adhaarEkycMutate?.mutate({ number: AdhaarDetails, name: panDetails?.panName });
    }
  };
  const handleRightIconPress = (index) => {
    if (index === 0) {
      props.navigation.navigate(screens.FAQ);
    } else if (index === 1) {
      toggleHelpModal();
    }
  };

  useEffect(() => {
    if (adhaarEkycMutate?.data) {
      onAdhaarInitiateSuccess(true);
    }
  }, [adhaarEkycMutate?.data]);

  useEffect(() => {
    if (adhaarEkycMutate?.error) {
      log("applicationFormMutate error", adhaarEkycMutate?.error);
      alert(ErrorConstants.SOMETHING_WENT_WRONG);
    }
  }, [adhaarEkycMutate?.error]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Header
          title="Documents"
          left={require("../../assets/back2.png")}
          rightImages={[
            { source: assets.chat },
            { source: assets.questionRound },
          ]}
          leftStyle={{ height: verticalScale(15), width: verticalScale(15) }}
          leftImageProps={{ resizeMode: "contain" }}
          rightStyle={{
            height: verticalScale(23),
            width: verticalScale(23),
            marginHorizontal: 10,
          }}
          rightImageProps={{ resizeMode: "contain" }}
          titleStyle={{ fontSize: verticalScale(18) }}
          onPressRight={handleRightIconPress}
          onPressLeft={() => {
            // resetRoute(screens.PanDetails, {
            //   loanData: loanData,
            // });

            if (props?.navigation.canGoBack()) {
              props?.navigation.goBack();
            }
          }}
          showHelpModal={showHelpModal}
          toggleHelpModal={toggleHelpModal}
        />
        <ActivityIndicatorComponent
          visible={
            uploadAadharToMuleService?.isPending ||
            verifyAdharApi?.isPending ||
            adhaarEkycMutate?.isPending || isImageProcessing
          }
        />
        {<Canvas ref={canvasRef} style={{ width: 0, height: 0 }} />}
        {false ? (
          <View style={styles.ActivityStyle}>
            <ActivityIndicator size="large" color={colors.coreBlue} />
          </View>
        ) : (
          <>
            <ProgressCard
              screenName={screenName}
              percentage={10}
              ImageData={require("../../assets/Home.png")}
            />
            <View style={styles.subContainer}>
              <Text style={[styles.smallText, { width: "100%" }]}>
                {KycScreen.topLabel}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  showModal();
                }}
                style={{ alignSelf: "center", marginTop: 25, width: "55%" }}
              >
                <View style={styles.recommendedContainer}>
                  <Text
                    style={[
                      styles.nunito_11,
                      { color: colors.white, marginVertical: 5 },
                    ]}
                  >
                    {KycScreen.recommended}
                  </Text>
                </View>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../../assets/aadhar-front.png")}
                    style={styles.frontImage}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
              <Text
                style={[
                  fonts.labelMedium,
                  styles.smallText,
                  { color: colors.LIGHT_BLACK, marginTop: 5 },
                ]}
              >
                {KycScreen.eCardTitle}
              </Text>
              <Text
                style={[
                  styles.smallText,
                  {
                    marginTop: 5,
                    lineHeight: 22,
                    textAlign: "center",
                    fontSize: 14,
                    lineHeight: 25,

                    color: colors.LIGHT_BLACK,
                  },
                ]}
              >
                {KycScreen.eCardSubTitle}
              </Text>
              {adharValidation ? (
                <>
                  <View style={styles.noteContainerAdhaar}>
                    <Image
                      source={require("../../assets/error2.png")}
                      style={styles.bulbImage}
                    />
                    <Text
                      style={[fonts.bodySmall, { color: colors.TEXT_COLOR }]}
                    >
                      We couldn’t
                      <Text
                        style={[fonts.bodyBold, { color: colors.TEXT_COLOR }]}
                      >
                        {" "}
                        connect with Aadhaar server.
                      </Text>
                      Please retry or upload your Aadhaar to proceed further on
                      Interest Rates!
                    </Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.noteContainer}>
                    <Image
                      source={require("../../assets/bulb.png")}
                      style={styles.bulbImage}
                    />
                    <Text style={fonts.bodySmall}>
                      Choose <Text style={fonts.bodyBold}>e-Aadhaar</Text> to
                      get <Text style={fonts.bodyBold}>special benefits</Text>{" "}
                      on Interest Rates!
                    </Text>
                  </View>
                </>
              )}
              <View style={styles.dividerContainer}>
                <View style={styles.horizonalDivider} />
                <Text
                  style={[
                    fonts.labelSmall,
                    {
                      marginTop: 1,
                      marginHorizontal: 10,
                      color: colors.TEXT_COLOR,
                    },
                  ]}
                >
                  Or
                </Text>
                <View style={styles.horizonalDivider} />
              </View>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(screens.CaptureAdhaar, {
                      method: "Front",
                    })
                  }
                >
                  <View style={styles.cardContainerTwo}>
                    <Image
                      source={
                        selectedImage
                          ? {
                            uri: `data:${selectedImage.mime};base64,${selectedImage.data}`,
                          }
                          : require("../../assets/aadhar-front.png")
                      }
                      style={[styles.frontImage]}
                    />
                  </View>
                  <Text style={[fonts.labelMedium, styles.titleText]}>
                    Upload Your{"\n"}Aadhaar Front{"\n"}Photo
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate(screens.CaptureAdhaar, {
                      method: "Back",
                    })
                  }
                >
                  <View style={styles.cardContainerTwo}>
                    <Image
                      source={
                        selectedImageBack
                          ? {
                            uri: `data:${selectedImageBack.mime};base64,${selectedImageBack.data}`,
                          }
                          : require("../../assets/aadhar-back.png")
                      }
                      style={[styles.frontImage]}
                    />
                  </View>
                  <Text style={[fonts.labelMedium, styles.titleText]}>
                    Upload Your{"\n"}Aadhaar Back{"\n"}Photo
                  </Text>
                </TouchableOpacity>
              </View>
              {selectedImage && selectedImageBack && (
                <CustomButton
                  type="primary"
                  label="Proceed"
                  buttonContainer={styles.buttonContainer}
                  isLoading={isLoading}
                  onPress={() => {
                    uploadAadhar();
                  }}
                />
              )}
            </View>
          </>
        )}
      </ScrollView>
      <Modal
        withHandle={false}
        statusBarTranslucent={true}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
      >
        {type === 0 ? (
          <View>
            <TouchableOpacity
              onPress={hideModal}
              style={{
                height: 20,
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <Image
                source={require("../../assets/cross2.png")}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
            <View style={{ marginVertical: verticalScale(16) }}>
              {mock_data.map((comp, index) => {
                return (
                  <FormControl
                    compType={comp.type}
                    control={control}
                    validations={comp.validations}
                    name={comp.id}
                    label={comp.label}
                    errors={errors[comp.id]}
                    isRequired={comp.isRequired}
                    placeholder={comp.placeHolder}
                    data={comp.data}
                    key={comp.id}
                    setValue={setValue}
                    showRightComp={comp.showRightComp}
                    type={comp.keyboardtype}
                    // rightComp={() =>
                    //   !errors[comp.id] &&
                    //   getValues("adhaarNumber")?.length === 12 ? (
                    //     isVerified ? (
                    //       <Text>Verify</Text>
                    //     ) : (
                    //       <Image
                    //         source={require("../../assets/tick2.png")}
                    //         style={styles.tickImage}
                    //       />
                    //     )
                    //   ) : (
                    //     setIsVerified(true)
                    //   )
                    // }
                    rightCompPress={() => {
                      setIsVerified(!isVerified);
                    }}
                    isMultiline={comp.isMultiline}
                    maxLength={comp.maxLength}
                    isDisabled={comp.isDisabled}
                  />
                );
              })}
            </View>
            <CustomButton
              type="primary"
              label="Continue"
              buttonContainer={styles.modalButtonContainer}
              onPress={() => {
                onSubmitAdhaar();
              }}
            />
          </View>
        ) : (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View />
              <Text
                style={[
                  fonts.labelMedium,
                  {
                    color: "rgba(68, 70, 91, 1)",
                    textAlign: "center",
                    flex: 1,
                    textAlign: "center",
                  },
                ]}
              >
                OTP Verification
              </Text>

              <TouchableOpacity onPress={hideModal} style={{ height: 20 }}>
                <Image
                  source={require("../../assets/cross2.png")}
                  style={{ height: 16, width: 16 }}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={[
                fonts.labelSmall,
                { marginTop: 5, lineHeight: 18, textAlign: "center" },
              ]}
            >
              One-Time Password has been sent to{"\n"}your registered Mobile
              Number.
            </Text>
            <FormControl
              compType={component.otpInput}
              control={control}
              watch={watch}
              validations={validations.otp}
              name="otp"
              label="otp"
              errors={errors.leadId}
              isRequired
              setValue={setValue}
              style={styles.otpInputContainer}
              maxLength={6}
              trigger={trigger}
            />
            <TimerContent />
            <CustomButton
              type="primary"
              label="Submit"
              buttonContainer={styles.modalButtonContainer}
              onPress={() => onSubmitOtp(getValues("otp"))}
            />
          </View>
        )}
      </Modal>
    </View>
  );
};

export default KYC;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.bgColor,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  subContainer: {
    flexGrow: 1,
    marginTop: 10,
    alignItems: "center",
  },
  buttonContainer: {
    // position: 'absolute',
    alignSelf: "center",
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
    // bottom: 10
  },
  modalButtonContainer: {
    alignSelf: "center",
    width: "100%",
  },
  recommendedContainer: {
    backgroundColor: "#0076C7",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.coreBlue,
    height: 140,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainerTwo: {
    width: 140,
    height: 140,

    borderColor: "rgba(189, 197, 208, 0.5)",
    borderWidth: 1,
    // marginTop: -1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  frontImage: {
    width: "70%",
    height: "70%",
    alignSelf: "center",
    // marginTop: 5,
    borderRadius: 10,
  },
  noteContainer: {
    backgroundColor: "rgba(239, 244, 253, 1)",
    padding: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingLeft: 40,
    marginTop: 10,
    borderRadius: 10,
  },
  noteContainerAdhaar: {
    backgroundColor: "rgba(251, 226, 226, 1)",
    padding: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingLeft: 40,
    marginTop: 10,
    borderRadius: 10,
  },
  bulbImage: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    position: "absolute",
    top: -15,
    left: 8,
  },
  horizonalDivider: {
    flexGrow: 1,
    height: 2,
    backgroundColor: "rgba(192, 192, 192, 1)",
  },
  dividerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  titleText: {
    marginTop: 10,
    color: colors.LIGHT_BLACK,
    textAlign: "center",
    fontFamily: "Nunito",
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 15,
  },
  modalContainer: {
    width: "100%",
    padding: 20,
    paddingTop: 30,
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  labelText: {
    marginTop: 10,
  },
  inputContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 50,
    flexDirection: "row",
    marginVertical: 10,
  },
  input: {
    // flexGrow: 1,
    // marginHorizontal: 5,
    // paddingVertical: 8
    height: "100%",
    width: "100%",
  },
  tickImage: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  captchaContainer: {
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  refreshImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  refreshContiner: {
    padding: 10,
    backgroundColor: "rgba(46, 82, 161, 1)",
  },
  captchaText: {
    color: colors.black,
    marginTop: 4,
    letterSpacing: 20,
  },
  otpInputContainer: {
    flex: 1,
    backgroundColor: customTheme.colors.greyShadow,
    marginLeft: 10,
    height: 60,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#E8E8EA",
  },
  timerImage: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  timerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  smallText: {
    fontFamily: "Nunito",
    fontSize: 17,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: -0.16500000655651093,
    color: colors.labelColor,
  },
  nunito_11: {
    fontFamily: "Nunito",
    fontSize: 11,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 25,
    letterSpacing: -0.16500000655651093,
    textAlign: "center",
    color: colors.white,
  },
});
