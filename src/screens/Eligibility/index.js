import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Button";
import Card from "../../components/Card";
import { Text } from "react-native-paper";
import customTheme from "../../colors/theme";
import { assets } from "../../assets/assets";
import { screens } from "../../constants/screens";
import { verticalScale } from "../../utils/matrcis";
import Header from "../../components/Header";
import { getEligibilityDetails } from "../../services/ApiUtils";
import { useRoute } from "@react-navigation/native";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import CoApplicant from "../CoApplicant";
import { useResetRoutes } from "../../utils/functions";


const Eligibility = (props) => {
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const { applicationDetails = {}, loanDetails = {}, loanId } = loanData;
  const  resetRoute = useResetRoutes()
  const [cardData, setCardData] = useState();
  const eligibilityDetails = getEligibilityDetails(loanData);
  const [coApplicantsArr, setCoApplicantsArr] = useState(Array.isArray(applicationDetails?.Applicants__r?.records) ? applicationDetails?.Applicants__r?.records.filter(el => el.ApplType__c === 'C') : []);
  const [showHelpModal, setShowHelpModal] = useState(false);

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
    eligibilityDetails.mutate({ applicationDetails, loanDetails });
  }, []);

  useEffect(() => {
    if (eligibilityDetails.data) {
      setCardData(eligibilityDetails.data?.eligibilityDetails);
    }
  }, [eligibilityDetails.data]);

  useEffect(() => {
    if (eligibilityDetails.error) {
      alert(eligibilityDetails.error);
    }
  }, [eligibilityDetails.error]);

  const onPressContinue = () => {
    if (!eligibilityDetails?.isPending) {
      props.navigation.navigate(screens.Sanction, {
        loanData: eligibilityDetails.data,
      });
    }
  };

  const isEligible = cardData && cardData["Eligible Status"] === "Eligible";

  return (
    <ScrollView style={{ backgroundColor: "#ffff" }}>
      <ActivityIndicatorComponent visible={eligibilityDetails?.isPending} />
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
          resetRoute(screens.LoanDetails, {loanData})
        }}
        showHelpModal={showHelpModal}
        toggleHelpModal={toggleHelpModal}
      />

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
                      @6.75% - 7.25% interest p.a
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
          />

          {cardData &&
            Object.keys(cardData).length > 0 &&
            Object.keys(cardData).map((el, i) => (
              <CustomComponent title={el} key={i} value={cardData[el]} />
            ))}
        </Card>
        {cardData && (
          <CustomButton
            type="primary"
            label="Continue"
            onPress={onPressContinue}
          />
        )}
      </View>
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
