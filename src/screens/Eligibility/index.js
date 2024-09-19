import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import CustomModal from "../../components/CustomModal";
import InputField from "../../components/FormComponents/InputField";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Button";
import Card from "../../components/Card";
import { Text } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import customTheme from "../../colors/theme";
import { assets } from "../../assets/assets";
import { screens } from "../../constants/screens";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import Header from "../../components/Header";
import { validations } from "../../constants/validations";
import { getEligibilityDetails } from "../../services/ApiUtils";
import { useRoute } from "@react-navigation/native";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import CoApplicant from "../CoApplicant";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../colors";

const Eligibility = (props) => {
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const { applicationDetails = {}, loanDetails = {} } = loanData;
  const loanId = applicationDetails?.LeadId__c;
  console.log({ loanId });
  const [cardData, setCardData] = useState();
  const eligibilityDetails = getEligibilityDetails(loanData);
  const [coApplicantsArr, setCoApplicantsArr] = useState([]);
  const [showHelpModal, setShowHelpModal] = useState(false);

  console.log("-------> RESPONSE HERE---- >", applicationDetails, loanDetails);

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
      <ActivityIndicatorComponent visible={eligibilityDetails?.isPending} />;
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
          props.navigation.goBack();
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
          {/* <View style={{marginVertical: verticalScale(5), flexDirection:'row', justifyContent:'flex-end', marginBottom: verticalScale(10)}}>
            <CustomButton
              type="secondery"
              label="Add Co-Applicant"
              onPress={onPressContinue}
              buttonContainer={{
                alignSelf: "flex-start",
                paddingHorizontal: horizontalScale(10),
                borderRadius: 8,
                paddingVertical:3
              }}
              labelStyle={{
                fontSize: verticalScale(10)
              }}
            />
          </View>
          <CoApplicantCard index={1} /> */}
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

const CoApplicantCard = ({ data, index }) => {
  return (
    <Card cardStyle={styles.coapplicantCard}>
      <TouchableOpacity
      // onPress={() => selectUpdateForm(index)}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: verticalScale(5),
              // paddingHorizontal: horizontalScale(15),
              // margin: verticalScale(5)
            }}
          >
            <Text style={styles.applicantText1}>Co-Applicant {index + 1}</Text>
            <MaterialIcons
              name={"delete"}
              size={16}
              color={colors.asteriskRequired}
              // onPress={() => deleteApplicant(data?.id)}
            />
          </View>

          <View style={styles.con2}>
            <Text style={styles.applicantText2}>Name : {data?.FName__c}</Text>
            <Text style={styles.applicantText2}>
              DOB :{" "}
              {typeof data?.DOB__c === "object"
                ? moment(data?.DOB__c).format("DD-MM-YYYY")
                : data?.DOB__c
                ? data?.DOB__c
                : "-"}
            </Text>
          </View>
          {/* <Text style={styles.applicantText2}>
          Mobile Number : {data?.MobNumber__c}
        </Text>
        <Text style={styles.applicantText2}>
          Relation : {data?.Relationship__c}
        </Text> */}
          <Text style={styles.applicantText2}>
            Income : {data?.TotalIncome__c}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
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

  coapplicantCard: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#F2F2F2",
    borderWidth: 0.5,
    borderColor: "#C8C8C8",
    marginBottom: 15,
  },
  applicantText1: {
    ...customTheme.fonts.largeText,
    fontSize: 11,
    color: "#2E52A1",
    marginBottom: 10,
  },
  con2: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  applicantText2: {
    ...customTheme.fonts.mediumText,
    fontSize: 11,
    marginBottom: 10,
  },
});

export default Eligibility;
