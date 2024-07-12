import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
import { assets } from "../../assets/assets";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import {
  HeaderTexts,
  LOAN_DETAILS_KEYS,
} from "../../constants/stringConstants";
import ApplicationCard from "../ApplicationDetails/component/ApplicationCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HelpModal from "../ApplicationDetails/component/HelpModal";
import { useRoute } from "@react-navigation/native";
import { useSubmitLoanFormData } from "../../services/ApiUtils";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";

const LoanDetails = (props) => {
  const [showModal, setShowModal] = useState(false);
  const submitLoanMutate = useSubmitLoanFormData();
  const route = useRoute();
  const { applicationDetails = {}, panDetails = {} } = route?.params || {};

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    clearErrors,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    await AsyncStorage.setItem("LoanDetails", JSON.stringify(data));
    submitLoanMutate.mutate(data);
  };

  useEffect(() => {
    if (submitLoanMutate.data) {
      props?.navigation?.navigate(screens.Eligibility, {
        applicationDetails,
        panDetails,
        loanDetail: submitLoanMutate.data
      });
    }
  }, [submitLoanMutate.data]);

  useEffect(() => {
    if (submitLoanMutate.error) {
      log('submitLoanMutate error', submitLoanMutate.error);
      alert(ErrorConstants.SOMETHING_WENT_WRONG)
    }
  }, [submitLoanMutate.error]);

  const bankBalance = watch(LOAN_DETAILS_KEYS.bankBalance);
  const currPF = watch(LOAN_DETAILS_KEYS.currPF);
  const valShareSecr = watch(LOAN_DETAILS_KEYS.valShareSecr);
  const fd = watch(LOAN_DETAILS_KEYS.fd);
  const invPlantMachVehi = watch(LOAN_DETAILS_KEYS.invPlantMachVehi);
  const ownContri = watch(LOAN_DETAILS_KEYS.ownContri);
  const assetVal = watch(LOAN_DETAILS_KEYS.assetVal);
  const immovableProperty = watch(LOAN_DETAILS_KEYS.immovableProperty);

  const calcTotalAssetCost = () => {
    try {
      const getIntVal = (val) => {
        return !val || Number.isNaN(val) ? 0 : Number(val);
      };

      const totalAssets =
        getIntVal(bankBalance) +
        getIntVal(currPF) +
        getIntVal(valShareSecr) +
        getIntVal(fd) +
        getIntVal(invPlantMachVehi) +
        getIntVal(ownContri) +
        getIntVal(assetVal) +
        getIntVal(immovableProperty);

      setTimeout(() => {
        setValue(
          LOAN_DETAILS_KEYS.totalAsset,
          Number.isNaN(totalAssets) ? 0 : totalAssets
        );
      }, 10);
    } catch (err) {
      console.log("Error while calculating TotalAsset value");
    }
  };

  useEffect(() => {
    calcTotalAssetCost();
  }, [
    bankBalance,
    currPF,
    valShareSecr,
    fd,
    invPlantMachVehi,
    ownContri,
    assetVal,
  ]);

  calcTotalAssetCost();

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(
        "CurrentScreen",
        JSON.stringify(screens.LoanDetails)
      );
      const savedData = await AsyncStorage.getItem("LoanDetails");
      const currentData = JSON.parse(savedData);

      if (currentData) {
        //! showLoader
        // console.log(currentData, "current value");

        for (const key in currentData) {
          setValue(key, currentData[key]);
          // console.log(`${key}: ${_data[key]} | ${typeof _data[key]}`);
        }

        //! hide Loader
      }
    })();
  }, []);

  const mock_loan_details_data = [
    {
      id: LOAN_DETAILS_KEYS.reqLoanAmt,
      label: "Requested Loan Amount ",
      type: component.number,
      placeHolder: "Enter Requested Loan Amount ",
      validations: {
        ...validations.required,
        max: 90000000,
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
      value: 9876543210,
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
      id: LOAN_DETAILS_KEYS.immovableProperty,
      label: "Immovable Property",
      type: component.number,
      placeHolder: "Enter value of immovable property",
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

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleRightIconPress = (index) => {
    if (index === 0) {
      props.navigation.navigate(screens.FAQ);
    } else if (index === 1) {
      toggleModal();
    }
  };
  return (
    <View style={styles.container}>
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
          props?.navigation.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.applCard}>
          <ApplicationCard />
        </View>
        {submitLoanMutate?.isPending && <ActivityIndicatorComponent />}
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
              // clearErrors={clearErrors(comp.id)}
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

      <HelpModal
        toggleModal={toggleModal}
        showModal={showModal}
        setShowModal={setShowModal}
        modalStyle={styles.modalStyle}
      />
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
  applCard: {
    flex: 1,
    padding: 15,
  },
  backImg: {
    height: 30,
    borderWidth: 1,
    marginRight: 8,
  },
  headerTitle: {
    ...customTheme.fonts.titleMedium,
    fontWeight: "700",
  },
  modalStyle: { margin: 15, padding: 25 },
});
