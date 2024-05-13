import { Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
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

export default function ApplicationDetails(props) {
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(true);
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

  const onSubmit = (data) => {
    console.log("njnjnjnb");
    console.log(JSON.stringify(data, null, 2));
    props?.navigation?.navigate(screens.PancardNumber);
  };

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
    {
      id: "customerProfile",
      label: "Customer Profile",
      type: component.dropdown,
      placeHolder: "Customer Profile",
      validations: validations.text,
      isRequired: true,
      data: [
        { id: 1, label: "Salaried", value: "Salaried" },
        { id: 2, label: "Self-Employed", value: "Self-Employed" },
      ],
      value: "",
    },
    {
      id: "firstName",
      label: "First Name",
      type: component.textInput,
      placeHolder: "First Name",
      validations: validations.text,
      isRequired: false,
      value: "",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: component.textInput,
      placeHolder: "Last Name",
      validations: validations.text,
      isRequired: false,
      value: "",
    },
    {
      id: "dateOfBirth",
      label: "Date of Birth",
      type: component.datetime,
      placeHolder: "Select date of birth",
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
