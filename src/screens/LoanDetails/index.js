import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import customTheme from "../../colors/theme";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { validations } from "../../constants/validations";
import CustomButton from "../../components/Button";

const LoanDetails = (props) => {
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

  const mock_loan_details_data = [
    {
      id: "reqLoanAmt",
      label: "Requested Loan Amount ",
      type: component.number,
      placeHolder: "Enter Requested Loan Amount ",
      validations: {
        ...validations.required,
        max: 1000000,
        min: 50000,
      },
      //   maxLength: 10,
      keyboardtype: "numeric",
      isRequired: true,
      value: 0,
      // isDisabled: true,
    },
    {
      id: "reqTenure",
      label: "Requested Tenure in Months",
      type: component.number,
      placeHolder: "Enter Requested Tenure in Months ",
      validations: {
        ...validations.required,
        max: 240,
        min: 6,
      },
      //   maxLength: 10,
      keyboardtype: "numeric",
      isRequired: true,
      value: 0,
      // isDisabled: true,
    },
    {
      id: "leadSource",
      label: "Loan Purpose",
      type: component.dropdown,
      placeHolder: "Select Loan Purpose",
      isRequired: true,
      validations: {
        ...validations.required,
      },
      data: [
        {
          id: "loanPurpose-1",
          label: "Loan Purpose 1",
          value: "loan-purpose-1",
        },
        {
          id: "loanPurpose-2",
          label: "Loan Purpose 2",
          value: "loan-purpose-2",
        },
      ],
      value: {},
    },
    {
      id: "mobile",
      label: "Mobile Number",
      type: component.number,
      placeHolder: "Enter Mobile Number",
      maxLength: 10,
      keyboardtype: "numeric",
      isRequired: true,
      validations: validations.phone,
      value: 0,
      // isDisabled: true,
    },
    {
      id: "isExistingCustomer",
      label: "Existing Customer",
      type: component.dropdown,
      placeHolder: "Select Existing Customer",
      isRequired: true,
      validations: {
        ...validations.required,
      },
      data: [
        {
          id: "existCustomer-y",
          label: "Yes",
          value: "yes",
        },
        {
          id: "existCustomer-n",
          label: "No",
          value: "no",
        },
      ],
      value: {},
    },

    {
      id: "custId",
      label: "Customer ID",
      type: component.number,
      placeHolder: "Enter Customer ID",
      value: 0,
      keyboardtype: "numeric",
      validations: validations.numberOnly,
    },
    {
      id: "banlBalance",
      label: "Bank Balance",
      type: component.number,
      placeHolder: "Enter Bank Balance",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: "currPF",
      label: "Current balance in Pf",
      type: component.number,
      placeHolder: "Enter Current balance in Pf",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: "valShareSecr",
      label: "Value of shares and securities",
      type: component.number,
      placeHolder: "Enter Value of shares and securities",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: "fd",
      label: "Fixed Deposits",
      type: component.number,
      placeHolder: "Enter Fixed Deposits",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: "invPlantMachVehi",
      label: "Investment in Plants /Machinery/Vehicles",
      type: component.number,
      placeHolder: "Enter Investment in Plants /Machinery/Vehicles",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },

    // ==================================
    // ==================================

    {
      id: "leadId",
      label: "SFDC Lead Id",
      type: component.textInput,
      placeHolder: "Enter SFDC Lead Id",
      value: "",
    },

    {
      id: "leadSource",
      label: "Lead Source",
      type: component.dropdown,
      placeHolder: "Select Lead Source",
      //   isRequired: true,
      data: [
        {
          id: "leadSource-1",
          label: "Digital",
          value: "digital",
        },
        {
          id: "leadSource-2",
          label: "Direct",
          value: "direct",
        },
        {
          id: "leadSource-3",
          label: "Cutomer sa",
          value: "cutomer-sa",
        },
        {
          id: "leadSource_4",
          label: "Referral",
          value: "referral",
        },
      ],
      value: {},
    },
    {
      id: "branchCode",
      label: "Branch Code",
      type: component.dropdown,
      placeHolder: "Select Branch Code",
      //   isRequired: true,
      data: [
        {
          id: "branchCode-1",
          label: "HDFC1234",
          value: "HDFC1234",
        },
        {
          id: "branchCode-2",
          label: "HDFC5678",
          value: "HDFC5678",
        },
      ],
      value: {},
    },
    {
      id: "branchName",
      label: "Branch Name",
      type: component.dropdown,
      placeHolder: "Select Branch Name",
      //   isRequired: true,
      data: [
        {
          id: "branchName-1",
          label: "HDFC",
          value: "HDFC",
        },
        {
          id: "branchName-2",
          label: "HDFC2",
          value: "HDFC 2",
        },
      ],
      value: {},
    },
  ];
  return (
    <View style={styles.container}>
      <Header
        title="Loan Details"
        left={require("../../images/back.png")}
        onPressLeft={() => {
          props?.navigation.goBack();
        }}
        right={require("../../images/question.png")}
        onPressRight={() => {}}
        colour="transparent"
      />

      <ScrollView>
        {mock_loan_details_data.map((comp) => {
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
};

export default LoanDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  buttonContainer: {
    marginTop: 40,
  },
});
