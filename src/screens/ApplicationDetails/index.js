import { Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useTheme, Text } from "react-native-paper";
import { validations } from "../../constants/validations";
import { screens } from "../../constants/screens";
import Button from "././../../components/Button";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import ApplicationCard from "./component/ApplicationCard";
import { styles } from "./styles/ApplicationDetailStyle";
import moment from "moment";
import Header from "../../components/Header";
import { assets } from "../../assets/assets";
import HelpModal from "./component/HelpModal";
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialData = [
  {
    id: "applicationType",
    value: 0
  },
  {
    id: "customerProfile",
    value: 0
  },
  {
    id: "firstName",
    value: 0
  },
  {
    id: "lastName",
    value: 0
  },
  {
    id: "dob",
    value: 0
  }
]

export default function ApplicationDetails(props) {

  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: { mobile: 9876543210, otp: "", checkbox: false },
  });

  const { colors } = useTheme();

  useEffect(() => {
    async function fetchData() {
      await AsyncStorage.setItem('CurrentScreen', JSON.stringify(screens.ApplicantDetails));
      const savedData = await AsyncStorage.getItem('ApplicationDetails');
      const currentData = JSON.parse(savedData);
      console.log(currentData, 'current value');
      {currentData?.map(item =>{
        console.log(item)
        setValue(item.id,item.value)
      })}
    }
    fetchData();
  }, []);

  const onSubmit = (data) => {
    console.log("njnjnjnb");
    console.log(JSON.stringify(data, null, 2));
    props?.navigation?.navigate(screens.PandcardDetails);
  };

  const ChangeValue = async(value, id) => {
    setValue(id, value)
    objIndex = initialData.findIndex(obj => obj.id === id);
    initialData[objIndex].value = value
    await AsyncStorage.setItem('ApplicationDetails', JSON.stringify(initialData));
  }

  // {
  //   id: "leadId", // unique id for field
  //   label: "SFDC Lead Id", // label to show to the user
  //   type: component.textInput, // type of field
  //   placeHolder: "Enter Lead Id12", // placeholder to show to the user when there is no value is entered
  //   validations: validations.text, // validations for field (smme as we pass to the rule prop in 'Controller' comp from react-hook-form)
  //   isRequired: true, // whether the filed is mandatory or not
  //   data: [], // data need for the filed e.g. options for select/dropdown
  //   value: "", // current value of the filed. can be use directly to send to API
  // },
  const mock_data = [
    {
      id: "applicationType",
      label: "Applicant Type",
      type: component.textInput,
      placeHolder: "Applicant Type",
      validations: validations.text,
      isRequired: false,
      value: "",
    },
    { id: "customerProfile",
    label: "Customer Profile",
    type: component.dropdown,
    placeHolder: "Select Customer Profile",
    validations: validations.text,
    maxLength: 10,
    keyboardtype: "numeric",
    isRequired: true,
    data: [
      {
        id: "cust_type_1",
        label: "Salaried",
        value: "salaried",
      },

      {
        id: "cust_type_2",
        label: "Self-Employed",
        value: "self-employed",
      },
    ],
    value: {},},
    {
      id: "firstName",
      label: "First Name",
      type: component.textInput,
      placeHolder: "Enter first Name",
      validations: validations.text,
      isRequired: false,
      value: "",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: component.textInput,
      placeHolder: "Enter last Name",
      validations: validations.text,
      isRequired: false,
      value: "",
    },
    {
      id: "dob",
      label: "Date of Birth",
      type: component.datetime,
      placeHolder: "DD-MM-YYYY",
      validations: validations.text,
      isRequired: false,
      value: "",
      datepickerProps: {
        minimumDate: getDateYearsBack(18),
        maximumDate: getDateYearsBack(100),
      },
    },
  ];

  function getDateYearsBack(year) {
    const currentDate = moment();
    const date18YearsBack = currentDate.subtract(18, "years");
    date18YearsBack.year(year);
    return new Date(date18YearsBack.format("YYYY-MM-DD"));
  }

  const toggleModal = () => setShowModal(!showModal)
  const style = styles(colors);
  const goBack = () => props.navigation.goBack();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HelpModal toggleModal={toggleModal} showModal={showModal} setShowModal={setShowModal} />
      <View
        style={{
          paddingHorizontal: horizontalScale(15),
          marginTop: verticalScale(10),
        }}
      >
        <Header
          colour="#fff"
          title="Applicant Details"
          left={assets.back}
          right={assets.questionRound}
          leftStyle={{
            height: verticalScale(15),
            width: verticalScale(15),
          }}
          leftImageProps={{
            resizeMode: "contain",
          }}
          rightStyle={{
            height: verticalScale(25),
            width: verticalScale(25),
          }}
          rightImageProps={{
            resizeMode: "contain",
          }}
          titleStyle={{
            fontSize: verticalScale(18),
          }}
          onPressRight={toggleModal}
          onPressLeft={goBack}
        />
      </View>
      <ScrollView contentContainerStyle={style.scrollviewStyle}>
        <View style={style.container}>
          <ApplicationCard />
        </View>

        <View>
          {mock_data.map((comp) => {
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
                isMultiline={comp.isMultiline}
                maxLength={comp.maxLength}
                isDisabled={comp.isDisabled}
                onChangeText={(value) => ChangeValue(value, comp.id)}
                // showRightComp={true}
                // rightComp={() =>
                //   isVerified ? (
                //     <Text>Verify</Text>
                //   ) : (
                //     <Image
                //       source={require("../../images/tick.png")}
                //       style={styles.tickImage}
                //     />
                //   )
                // }
                // rightCompPress={() => {
                //   setIsVerified(!isVerified);
                // }}
              />
            );
          })}
        </View>
        <View style={{ paddingHorizontal: horizontalScale(30) }}>
          <Button
            type="primary"
            label="Continue"
            onPress={handleSubmit(onSubmit)}
            buttonContainer={{ marginVertical: verticalScale(20) }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
