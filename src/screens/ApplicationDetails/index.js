import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useTheme } from "react-native-paper";
import { validations } from "../../constants/validations";
import { screens } from "../../constants/screens";
import Button from "././../../components/Button";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import ApplicationCard from "./component/ApplicationCard";
import { styles } from "./styles/ApplicationDetailStyle";
import Header from "../../components/Header";
import { assets } from "../../assets/assets";
import HelpModal from "./component/HelpModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDateYearsBack } from "../../utils/dateUtil";
import {
  getUserDetailQuery,
  useSubmitApplicationFormData,
} from "./../../services/ApiUtils";
import DimensionUtils from "../../utils/DimensionUtils";
import CustomModal from "../../components/CustomModal";
import { Image } from "react-native";
import { getApplicationDetailsForm } from "./../../services/ApiUtils";
import { getMetaData } from "../../services/sfDataServices/netService";
import { log } from "../../utils/ConsoleLogUtils";
import { useRoute } from "@react-navigation/native";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import ErrorConstants from "../../constants/ErrorConstants";

const initialData = [
  {
    id: "applicationType",
    value: 0,
  },
  {
    id: "customerProfile",
    value: 0,
  },
  {
    id: "firstName",
    value: 0,
  },
  {
    id: "lastName",
    value: 0,
  },
  {
    id: "dob",
    value: 0,
  },
];

export default function ApplicationDetails(props) {
  const route = useRoute();
  const { pincode = "400001" } = route.params || {};
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [{ data = {}, error }] = getUserDetailQuery();
  const [modalVisible2, setModalVisible2] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const getFormData = getApplicationDetailsForm();
  const [mock_data, setMockData] = useState([]);
  const applicationFormMutate = useSubmitApplicationFormData();

  useEffect(() => {
    getFormData?.mutate({ pincode: pincode });
  }, []);

  const handleRightIconPress = (index) => {
    if (index === 0) {
      props.navigation.navigate(screens.FAQ);
    } else if (index === 1) {
      props.navigation.navigate(screens.HomeScreen);
    }
  };

  useEffect(() => {
    if (getFormData?.data) {
      log(">>>>>>", getFormData?.data);
      setMockData(getFormData?.data);
    }
  }, [getFormData?.data]);

  // const allFields = mock_data.map

  const TnC = () => {
    // if (!isChecked){
    setModalVisible2(true);
    // }
  };

  const ok = () => {
    setModalVisible2(false);
  };

  const handleCheckBoxClick = () => {
    setIsChecked(!isChecked);
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      LeadSource: "Customer Mobile App",
      branchName: "",
      Pincode__c: pincode,
    },
  });

  const { colors } = useTheme();

  useEffect(() => {
    async function fetchData() {
      await AsyncStorage.setItem(
        "CurrentScreen",
        JSON.stringify(screens.ApplicantDetails)
      );
      const savedData = await AsyncStorage.getItem("ApplicationDetails");
      const currentData = JSON.parse(savedData);

      // if (currentData) {
      //   Object.keys(currentData).forEach((item) =>
      //     setValue(item, currentData[item])
      //   );
      // }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const { mobileNumber, email, userId } = data;
      if (mobileNumber) {
        setValue("mobileNumber", mobileNumber);
      }

      if (email) {
        setValue("email", email);
      }

      if (userId) {
        setValue("rmName", userId);
      }
    }
  }, [data]);

  const onSubmit = async (data) => {
    try {
      const isValid = await trigger();
      if (!isValid) return;
      const data = new watch();
      applicationFormMutate.mutate(data);
      //
    } catch (error) {
      console.log("IN ERROR");
    }
  };

  useEffect(() => {
    if (applicationFormMutate.data) {
      props?.navigation?.navigate(screens.PanDetails, {
        applicationDetails: applicationFormMutate.data,
      });
    }
  }, [applicationFormMutate.data]);

  useEffect(() => {
    if (applicationFormMutate.error) {
      log('applicationFormMutate error', applicationFormMutate.error);
      alert(ErrorConstants.SOMETHING_WENT_WRONG)
    }
  }, [applicationFormMutate.error]);

  console.log(errors, "isValid erors");

  const ChangeValue = async (value, id) => {
    setValue(id, value);

    if (id === "pincode") {
    }
    const prevValue = { ...watch() };
    console.log("PREV VALUE---------", prevValue);
    prevValue[id] = value;
    await AsyncStorage.setItem("ApplicationDetails", JSON.stringify(prevValue));
  };

  // DATA THAT IS GOING TO BE POPULATED
  // Lead source, branch name by pincode, mobile number, email

  const checkFormCondition = (id) => {
    if (
      id !== "rentPerMonth" &&
      id !== "employmentExperience" &&
      id !== "totalWorkExperience" &&
      id !== "totalBusinessExperience"
    ) {
      return true;
    }

    if (id === "rentPerMonth" && watch("presentAccommodation") === "rented") {
      return true;
    } else if (
      watch("customerProfile") === "salaried" &&
      (id === "employmentExperience" || id === "totalWorkExperience")
    ) {
      return true;
    } else if (
      id === "totalBusinessExperience" &&
      watch("customerProfile") === "self-employed"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const toggleModal = () => setShowModal(!showModal);
  const style = styles(colors);

  if (getFormData?.isPending) {
    return <ActivityIndicatorComponent />;
  }

  return (
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
          title="Application Details"
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
        />
      </View>
      <ScrollView contentContainerStyle={style.scrollviewStyle}>
        <View style={style.container}>
          <ApplicationCard navigation={props?.navigation} />
        </View>

        <View
          style={{ marginHorizontal: DimensionUtils.pixelSizeHorizontal(15) }}
        >
          {applicationFormMutate?.isPending && <ActivityIndicatorComponent />}
          {mock_data.map((comp, index) => {
            if (!checkFormCondition(comp.id)) {
              return <></>;
            }
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
                keyIndex={comp.id}
                setValue={setValue}
                isMultiline={comp.isMultiline}
                maxLength={comp.maxLength}
                isDisabled={comp.isDisabled}
                onChangeText={(value) => ChangeValue(value, comp.id)}
                type={comp.keyboardtype}
                trigger={trigger}
              />
            );
          })}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "84%",
            marginHorizontal: horizontalScale(20),
            marginTop: verticalScale(25),
            marginBottom: verticalScale(15),
          }}
        >
          <TouchableOpacity style={{}} onPress={handleCheckBoxClick}>
            <Image
              style={{ width: 22, height: 22, resizeMode: "contain" }}
              source={
                true
                  ? require("../../../assets/images/checked.png")
                  : require("../../../assets/images/box.png")
              }
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: verticalScale(5),
              fontSize: 14,
              lineHeight: 18,
              color: "#000000",
            }}
            onPress={() => setModalVisible2(true)}
          >
            Terms and Condition Unico Housing Finance Private Limited.
          </Text>
        </View>

        <View style={{ paddingHorizontal: horizontalScale(30) }}>
          <Button
            type="primary"
            label="Continue"
            disable={!isValid || !isChecked}
            onPress={onSubmit}
            // onPress={()=>TnC()}
            buttonContainer={{ marginVertical: verticalScale(20) }}
          />
        </View>
        <CustomModal
          modalStyle={style.modalstyle}
          showModal={modalVisible2}
          centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <View>
            <TouchableOpacity onPress={() => setModalVisible2(false)}>
              <Image
                source={require("../../../assets/images/crossGray.png")}
                style={{
                  width: 17,
                  height: 17,
                  resizeMode: "contain",
                  justifyContent: "flex-end",
                  marginHorizontal: horizontalScale(330),
                  marginBottom: verticalScale(12.5),
                }}
              />
            </TouchableOpacity>

            <Text style={{ fontWeight: "600", fontSize: 20, color: "#000000" }}>
              Terms and Condition
            </Text>
            <ScrollView >
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  marginTop: verticalScale(17.5),
                  marginBottom: verticalScale(-15),
                }}
              >
                <Text
                  style={{
                    lineHeight: 28,
                    fontSize: 12,
                    color: "#000000",
                    fontWeight: "600",
                  }}
                >
                  An Intellectual Property clause will inform users that the
                  contents, logo and other visual media you created is your
                  property and is protected by copyright laws.
                  {"\n"}
                  1. A Termination clause will inform users that any accounts on
                  your website and mobile app, or users' access to your website
                  and app, can be terminated in case of abuses or at your sole
                  discretion.
                  {"\n"}
                  2. A Governing Law clause will inform users which laws govern
                  the agreement. These laws should come from the country in
                  which your company is headquartered or the country from which
                  you operate your website and mobile app.
                  {"\n"}
                  3. A Links to Other Websites clause will inform users that you
                  are not responsible for any third party websites that you link
                  to.
                </Text>
              </View>
            </ScrollView>
            <View style={{ marginBottom: verticalScale(10) }}>
              <Button
                type="primary"
                label="ok"
                onPress={() => ok()}
                buttonContainer={{ width: 154, alignSelf: "center" }}
              />
            </View>
          </View>
        </CustomModal>
      </ScrollView>
    </View>
  );
}
