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
import ProgressCard from "../../components/ProgressCard";
import { getLoanDetailsForm } from "../../services/ApiUtils";

const LoanDetails = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [mock_loan_details_data, setMockDetails] = useState([]);
  const formData = getLoanDetailsForm();

  const route = useRoute();
  const { loanData = {} } = route?.params || {};

  const submitLoanMutate = useSubmitLoanFormData(loanData);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      [LOAN_DETAILS_KEYS.reqLoanAmt]:
        loanData?.applicationDetails?.ReqLoanAmt__c,
      [LOAN_DETAILS_KEYS.reqTenure]:
        loanData?.applicationDetails?.ReqTenInMonths__c,
      [LOAN_DETAILS_KEYS.loanPurpose]: "",
      [LOAN_DETAILS_KEYS.mobile]: loanData?.applicationDetails?.MobNumber__c,
      [LOAN_DETAILS_KEYS.resAddr]:
        loanData?.adhaarDetails?.address?.combinedAddress,
      [LOAN_DETAILS_KEYS.currAddr]:
        loanData?.currentAddressDetails?.fullAddress,
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
    const data = watch();
    console.log("DATA here-------------", data);
    // const isValid = await trigger();
    // if (!isValid) {
    //   // toast("error", "Value is invalid");

    //   return;
    // }
    // const data = watch()
    // await AsyncStorage.setItem("LoanDetails", JSON.stringify(data));
    submitLoanMutate.mutate(data);
  };

  useEffect(() => {
    if (submitLoanMutate.data) {
      props?.navigation?.navigate(screens.Eligibility, {
        loanData: submitLoanMutate.data,
      });
    }
  }, [submitLoanMutate.data]);

  useEffect(() => {
    if (submitLoanMutate.error) {
      // log("submitLoanMutate error", submitLoanMutate.error);
      // alert(ErrorConstants.SOMETHING_WENT_WRONG);
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
