import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Button";
import Card from "../../components/Card";
import { Text } from "react-native-paper";
import customTheme from "../../colors/theme";
import { assets } from "../../assets/assets";
import { screens } from "../../constants/screens";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import Header from "../../components/Header";
import { getBureauBre, getEligibilityDetails } from "../../services/ApiUtils";
import { useRoute } from "@react-navigation/native";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import CoApplicant from "../CoApplicant";
import { useResetRoutes } from "../../utils/functions";
import { assignBranchManagerMutation } from "../../services/ApiUtils";
import { toast } from "../../utils/functions";
const Eligibility = (props) => {

  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const { applicationDetails = {}, loanDetails = {}, loanId, Annual_Turnover__c } = loanData;
  console.log("mainApplicant ampunt", loanDetails)
  const [loading, setIsLoading] = useState(false);
  const resetRoute = useResetRoutes();
  const eligibilityDetails = getEligibilityDetails(loanData);
  const breData = getBureauBre(loanData);
  const assignBranchManger = assignBranchManagerMutation(loanId)
  const [retryClick, setRetryClick] = useState(0)
  const [coApplicantsArr, setCoApplicantsArr] = useState(
    Array.isArray(applicationDetails?.Applicants__r?.records)
      ? applicationDetails?.Applicants__r?.records.filter(
        (el) => el.ApplType__c === "C"
      )
      : []
  );
  const [showHelpModal, setShowHelpModal] = useState(false);


  var mainApplicantIncome = 0

  const [isBreError, setBreError] = useState(false)




  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };
  const handleRightIconPress = (index) => {
    if (index === 0) {
      props.navigation.navigate(screens.FAQ);
    } else if (index === 1) {
      toggleHelpModal();
    }
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: "",
    mode: "all",
  });

  useEffect(() => {
    setBreError(false)
    eligibilityDetails.mutate({ applicationDetails, loanDetails });
  }, []);

  useEffect(() => {
    if (eligibilityDetails.data && eligibilityDetails.data.message) {
      setIsLoading(true);
      // wait for 10 seconds
      setTimeout(() => {

        breData.mutate(eligibilityDetails.data.message);
        setIsLoading(false);
      }, 10000);
    }
  }, [eligibilityDetails.data]);


  useEffect(() => {
    if (assignBranchManger.data) {
      toast("success", "This loan Application is assigned successfully to the Unico Branch");
      onPressContinue();
    }
  }, [assignBranchManger.data])

  useEffect(() => {
    if (assignBranchManger.error) {
      alert("Something went wrong. Please try again later")
    }
  }, [assignBranchManger.error])

  useEffect(() => {
    if (breData.data) {
      if (!breData?.data?.success) {
        setBreError(true)
      }
    }
  }, [breData.data]);

  useEffect(() => {
    if (breData.error) {
      setBreError(true)
    }
  }, [breData.error]);

  useEffect(() => {
    if (eligibilityDetails.error) {
      //alert("Something went wrong. Please try again later.");
      setBreError(true)
    }
  }, [eligibilityDetails.error]);

  const onPressContinue = () => {
    if (!eligibilityDetails?.isPending) {
      if (retryClick < 1) {
        props.navigation.navigate(screens.Sanction, {
          loanData: {
            ...loanData,
            eligibilityDetails: breData?.data?.data
          },
        });
      }else{
        resetRoute(screens.HomeScreen)
      }
    }
  };

  function formatNumber(value) {
    if (!value) {
      return "0 lac";
    }
    const num = typeof value === "string" ? parseInt(value) : value;
    if (num === 0) {
      return "0 lac";
    }
    if (num < 10000000) {
      return Math.floor(num / 100000).toFixed(2) + " lac"; // Return in lakhs
    } else {
      return Math.floor(num / 10000000).toFixed(2) + " cr"; // Return in crores
    }
  }

  const cardData = useMemo(() => {
    const {
      businessVintage,
      cibilScore,
      customerSegment,
      dpdStatus,
      eligibilityStatus,
      eligibleLoanAmount,
      employmentStability,
      netAssetCreationValue,
      numberOfDependents,
      numberOfEnquiries,
      product,
      qualification,
      requestedLoanAmount,
      residentialStability,
      subProduct,
      totalScore,
    } = breData?.data?.data || {};

    if (applicationDetails.Customer_Profile__c === "Self-Employed") {
      return {
        "Customer Segment": customerSegment,
        "Product": product,
        "Sub Product": subProduct,
        "Request Loan Amount": requestedLoanAmount,
        "Residential Stability": residentialStability,
        "Cibil Score": cibilScore,
        "DPD Status": dpdStatus,
        "Number of Enquiries in the last 6 months": numberOfEnquiries,
        "Business Vintage": businessVintage,
        "Net Asset Create Value": netAssetCreationValue,
        "Total Score": totalScore,
        "Eligible Status": eligibilityStatus,
        "Eligible Loan Amount": eligibleLoanAmount,
      }

    } else {
      return {
        "Customer Segment": customerSegment,
        "Product": product,
        "Sub Product": subProduct,
        "Request Loan Amount": requestedLoanAmount,
        "Number of Dependents": numberOfDependents,
        "Residential Stability": residentialStability,
        "Cibil Score": cibilScore,
        "DPD Status": dpdStatus,

        "Number of Enquiries in the last 6 months": numberOfEnquiries,
        "Employment Stability": employmentStability,
        "Qualification": qualification,
        "Eligible Status": eligibilityStatus,
        "Eligible Loan Amount": eligibleLoanAmount,



      }
      //       Parameter: 1,
    };
  }, [breData?.data, applicationDetails, loanDetails]);

  const isEligible = cardData && cardData["Eligible Status"] === "Eligible";
  const isBreSuccess = breData?.data?.success;

  const retryBre = () => {
    setBreError(false)
    eligibilityDetails.mutate({ applicationDetails, loanDetails });
  };

  const BreRetryUi = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: verticalScale(18),
              fontWeight: "bold",
              textTransform: "uppercase",
              marginBottom: verticalScale(10),
            }}
          >
            Not able to process
          </Text>
          <CustomButton
            buttonContainer={{
              paddingHorizontal: horizontalScale(50),
              paddingVertical: verticalScale(6),
            }}
            type="primary"
            label="Retry"
            onPress={() => {
              setRetryClick(1)

              if (retryClick < 1) {
                retryBre()
              } else {
                assignBranchManger?.mutate()
              }
            }}
          />
        </View>
      </View>
    );
  };

  const ShowEligibleDetails = () => {
    return (
      <View style={styles.topCon}>
        {cardData && (
          <Card cardStyle={styles.cardCon}>
            <ImageBackground
              source={assets.Frame2}
              resizeMode="cover"
              style={{ height: 168 }}
            >
              <View style={styles.cardInnView}>
                <Text style={styles.cardText1}>
                  {isEligible
                    ? "You are eligible for upto"
                    : "You are not eligible for loan"}
                </Text>
                {isEligible && (
                  <>
                    <Text style={styles.cardText2}>
                      ₹ {cardData ? cardData["Eligible Loan Amount"] : 0}
                    </Text>
                    <Text style={styles.cardText3}>
                      {/* @6.75% - 7.25% interest p.a */}
                    </Text>
                  </>
                )}
              </View>
            </ImageBackground>
          </Card>
        )}
        <Card
          cardStyle={{
            paddingHorizontal: 10,
            paddingTop: 10,
            marginBottom: 20,
          }}
        >
          <CoApplicant
            coApplicantsArr={coApplicantsArr}
            setCoApplicantsArr={setCoApplicantsArr}
            loanId={loanId}
            loanData={loanData}
            retryBre={retryBre}


          />

          {cardData &&
            Object.keys(cardData).length > 0 &&
            Object.keys(cardData).map((el, i) => (
              <CustomComponent title={el} key={i} value={cardData[el]} />
            ))}
        </Card>
        {isEligible ? (
          <CustomButton
            type="primary"
            label="Confirm"
            onPress={() => {
              assignBranchManger?.mutate()
            }}
          />
        ) : (
          <CustomButton type="primary" label="Retry" onPress={retryBre} />
        )}
      </View>
    );
  };

  console.log("HERE IS BRE DATA", breData?.data);

  return (
    <ScrollView
      style={{ backgroundColor: "#ffff" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <ActivityIndicatorComponent
        visible={eligibilityDetails?.isPending || loading || breData?.isPending || assignBranchManger?.isPending}
      />
      <Header
        title="Eligibility"
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
          if(retryClick < 1){
          resetRoute(screens.LoanDetails, { loanData });
          }else{
            resetRoute(screens.HomeScreen);
          }
        }}
        showHelpModal={showHelpModal}
        toggleHelpModal={toggleHelpModal}
      />

      {!loading &&
        !breData?.isPending &&
        isBreSuccess && <ShowEligibleDetails />}

      {
        isBreError && <BreRetryUi />
      }
    </ScrollView>
  );
};

const CustomComponent = ({ title, value }) => {
  return (
    <View style={styles.customCompCon}>
      <Text variant="titleSmall" style={styles.titleStyle}>
        {title}
      </Text>
      <Text variant="bodyMedium" style={styles.valueStyle}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topCon: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardCon: {
    paddingTop: 0,
    paddingHorizontal: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    marginVertical: 15,
  },
  cardInnView: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 50,
    justifyContent: "center",
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: "#2E52A1",
    alignSelf: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginBottom: 20,
  },
  customCompCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  textStyle: {
    ...customTheme.fonts.smallText,
    color: "#2E52A1",
  },
  titleStyle: {
    ...customTheme.fonts.mediumText,
    maxWidth: "50%",
  },
  valueStyle: {
    ...customTheme.fonts.mediumText,
    fontWeight: "400",
    fontSize: 11,
    color: "#2E52A1",
  },
  cardText1: {
    ...customTheme.fonts.mediumText,
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
  },
  cardText2: {
    ...customTheme.fonts.largeText,
    color: "#FFFFFF",
    fontSize: 32,
    marginBottom: 10,
  },
  cardText3: {
    ...customTheme.fonts.mediumText,
    color: "#FFFFFF",
    fontSize: 9,
    marginBottom: 10,
  },
});

export default Eligibility;
