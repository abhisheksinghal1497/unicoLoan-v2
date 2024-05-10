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
import { useTheme, Text } from "react-native-paper";
import { validations } from "../../constants/validations";
import { screens } from "../../constants/screens";

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
    console.log("njnjnjnb")
    console.log(JSON.stringify(data, null, 2))
    props?.navigation?.navigate(screens.PancardNumber)
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
      value: 0,
      // isDisabled: true,
    },
    {
      id: "leadSrc",
      label: "Lead Source",
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
      <Text>ApplicationDetails</Text>
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

        <FormControl
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
        />

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

        {/* // ! temporary submit button */}
        <Button title="Submit" onPress={()=>{
        //  handleSubmit(onSubmit)
          props?.navigation?.navigate(screens.PanDetails)
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
