import {
  Image,
  StyleSheet,
 
  View,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { assets } from "../../assets/assets";
import React, { useState, useEffect } from "react";
import { colors } from "../../colors";
import CustomButton from "../../components/Button";
import Header from "../../components/Header";
import { screens } from "../../constants/screens";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { verticalScale } from "../../utils/matrcis";
import { validations } from "../../constants/validations";
import { useForm } from "react-hook-form";
import ProgressCard from "../../components/ProgressCard";
import HelpModal from "../ApplicationDetails/component/HelpModal";
import { toast } from "../../utils/functions";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import {
  verifyPanApi,
  uploadAndVerifyPan,
  nameMatchCheck,
} from "../../services/muleService/MuleApiUtils";
import { useSubmitPanForm } from "../../services/ApiUtils";
import { error, log } from "../../utils/ConsoleLogUtils";
import ImagePicker from "react-native-image-crop-picker";
import AdhaarSection from "../../components/AdhaarSection";
import { ConfiguratonConstants } from "../../constants/ConfigurationConstants";
import ErrorConstants from "../../constants/ErrorConstants";
import { useRoute } from "@react-navigation/native";
import { Text } from "react-native-paper";

const PanDetails = (props) => {
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const [isVerified, setIsVerified] = useState(false);
  const [isUploadVerified, setUploadIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [message, setMessage] = useState('12345');
  const [responseData, setResponseData] = useState(null);
  const [panDetails, setPanDetails] = useState(null);
  const panSubmitMutate = useSubmitPanForm(loanData);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    watch,
    setValue,
    trigger,
  } = useForm({
    
    defaultValues: {},
  });

  const mock_data = [
    {
      id: "panNumber",
      label: "PAN Number",
      type: component.textInput,
      placeHolder: "Enter your PAN Number here",
      validations: validations.pan,

      data: [],
      value: "",
      showRightComp: true,
      maxLength: 10,
    },
  ];
  const verifyPan = verifyPanApi();
  const uploadPan = uploadAndVerifyPan();
  const [showHelpModal, setShowHelpModal] = useState(false);

  console.log('ERRROR hERE', verifyPan?.error)

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };
  // const savePan = submitPanApi();

  useEffect(() => {
    if (verifyPan?.data) {
      try {
        const { panNumber } = watch();

        const panCapital = panNumber?.toString()?.toUpperCase();
        const response = verifyPan?.data?.data;
        setIsVerified(true);
        showResponseData(response?.results?.name, "");
       // toast("success", "Pan Verified");
        setPanDetails({
          panNumber: panCapital,
          panName: response?.results?.name,
        });
      } catch (error) {}
    }

    if (verifyPan?.error) {
      console.log('verifyPan?.error', verifyPan?.error)
      setError("panNumber", {
        type: "custom",
        message: ErrorConstants.PAN_UNVERIFIED,
      });
      setIsVerified(false);
      //setError("panNumbRr", "Pan is not verified");
    }
  }, [verifyPan?.data, verifyPan?.error]);

  useEffect(() => {
    if (uploadPan?.data) {
      try {
        const response = uploadPan?.data?.data;
        setUploadIsVerified(true);
        toast("success", "Pan Verified");
        showResponseData(
          response?.results?.name,
          response?.results?.ocrDetails?.[0]?.details?.date?.value
        );
        setPanDetails({
          panNumber: response?.results?.ocrDetails?.[0]?.details?.panNo?.value,
          panName: response?.results?.name,
        });
      } catch (error) {}
    }

    if (uploadPan?.error) {
      error("panverifyError>>>>", JSON.stringify(uploadPan?.error));
      setIsVerified(false);
      toast("error", "PAN  UnVerified");
      //setError("panNumbRr", "Pan is not verified");
    }
  }, [uploadPan?.data, uploadPan?.error]);

  const toggleModal = () => setShowModal(!showModal);

  const showResponseData = (name, dob) => {
    setResponseData([
      {
        id: "name",
        label: "Name",
        type: component.textInput,
        placeHolder: name,
        isRequired: false,
        data: [],
        isEditable: false,
        isMultiline: true,

        value: name,
      },
      // {
      //   id: "dob",
      //   label: "DOB",
      //   type: component.textInput,
      //   placeHolder: dob,
      //   isRequired: false,
      //   data: [],
      //   isEditable: false,
      //   isMultiline: true,

      //   value: dob,
      // },
    ]);
  };

  const verifyPanBtn = async () => {
    const { panNumber } = watch();

    setValue("panNumber", panNumber?.toString()?.toUpperCase());
    try {
      Keyboard?.dismiss();
    } catch (error) {}
    try {
      if (isVerified || verifyPan?.isPending) {
        return;
      }
      const isValid = await trigger();
      if (!isValid) {
        // toast("error", "Value is invalid");

        return;
      }
      setUploadIsVerified(false);
      setIsVerified(false);

      verifyPan.mutate({
        pan: panNumber?.toString()?.toUpperCase(),
        consent: "Y",
        caseId: "eeea90ab-f4e0-4d9e-9efa-c03fffbd22c7",
      });
    } catch (error) {
      const { message } = error;
      const errorMsg = message || "Pan is not valid";
      //toast("error", errorMsg);
      setError("panNumbRr", errorMsg);
    }
  };

  const submitPan = async () => {
    try {
      panSubmitMutate?.mutate({ panDetails, imageBase64: selectedImage?.data });
    } catch (error) {
      toast("error", "Some error occurred");
    }
  };

  useEffect(() => {
    if (panSubmitMutate?.data) {
      props?.navigation?.navigate(screens.KYC, {
        loanData: panSubmitMutate?.data,
      });
    }
  }, [panSubmitMutate?.data]);

  useEffect(() => {
    if (panSubmitMutate?.error) {
      log("applicationFormMutate error", panSubmitMutate?.error);
      alert(ErrorConstants.SOMETHING_WENT_WRONG);
    }
  }, [panSubmitMutate?.error]);

  const handleRightIconPress = (index) => {
    if (index === 0) {
      props.navigation.navigate(screens.FAQ);
    } else if (index === 1) {
      toggleHelpModal();
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
     
      setIsVerified(false);
      setUploadIsVerified(false);
      setSelectedImage(null);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onCameraPress = async () => {
    setUploadIsVerified(false);
    setIsVerified(false);
    ImagePicker.openPicker({
      multiple: false,
      cropping: true,
      compressImageQuality: 0.6,
      includeBase64: true,
      mediaType: "photo",
    })
      .then(async (image) => {
        setSelectedImage(image);
        uploadPan.mutate({
          fileData: {
            content: `data:${image.mime};base64,${image.data}`,
            title: "PAN",
          },
          consent: "Y",
          caseId: "eeea90ab-f4e0-4d9e-9efa-c03fffbd22c7",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <HelpModal
        toggleModal={toggleModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Header
        title="PAN Details"
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
          props?.navigation?.reset({
            index: 0,
            routes: [
              {
                name: screens.HomeScreen,
              },
            ],
          });
        }}
        showHelpModal={showHelpModal}
        toggleHelpModal={toggleHelpModal}
      />
      <ScrollView
        style={{ marginBottom: 25 }}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <ProgressCard screenName={"PAN Details"} />

          <ActivityIndicatorComponent
            visible={
              verifyPan?.isPending ||
              uploadPan?.isPending ||
              panSubmitMutate?.isPending
            }
          />

          {mock_data.map((comp, index) => {
            return (
              (index === 0 ||
                (!errors[comp.id] &&
                  getValues("panNumber")?.length === 10 &&
                  isVerified)) && (
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
                  watch={watch}
                  showRightComp={comp.showRightComp || false}
                  rightComp={() =>
                    !isVerified ? (
                      <Text style={styles.verifyTextStyle}>Verify</Text>
                    ) : (
                      <Image
                        source={require("../../assets/tick2.png")}
                        style={styles.tickImage}
                      />
                    )
                  }
                  rightCompPress={verifyPanBtn}
                  isMultiline={comp.isMultiline}
                  maxLength={comp.maxLength}
                  isDisabled={comp.isDisabled}
                  isUpperCaseRequired={true}
                />
              )
            );
          })}

          {ConfiguratonConstants.isPanUploadRequired && (
            <>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text
                  style={{
                    color: colors.TEXT_COLOR,
                    fontSize: 18,
                    fontStyle: "bold",
                  }}
                >
                  Or
                </Text>
              </View>
              <TouchableOpacity onPress={onCameraPress}>
                <View>
                  <AdhaarSection
                    AdhaarText={"Upload and Verify your PAN"}
                    image={selectedImage}
                    style={{ height: 250, marginTop: 16 }}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}

          {(isVerified || isUploadVerified) &&
            responseData &&
            <Text variant="labelLarge" style={{textAlign:'center', fontSize:14, color:colors.GREEN_COLOR}}>Pan Verified Successfully.</Text>
           }

          {(isVerified || isUploadVerified) && (
            <View>
              <CustomButton
                type="primary"
                label="Proceed"
                buttonContainer={styles.buttonContainer}
                onPress={submitPan}
                // isLoading={isPendingSubmit}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PanDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  inputContainer: {
    backgroundColor: colors.bgColor,
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
    flexGrow: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
  },
  tickImage: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  subContainer: {
    marginTop: 10,
    flexGrow: 1,
  },
  labelText: {
    marginTop: 10,
  },
  buttonContainer: {
    marginVertical: 50,
  },
  homeIcon: {
    width: 47,
    aspectRatio: 1.2,
    resizeMode: "contain",
    transform: [{ rotateZ: "27deg" }],
  },
  processContainer: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  firstProgressLayer: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "#ffffff",
    borderBottomColor: "#ffffff",
    borderRightColor: "#ffffff",
    borderTopColor: "#ffffff",
    transform: [{ rotateZ: "-135deg" }],
    justifyContent: "center",
    alignItems: "center",
  },
  secondProgressLayer: {
    width: 100,
    height: 100,
    position: "absolute",
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#3498db",
    borderTopColor: "#3498db",
    transform: [{ rotateZ: "45deg" }],
  },
  offsetLayer: {
    width: 100,
    height: 100,
    position: "absolute",
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#fff",
    borderTopColor: "#fff",
    transform: [{ rotateZ: "-135deg" }],
  },
  verifyTextStyle: {
    fontFamily: "Montserrat",
    fontSize: 12,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 12,
    color: colors.coreBlue,
  },
});
