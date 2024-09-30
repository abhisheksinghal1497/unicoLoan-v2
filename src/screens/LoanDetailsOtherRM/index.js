import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { FormControl } from "../../components/FormComponents/FormControl";
  import { useTheme } from "react-native-paper";
  import { screens } from "../../constants/screens";
  import Button from "././../../components/Button";
  import { horizontalScale, verticalScale } from "../../utils/matrcis";
  
  import { styles } from "../ApplicationDetails/styles/ApplicationDetailStyle";
  import Header from "../../components/Header";
  import { assets } from "../../assets/assets";
  import HelpModal from "../ApplicationDetails/component/HelpModal";
  
  import {
      getLoanDetailsFormOtherRM,
    getUserDetailQuery,
    useSubmitApplicationFormData,
  } from "./../../services/ApiUtils";
  import DimensionUtils from "../../utils/DimensionUtils";
  import CustomModal from "../../components/CustomModal";
  import { Image } from "react-native";
  import { getApplicationDetailsForm } from "./../../services/ApiUtils";
  
  import { log } from "../../utils/ConsoleLogUtils";
  import { useRoute } from "@react-navigation/native";
  import ActivityIndicatorComponent from "../../components/ActivityIndicator";
  import ErrorConstants from "../../constants/ErrorConstants";
  import WebviewComponent from "../../components/WebviewComponent";
  import { ConfiguratonConstants } from "../../constants/ConfigurationConstants";
  import { useResetRoutes } from "../../utils/functions";
  import Container from "../../components/Container";
  import { EMAIL_CC, Mobile } from "../../constants/stringConstants";
  import LocalStorage from "../../services/LocalStorage";
  
  export default function ApplicationDetails(props) {
    const route = useRoute();
    const { pincode = "", pincodeData = {} } = route.params || {};
    const [showModal, setShowModal] = useState(false);
    const [{ data = {}, error }] = getUserDetailQuery();
    const getFormData = getLoanDetailsFormOtherRM();
    const [mock_data, setMockData] = useState([]);
    const applicationFormMutate = useSubmitApplicationFormData(pincodeData);
    const resetRoute = useResetRoutes();
    const [showHelpModal, setShowHelpModal] = useState(false);
  
    const toggleHelpModal = () => {
      setShowHelpModal(!showHelpModal);
    };
  
    useEffect(() => {
      getFormData?.mutate({ pincode: pincodeData });
    }, []);
  
    const handleRightIconPress = (index) => {
      if (index === 0) {
        props.navigation.navigate(screens.FAQ);
      } else if (index === 1) {
        toggleHelpModal();
      }
    };
  
    useEffect(() => {
      if (getFormData?.data) {
        setMockData(getFormData?.data);
      }
    }, [getFormData?.data]);
  
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      watch,
      setValue,
      setError,
      trigger,
    } = useForm({
      mode: "onBlur",
      defaultValues: {
        branchName: "",
        Pincode__c: pincode,
        RM__c: "RM",
        LeadSource__c: "Customer Mobile App",
        Bank_Branch_Name: pincodeData?.Bank_Branch__c,
        Consent_Status__c: "Verified",
      },
    });
  
    const { colors } = useTheme();
  
    useEffect(() => {
      if (data) {
        const { mobileNumber, email, userId } = data;
        if (mobileNumber) {
          setValue("MobNumber__c", LocalStorage?.getUserData()?.Phone);
        }
  
        if (email) {
          setValue("EmailId__c", LocalStorage?.getUserData()?.Email);
        }
  
        if (userId) {
          // setValue("rmName", userId);
        }
      }
    }, [data]);
  
    const onSubmit = async () => {
      try {
        setError("MobNumber__c", "");
        setError("AltMobile__c", "");
        const isValid = await trigger();
  
        if (!isValid) return;
  
        const data = new watch();
  
        if (
          data?.MobNumber__c &&
          data?.AltMobile__c &&
          data?.MobNumber__c === data?.AltMobile__c
        ) {
          setError(
            "MobNumber__c",
            "Permanent and Alternate number can't be same"
          );
          setError(
            "AltMobile__c",
            "Permanent and Alternate number can't be same"
          );
          return;
        }
  
        applicationFormMutate.mutate(data);
        log("application Data", data);
  
        //
      } catch (error) {
        console.log("IN ERROR");
      }
    };
  
    useEffect(() => {
      if (applicationFormMutate.data) {
        resetRoute(screens.ConsentScreen, {
          loanData: applicationFormMutate.data,
        });
      }
    }, [applicationFormMutate.data]);
  
    useEffect(() => {
      if (applicationFormMutate.error) {
        log("applicationFormMutate error", applicationFormMutate.error);
        alert(ErrorConstants.SOMETHING_WENT_WRONG);
      }
    }, [applicationFormMutate.error]);
  
    console.log(errors, "isValid erors");
  
    const ChangeValue = async (value, id) => {
      setValue(id, value);
  
      if (id === "pincode") {
      }
      const prevValue = { ...watch() };
      prevValue[id] = value;
    };
  
    // DATA THAT IS GOING TO BE POPULATED
    // Lead source, branch name by pincode, mobile number, email
  
    useEffect(() => {
      const subscription = watch((value, { name, type }) => {
        try {
          if (
            name === "No_of_Family_Dependants_Other__c" ||
            name === "No_of_Family_Dependants_Children__c"
          ) {
            const familyDependentOthers = watch(
              "No_of_Family_Dependants_Other__c"
            );
            const familyDependantChildren = watch(
              "No_of_Family_Dependants_Children__c"
            );
            var totalDependent = 0;
            if (familyDependentOthers) {
              const value = Number(familyDependentOthers);
              if (!isNaN(value)) {
                // Handle the error
                totalDependent = totalDependent + value;
              }
            }
  
            if (familyDependantChildren) {
              const value = Number(familyDependantChildren);
              if (!isNaN(value)) {
                // Handle the error
                totalDependent = totalDependent + value;
              }
            }
  
            setValue(
              "Number_of_Family_Dependants__c",
              totalDependent?.toString()
            );
          }
          // else if (name === "MobNumber__c" || name === "AltMobile__c") {
          //   const MobNumber__c = watch("MobNumber__c");
          //   const AltMobile__c = watch("AltMobile__c");
  
          //   if (MobNumber__c && AltMobile__c) {
          //     if (MobNumber__c === AltMobile__c) {
          //       setError(
          //         "MobNumber__c",
          //         "Permanent and Alternate number can't be same"
          //       );
          //       setError(
          //         "AltMobile__c",
          //         "Permanent and Alternate number can't be same"
          //       );
          //     }else {
          //       setError(
          //         "MobNumber__c",
          //         ""
          //       );
          //     }
  
          //     return;
          //   }
          // }
        } catch (error) {}
      });
      return () => subscription.unsubscribe();
    }, [watch]);
  
    const checkFormCondition = (id) => {
      if (
        id !== "If_rented_rent_per_month__c" &&
        id !== "Employment_experience__c" &&
        id !== "Total_Work_Experience__c" &&
        id !== "Total_Business_Experience__c"
      ) {
        return true;
      }
  
      const Present_Accomodation__c = watch("Present_Accomodation__c");
  
      if (
        id === "If_rented_rent_per_month__c" &&
        Present_Accomodation__c &&
        Present_Accomodation__c?.toString()?.includes("Rented")
      ) {
        return true;
      } else if (
        watch("Customer_Profile__c") === "Salaried" &&
        (id === "Employment_experience__c" || id === "Total_Work_Experience__c")
      ) {
        return true;
      } else if (
        id === "Total_Business_Experience__c" &&
        watch("Customer_Profile__c") === "Self-Employed"
      ) {
        return true;
      } else {
        return false;
      }
    };
  
    const toggleModal = () => setShowModal(!showModal);
    const style = styles(colors);
    //console.log("getFormData?.isPending", getFormData?.isPending);
    // if (getFormData?.isPending) {
    //   return <ActivityIndicatorComponent />;
    // }
  
    return (
      <Container>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <HelpModal
            toggleModal={toggleModal}
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <View
            style={{
              paddingHorizontal: horizontalScale(15),
              marginTop: verticalScale(10),
            }}
          >
            <Header
              title="Loan Details"
              left={assets.back}
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
                props?.navigation?.goBack();
              }}
              showHelpModal={showHelpModal}
              toggleHelpModal={toggleHelpModal}
            />
          </View>
          <ScrollView contentContainerStyle={style.scrollviewStyle}>
            {/* <View style={style.container}>
            <ApplicationCard navigation={props?.navigation} />
          </View> */}
  
            <View
              style={{ marginHorizontal: DimensionUtils.pixelSizeHorizontal(15) }}
            >
        
                <ActivityIndicatorComponent visible={applicationFormMutate?.isPending || getFormData?.isPending} />
          
              {mock_data.map((comp, index) => {
                if (!checkFormCondition(comp.id)) {
                  return <></>;
                }
                return (
                  <FormControl
                    key={index?.toString()}
                    compType={comp.type}
                    control={control}
                    validations={comp.validations}
                    name={comp.id}
                    label={comp.label}
                    errors={errors[comp.id]}
                    isRequired={comp.isRequired}
                    placeholder={comp.placeHolder}
                    data={comp.data}
                    keyIndex={comp.id}
                    setValue={setValue}
                    isMultiline={comp.isMultiline}
                    maxLength={comp.maxLength}
                    isDisabled={comp.isDisabled}
                    isCheckboxType={comp.isCheckboxType}
                    onChangeText={(value) => ChangeValue(value, comp.id)}
                    type={comp.keyboardtype}
                    trigger={trigger}
                  />
                );
              })}
            </View>
  
            {mock_data && mock_data?.length > 0 && (
              <>
  
                <View style={{ paddingHorizontal: horizontalScale(30) }}>
                  <Button
                    type="primary"
                    label="Continue"
                    onPress={onSubmit}
                    // onPress={()=>TnC()}
                    buttonContainer={{ marginVertical: verticalScale(20) }}
                  />
                </View>
              </>
            )}
      
          </ScrollView>
        </View>
      </Container>
    );
  }
  