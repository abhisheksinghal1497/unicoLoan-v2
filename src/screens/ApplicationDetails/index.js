import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useTheme } from "react-native-paper";
import { validations } from "../../constants/validations";
import { screens } from "../../constants/screens";
import Header from '../../components/Header'
import { storeData, getData } from '../../utils/asyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../../components/Button";

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
    defaultValues: { mobile: 9876543210, otp: "", checkbox: false },
  });

  const { colors } = useTheme();

  const onSubmit = async (data) => {
    const values = getValues()
    props?.navigation?.navigate(screens.PanDetails)
  };


  const ChangeValue = async(value, id) => {
    setValue(id, value)
    objIndex = initialData.findIndex(obj => obj.id === id);
    initialData[objIndex].value = value
    await AsyncStorage.setItem('ApplicationDetails', JSON.stringify(initialData));
  }

  const mock_data = [
    {
      id: "applicationType",
      label: "Appliation Type",
      type: component.textInput,
      placeHolder: "Enter Appliation Type",
      value: "",
    },
    {
      id: "customerProfile",
      label: "Customer Profile",
      type: component.dropdown,
      placeHolder: "Select Customer Profile",
      validations: validations.phone,
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
      value: {},
    },
    {
      id: "firstName",
      label: "First Name",
      type: component.textInput,
      placeHolder: "Enter First Name",
      validations: validations.text,
      isRequired: true,
      value: "",

    },
    {
      id: "lastName",
      label: "Last Name",
      type: component.textInput,
      placeHolder: "Enter Last Name",
      validations: validations.text,
      isRequired: true,
      value: "",
    },
    {
      id: "dob",
      label: "Date of Birth",
      type: component.datetime,
      placeHolder: "DD-MM-YYYY",
      value: "",
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <Text>ApplicationDetails</Text> */}
      <Header
        title={'ApplicationDetails'}
        left={require('../../images/back.png')}
        onPressLeft={() => { props?.navigation?.navigate(screens.HomeScreen) }}
        onPressRight={() => { }}
        colour="white" />
      <ScrollView>
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
              // setValue={setValue}
              onChangeText={(value) => ChangeValue(value, comp.id)}
              // setValue={(value) => ChangeValue(value)}

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

        <CustomButton
          type="primary"
          label="Continue"
          buttonContainer={styles.buttonContainer}
          // buttonContainer={{}}
          onPress={() => {
            onSubmit()
            //  handleSubmit(onSubmit)
            // props?.navigation?.navigate(screens.PanDetails);
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  tickImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    // marginTop: 10,
  },
  buttonContainer: {
    // position: "absolute",
    // width: "100%",
    // bottom: 10,
    marginTop: 20,
  },
});
