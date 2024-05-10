import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState,useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useTheme } from "react-native-paper";
import { validations } from "../../constants/validations";
import { screens } from "../../constants/screens";
import Header from '../../components/Header'
import {storeData,getData}  from '../../utils/asyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ApplicationDetails(props) {

  const [dataFields, setdataFields] = useState([]);
  const [phone, setPhone] = useState('');
useEffect(() => {
  async function fetchData() {
    await AsyncStorage.setItem('CurrentScreen', JSON.stringify(screens.ApplicantDetails));
    const savedData = await AsyncStorage.getItem('ApplicationDetails');
    const currentData = JSON.parse(savedData);
    console.log(currentData?.phone,'current value');
    setPhone(currentData?.phone?.toString())
    setValue("phone",'4774746')
    setdataFields(currentData)
  }
  fetchData();
}, []);


  const [isVerified, setIsVerified] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: { mobile:  9876543210, otp: "", checkbox: false },
  });

  const { colors } = useTheme();

  const onSubmit = async(data) => {
    // alert('true')
    const values = getValues()
    console.log("njnjnjnb",values)
    await AsyncStorage.setItem('ApplicationDetails', JSON.stringify(values));
    await AsyncStorage.setItem('CurrentScreen', JSON.stringify(screens.ApplicantDetails));
    // storeData('ApplicationDetails',values)
    // storeData('CurrntScreen',screens.ApplicantDetails)
    console.log(JSON.stringify(data, null, 2))
    props?.navigation?.navigate(screens.PanDetails)
    // props?.navigation?.navigate(screens.PancardNumber)
  };

  const mock_data = [
    {
      id: "leadId",
      label: "SFDC Lead Id",
      type: component.textInput,
      placeHolder: "Enter Lead Id",
      validations: validations.text,
      isRequired: true,
      data: [],
      value: "",
    },
    {
      id: "mobile",
      label: "Mobile Number",
      type: component.number,
      placeHolder: "Enter Mobile number",
      validations: validations.phone,
      maxLength: 10,
      keyboardtype: "numeric",
      isRequired: true,
      data: [],
      value: 0,
      isDisabled: true,
    },
    {
      id: "phone",
      label: "Phone Number",
      type: component.number,
      placeHolder: "Enter Phone number",
      validations: validations.phone,
      maxLength: 10,
      keyboardtype: "numeric",
      isRequired: true,
      data: [],
      value: phone
      ,
      // isDisabled: true,
    },
    {
      id: "leadSrc",
      label: "Lead Source",
      type: component.dropdown,
      placeHolder: "Select lead source",
      validations: validations.required,
      isRequired: true,
      data: [
        { id: 1, label: "Digital", value: "digital" },
        { id: 2, label: "Direct", value: "direct" },
        { id: 3, label: "Cutomer", value: "cutomer" },
        { id: 4, label: "Referral", value: "referral" },
      ],
      value: {},
    },
    {
      id: "addr",
      label: "Address",
      type: component.textInput,
      placeHolder: "Enter the Address",
      value: "",
      isMultiline: true,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <Text>ApplicationDetails</Text> */}
      <Header
                    title={'ApplicationDetails'}
                    left={require('../../images/back.png')}
                    onPressLeft={() => {props?.navigation?.navigate(screens.HomeScreen)  }}
                    onPressRight={() => { }}
                    colour="white" />
      <ScrollView>
        {/* <FormControl
      compType={component.textInput}
      control={control}
      validations={validations.text}
      name="leadId"
      label="SFDC Lead Id"
      errors={errors.leadId}
      isRequired
      placeholder="Enter Lead Id"
      // style={{}}
    />

    <FormControl
      compType={component.number}
      control={control}
      validations={validations.phone}
      name="phone"
      label="Phone No."
      errors={errors.phone}
      isRequired
      placeholder="Enter your phone no."
    />

    <FormControl
      compType={component.dropdown}
      control={control}
      validations={validations.required}
      name="leadSrc"
      label="Lead Source"
      errors={errors.leadSrc}
      isRequired
      placeholder="Please select Lead Source"
      // style={{}}
    /> */}

        <FormControl
          compType={component.otpInput}
          control={control}
          validations={validations.text}
          name="otp"
          label="Enter otp"
          errors={errors.leadId}
          isRequired
        // placeholder="Enter Lead Id"
        // style={{}}
        />

        {/* <FormControl
          compType={component.checkbox}
          control={control}
          validations={validations.text}
          name="checkbox"
          label="Checkbox here"
          errors={errors.leadId}
          isRequired
        // placeholder="Enter Lead Id"
        // style={{}}
        /> */}

        <FormControl
          compType={component.datetime}
          control={control}
          validations={validations.text}
          name="checkbox"
          label="Checkbox here"
          errors={errors.leadId}
          isRequired
        // placeholder="Enter Lead Id"
        // style={{}}
        />

        {/* <FormControl
          compType={component.number}
          control={control}
          validations={validations.phone}
          name="phone"
          label="Phone No."
          errors={errors.phone}
          isRequired
          placeholder="Enter your phone no."
          showRightComp
          iconName="eye-off"
          value={phone}
        /> */}

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
              // value={value}
              showRightComp={true}
              rightComp={() =>
                isVerified ? (
                  <Text>Verify</Text>
                ) : (
                  <Image
                    source={require("../../images/tick.png")}
                    style={styles.tickImage}
                  />
                )
              }
              rightCompPress={() => {
                setIsVerified(!isVerified);
              }}
              isMultiline={comp.isMultiline}
              maxLength={comp.maxLength}
              isDisabled={comp.isDisabled}
            />
          );
        })}

        {/* // ! temporary submit button */}
        <Button title="Submit" onPress={()=>{
          onSubmit()
         handleSubmit(onSubmit)
          // props?.navigation?.navigate(screens.PanDetails)
        }
          
          } />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tickImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    // marginTop: 10,
  },
});
