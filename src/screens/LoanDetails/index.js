import { ScrollView, StyleSheet, Text, ToastAndroid, View } from "react-native";
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
import ProgressCard from "../../components/ProgressCard";
import { getLoanDetailsForm } from "../../services/ApiUtils";
import Toast from "react-native-toast-message";
import { toast, useResetRoutes } from "../../utils/functions";

//

const LoanDetails = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [mock_loan_details_data, setMockDetails] = useState([]);
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const resetRoute = useResetRoutes();
  const { applicationDetails = {}, loanDetails = {} } = loanData;

  let applicantRecord = applicationDetails?.Applicants__r?.records?.filter(
    (el) => el.ApplType__c === "P"
  )[0];

  const formData = getLoanDetailsForm(applicationDetails?.Product__c, applicationDetails.Customer_Profile__c);
  const submitLoanMutate = useSubmitLoanFormData(loanData);
  const {
    control,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // LOAN DATA - DONE
      [LOAN_DETAILS_KEYS.resAddr]:
        loanData?.adhaarDetails?.address?.combinedAddress,
      [LOAN_DETAILS_KEYS.currAddr]:
        loanData?.currentAddressDetails?.FullAdrs__c,
      // LOAN DATA ENDS

      // applicationDetails --DONE
      [LOAN_DETAILS_KEYS.reqLoanAmt]: applicationDetails?.ReqLoanAmt__c,
      [LOAN_DETAILS_KEYS.reqTenure]: applicationDetails?.ReqTenInMonths__c,
      [LOAN_DETAILS_KEYS.loanPurpose]: applicationDetails?.LoanPurpose__c,
      
      // applicationDetails

      // applicantRecord --DONE
      [LOAN_DETAILS_KEYS.mobile]: applicantRecord?.MobNumber__c,
      [LOAN_DETAILS_KEYS.isExistingCustomer]:
        applicantRecord?.ExistingCustomer__c,
      [LOAN_DETAILS_KEYS.totalIncome]: applicantRecord?.Annual_Turnover__c,
      [LOAN_DETAILS_KEYS.custId]: applicantRecord?.Customer__c,
      [LOAN_DETAILS_KEYS.customerSegment]: applicantRecord?.Customer_Segment__c,
      // applicantRecord

      // loanDetails
      [LOAN_DETAILS_KEYS.bankBalance]: loanDetails?.Bankbalance__c,
      [LOAN_DETAILS_KEYS.immovableProperty]:
        loanDetails?.ImmovablePropertyValue__c,
      [LOAN_DETAILS_KEYS.currPF]: loanDetails?.CurrentPfBalance__c,
      [LOAN_DETAILS_KEYS.valShareSecr]:
        loanDetails?.SharesAndSecurityBalance__c,
      [LOAN_DETAILS_KEYS.fd]: loanDetails?.FixedDeposits__c,
      [LOAN_DETAILS_KEYS.invPlantMachVehi]:
        loanDetails?.InvestmentInPlants_Machinery_Vehicles__c,
      [LOAN_DETAILS_KEYS.ownContri]: loanDetails?.OwnContributions__c,
      [LOAN_DETAILS_KEYS.assetVal]: loanDetails?.OthersAssetsValue__c,
      [LOAN_DETAILS_KEYS.totalAsset]: loanDetails?.TotalAssets__c,
      [LOAN_DETAILS_KEYS.amtConstructPurchase]:
        loanDetails?.AmountSpentForConstruction_Purchase__c,
      [LOAN_DETAILS_KEYS.savings]: loanDetails?.Savings__c,
      [LOAN_DETAILS_KEYS.dispAsset]: loanDetails?.DisposalOfAsset__c,
      [LOAN_DETAILS_KEYS.familyFund]: loanDetails?.FundFromFamily__c,
      [LOAN_DETAILS_KEYS.srvcFund]: loanDetails?.FundFromOtherServices__c,
      // loanDetails
    },
  });
  const [showHelpModal, setShowHelpModal] = useState(false);

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  useEffect(() => {
    formData?.mutate();
  }, []);

  useEffect(() => {
    if (formData.data) {
      setMockDetails(formData.data);
    }
  }, [formData.data]);

  useEffect(() => {
    if (formData.error) {
      alert(formData.error);
    }
  }, [formData.error]);

  const onSubmit = async () => {
    try {
      const data = watch();
      const isValid = await trigger();
      if(!isValid){
        Toast.show({type:'error', text1: 'Please check all the fields'})
        return
      }
      console.log('COMING HERE------------------------', isValid)
      const {applicantIncomeId, applicationAssetId} =  await submitLoanMutate.mutateAsync(data);

      let applicantRecordsArr = [...applicationDetails?.Applicants__r?.records];
      console.log(applicantRecordsArr.length)
      let updatedApplicantRecordIndex = applicantRecordsArr?.findIndex(
        (el) => el.ApplType__c === "P"
      );
      let updatedApplicantRecord;

      if (
        updatedApplicantRecordIndex !== -1 &&
        typeof updatedApplicantRecordIndex !== "undefined"
      ) {
        updatedApplicantRecord = {
          ...applicantRecordsArr[updatedApplicantRecordIndex],
          MobNumber__c: data[LOAN_DETAILS_KEYS.mobile],
          ExistingCustomer__c: data[LOAN_DETAILS_KEYS.isExistingCustomer],
          Annual_Turnover__c: data[LOAN_DETAILS_KEYS.totalIncome],
          Customer__c: data[LOAN_DETAILS_KEYS.custId],
          Customer_Segment__c: data[LOAN_DETAILS_KEYS.customerSegment],
        };
        applicantRecordsArr[updatedApplicantRecordIndex] = {
          ...updatedApplicantRecord,
        };
      }

      let loanDetails = loanData?.loanDetails ? loanData?.loanDetails : {}

      const updatedLoanData = {
        ...loanData,
        applicantIncomeId: applicantIncomeId,
        applicationDetails: {
          ...loanData?.applicationDetails,
          ReqLoanAmt__c: data[LOAN_DETAILS_KEYS.reqLoanAmt],
          ReqTenInMonths__c: data[LOAN_DETAILS_KEYS.reqTenure],
          LoanPurpose__c: data[LOAN_DETAILS_KEYS.loanPurpose],

          Applicants__r: {
            ...loanData?.applicationDetails.Applicants__r,
            records: applicantRecordsArr,
          },
        },

        loanDetails: {
          ...loanDetails,
          Id: applicationAssetId,
          Bankbalance__c: data[LOAN_DETAILS_KEYS.bankBalance],
          ImmovablePropertyValue__c: data[LOAN_DETAILS_KEYS.immovableProperty],
          CurrentPfBalance__c: data[LOAN_DETAILS_KEYS.currPF],
          SharesAndSecurityBalance__c: data[LOAN_DETAILS_KEYS.valShareSecr],
          FixedDeposits__c: data[LOAN_DETAILS_KEYS.fd],
          InvestmentInPlants_Machinery_Vehicles__c:
            data[LOAN_DETAILS_KEYS.invPlantMachVehi],
          OwnContributions__c: data[LOAN_DETAILS_KEYS.ownContri],
          OthersAssetsValue__c: data[LOAN_DETAILS_KEYS.assetVal],
          TotalAssets__c: data[LOAN_DETAILS_KEYS.totalAsset],
          AmountSpentForConstruction_Purchase__c:
            data[LOAN_DETAILS_KEYS.amtConstructPurchase],
          Savings__c: data[LOAN_DETAILS_KEYS.savings],
          DisposalOfAsset__c: data[LOAN_DETAILS_KEYS.dispAsset],
          FundFromFamily__c: data[LOAN_DETAILS_KEYS.familyFund],
          FundFromOtherServices__c: data[LOAN_DETAILS_KEYS.srvcFund],
        },
      };

      
      props?.navigation?.navigate(screens.Eligibility, {
        loanData: updatedLoanData,
        Annual_Turnover__c: data[LOAN_DETAILS_KEYS.totalIncome]
      });
    } catch (error) {
      console.log("SOME ERROR OCCURED", error);
      alert("Something went wrong. Please try again later.")
     }
  };


  const bankBalance = watch(LOAN_DETAILS_KEYS.bankBalance);
  const currPF = watch(LOAN_DETAILS_KEYS.currPF);
  const valShareSecr = watch(LOAN_DETAILS_KEYS.valShareSecr);
  const fd = watch(LOAN_DETAILS_KEYS.fd);
  const invPlantMachVehi = watch(LOAN_DETAILS_KEYS.invPlantMachVehi);
  const ownContri = watch(LOAN_DETAILS_KEYS.ownContri);
  const assetVal = watch(LOAN_DETAILS_KEYS.assetVal);
  const immovableProperty = watch(LOAN_DETAILS_KEYS.immovableProperty);
  const isExistingCustomer = watch(LOAN_DETAILS_KEYS.isExistingCustomer) === 'YES';

  useEffect(() => {
    if(!isExistingCustomer){
      setValue(LOAN_DETAILS_KEYS.custId, '');
    }
  },[isExistingCustomer]);

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
        for (const key in currentData) {
          setValue(key, currentData[key]);
        }
      }
    })();
  }, []);

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
          resetRoute(screens.HomeScreen);
        }}
        showHelpModal={showHelpModal}
        toggleHelpModal={toggleHelpModal}
      />
      <ActivityIndicatorComponent
        visible={formData?.isPending || submitLoanMutate?.isPending}
      />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.applCard}>
          <ProgressCard screenName={screens.LoanDetails} />
        </View>

        {mock_loan_details_data.map((comp) => {
          if(comp.id === LOAN_DETAILS_KEYS.custId && !isExistingCustomer){
            return <></>
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
          onPress={onSubmit}
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
