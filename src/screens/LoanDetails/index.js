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
import { screens } from "../../constants/screens";
import { LOAN_DETAILS_KEYS } from "../../constants/stringConstants";

const LoanDetails = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // [LOAN_DETAILS_KEYS.bankBalance]: 0,
      // [LOAN_DETAILS_KEYS.currPF]: 0,
      // [LOAN_DETAILS_KEYS.valShareSecr]: 0,
      // [LOAN_DETAILS_KEYS.fd]: 0,
      // [LOAN_DETAILS_KEYS.invPlantMachVehi]: 0,
      // [LOAN_DETAILS_KEYS.ownContri]: 0,
      // [LOAN_DETAILS_KEYS.assetVal]: 0,
    },
  });

  const onSubmit = (data) => {
    // console.log("njnjnjnb");
    console.log(JSON.stringify(data, null, 2));
    props?.navigation?.navigate(screens.Eligibility);
  };

  const getIntVal = (val) => {
    return !val || Number.isNaN(val) ? 0 : Number(val);
  };

  // const firstName = useWatch('FirstName');
  const bankBalance = watch(LOAN_DETAILS_KEYS.bankBalance);
  const currPF = watch(LOAN_DETAILS_KEYS.currPF);
  const valShareSecr = watch(LOAN_DETAILS_KEYS.valShareSecr);
  const fd = watch(LOAN_DETAILS_KEYS.fd);
  const invPlantMachVehi = watch(LOAN_DETAILS_KEYS.invPlantMachVehi);
  const ownContri = watch(LOAN_DETAILS_KEYS.ownContri);
  const assetVal = watch(LOAN_DETAILS_KEYS.assetVal);
  const totalAssets =
    getIntVal(bankBalance) +
    getIntVal(currPF) +
    getIntVal(valShareSecr) +
    getIntVal(fd) +
    getIntVal(invPlantMachVehi) +
    getIntVal(ownContri) +
    getIntVal(assetVal);

  console.log(ownContri);
  console.log(assetVal);
  console.log(totalAssets);

  setValue(
    LOAN_DETAILS_KEYS.totalAsset,
    Number.isNaN(totalAssets) ? 0 : totalAssets
  );

  const mock_loan_details_data = [
    {
      id: LOAN_DETAILS_KEYS.reqLoanAmt,
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
      id: LOAN_DETAILS_KEYS.reqTenure,
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
      id: LOAN_DETAILS_KEYS.loanPurpose,
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
      id: LOAN_DETAILS_KEYS.mobile,
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
      id: LOAN_DETAILS_KEYS.isExistingCustomer,
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
      id: LOAN_DETAILS_KEYS.custId,
      label: "Customer ID",
      type: component.number,
      placeHolder: "Enter Customer ID",
      value: 0,
      keyboardtype: "numeric",
      validations: validations.numberOnly,
    },
    {
      id: LOAN_DETAILS_KEYS.bankBalance,
      label: "Bank Balance",
      type: component.number,
      placeHolder: "Enter Bank Balance",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.currPF,
      label: "Current balance in Pf",
      type: component.number,
      placeHolder: "Enter Current balance in Pf",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.valShareSecr,
      label: "Value of shares and securities",
      type: component.number,
      placeHolder: "Enter Value of shares and securities",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.fd,
      label: "Fixed Deposits",
      type: component.number,
      placeHolder: "Enter Fixed Deposits",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.invPlantMachVehi,
      label: "Investment in Plants /Machinery/Vehicles",
      type: component.number,
      placeHolder: "Enter Investment in Plants /Machinery/Vehicles",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.ownContri,
      label: "Own Contribution",
      type: component.number,
      placeHolder: "Enter Own Contribution",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.assetVal,
      label: "Other Asst Value",
      type: component.number,
      placeHolder: "Enter Other Asst Value",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.totalAsset,
      label: "Total Assets",
      type: component.number,
      placeHolder: "Enter Total Assets",
      value: 0,
      keyboardtype: "numeric",
      // isRequired: true,
      // validations: { ...validations.numberOnly, ...validations.required },
      isDisabled: true,
    },
    {
      id: LOAN_DETAILS_KEYS.amtConstructPurchase,
      label: "Amount spent for Construction/Purchase",
      type: component.number,
      placeHolder: "Enter Amount spent for Construction/Purchase",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.savings,
      label: "Savings",
      type: component.number,
      placeHolder: "Enter Savings",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.dispAsset,
      label: "Disposal of Asset",
      type: component.number,
      placeHolder: "Enter Disposal of Asset",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.familyFund,
      label: "Fund from Family",
      type: component.number,
      placeHolder: "Enter Fund from Family",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.srvcFund,
      label: "Fund from other services",
      type: component.number,
      placeHolder: "Enter Fund from other services",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.totalIncome,
      label: "Total Income",
      type: component.number,
      placeHolder: "Enter Total Income",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.totalObligation,
      label: "Total Obligation",
      type: component.number,
      placeHolder: "Enter Total Obligation",
      value: 0,
      keyboardtype: "numeric",
      isRequired: true,
      validations: { ...validations.numberOnly, ...validations.required },
    },
    {
      id: LOAN_DETAILS_KEYS.resAddr,
      label: "Residential Address",
      type: component.textInput,
      placeHolder: "Enter Residential Address",
      value: "",
      isMultiline: true,
    },
    {
      id: LOAN_DETAILS_KEYS.currAddr,
      label: "Current Address",
      type: component.textInput,
      placeHolder: "Enter Current Address",
      value: "",
      isMultiline: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title={"Loan Details " + isValid}
        left={require("../../images/back.png")}
        onPressLeft={() => {
          props?.navigation.goBack();
        }}
        right={require("../../images/question.png")}
        onPressRight={() => {}}
        colour="transparent"
      />

      {/* <Text> Is Wrong => {!isObjEmpty(errors) ? "true" : "false"}</Text>
      <Text>isValid: {JSON.stringify(isValid, null, 2)}</Text>
    <Text>{JSON.stringify(errors, null, 2)}</Text> */}

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
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
          onPress={handleSubmit(onSubmit)}
          disable={!isValid}
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
