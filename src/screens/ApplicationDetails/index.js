import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useTheme } from "react-native-paper";
import { validations } from "../../constants/validations";
import { screens } from "../../constants/screens";
import CustomButton from "../../components/Button";

export default function ApplicationDetails(props) {
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

  const onSubmit = (data) => {
    console.log("njnjnjnb");
    console.log(JSON.stringify(data, null, 2));
    props?.navigation?.navigate(screens.PancardNumber);
  };

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
    // {
    //   id: "phone",
    //   label: "Phone Number",
    //   type: component.number,
    //   placeHolder: "Enter Phone number",
    //   validations: validations.phone,
    //   maxLength: 10,
    //   keyboardtype: "numeric",
    //   isRequired: true,
    //   data: [],
    //   value: 0,
    //   // isDisabled: true,
    // },
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
      <Text>ApplicationDetails</Text>
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
              setValue={setValue}
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
            //  handleSubmit(onSubmit)
            props?.navigation?.navigate(screens.PanDetails);
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
