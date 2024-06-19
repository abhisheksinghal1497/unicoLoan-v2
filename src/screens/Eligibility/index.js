import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
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

const formData = [
  {
    id: "name",
    label: "Co-Applicant Name",
    type: component.textInput,
    placeHolder: "Enter Co-Applicant Name",
    value: "",
    validations: {
      required: true,
      minLength: 2,
    },
  },
  {
    id: "dob",
    label: "Co-Applicant DOB",
    type: component.datetime,
    placeHolder: "Enter Co-Applicant DOB",
    value: "",
    validations: validations.required,
  },
  {
    id: "number",
    label: "Co-Applicant Mobile Number",
    type: component.number,
    placeHolder: "Enter Co-Applicant Mobile Number",
    value: "",
    validations: validations.phone,
  },
  {
    id: "relationship",
    label: "Relationship with Applicant",
    type: component.dropdown,
    placeHolder: "Select Relationship",
    data: [
      {
        id: "relationship-1",
        label: "Mother",
        value: "mother",
      },
      {
        id: "relationship-2",
        label: "Father",
        value: "father",
      },
      {
        id: "relationship-3",
        label: "Brother",
        value: "brother",
      },
      {
        id: "relationship-4",
        label: "Sister",
        value: "sister",
      },
      {
        id: "relationship-5",
        label: "Son",
        value: "son",
      },
      {
        id: "relationship-6",
        label: "Daughter",
        value: "daughter",
      },
      {
        id: "relationship-7",
        label: "Husband",
        value: "husband",
      },
      {
        id: "relationship-8",
        label: "Wife",
        value: "wife",
      },
    ],
    value: {},
    validations: validations.required,
  },
  {
    id: "income",
    label: "Co-Applicant Income",
    type: component.textInput,
    placeHolder: "Enter Co-Applicant Income",
    value: "",
    validations: {
      required: true,
      minLength: 2,
    },
  },
];

const Eligibility = (props) => {
 
  const [showBottomModal, setShowBottomModal] = useState(false);
  const [applicantData, setApplicantData] = useState([]);
  const [cardData, setCardData] = useState();

  const eligibilityDetails = getEligibilityDetails();
  const handleRightIconPress = (index) => {
    if (index === 0) {
        props.navigation.navigate(screens.FAQ);
    } else if (index === 1) {
        props.navigation.navigate(screens.HomeScreen);
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
    eligibilityDetails.mutate();
  }, []);

  useEffect(() => {
    if (eligibilityDetails.data) {
      // alert('Top Cards Success')
      setCardData(eligibilityDetails.data);
    }
  }, [eligibilityDetails.data]);

  useEffect(() => {
    if (eligibilityDetails.error) {
      alert(eligibilityDetails.error);
    }
  }, [eligibilityDetails.error]);

  const onSubmit = (data) => {
    if (applicantData?.length) {
      setApplicantData([...applicantData, { ...data }]);
    } else {
      setApplicantData([{ ...data }]);
    }
    setShowBottomModal(false);
  };

 if(eligibilityDetails?.isPending)  return (<Text>Loading</Text>)


  return (
    <ScrollView style={{backgroundColor:'#ffff'}}>
      <Header        
       title="Eligibility"
       left={assets.back}
       rightImages={[{source: assets.chat,},{source: assets.questionRound,},]}
       leftStyle={{height: verticalScale(15),width: verticalScale(15),}}
       leftImageProps={{resizeMode: "contain",}}
       rightStyle={{height: verticalScale(23),width: verticalScale(23),marginHorizontal:10}}
       rightImageProps={{ resizeMode: "contain"}}
       titleStyle={{fontSize: verticalScale(18), }}
       onPressRight={handleRightIconPress}
       onPressLeft={() => {props.navigation.goBack();}}
     />
      <View style={styles.topCon}>
        <Card cardStyle={styles.cardCon}>
          <ImageBackground
            source={assets.Frame2}
            resizeMode="cover"
            style={{ height: 168 }}
          >
            <View style={styles.cardInnView}>
              <Text style={styles.cardText1}>You are eligible for upto</Text>
              <Text style={styles.cardText2}>₹ 1.2 Crore</Text>
              <Text style={styles.cardText3}>@6.75% - 7.25% interest p.a</Text>
            </View>
          </ImageBackground>
        </Card>
        <Card
          cardStyle={{
            paddingHorizontal: 10,
            paddingTop: 10,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            style={[
              styles.btnStyle,
              {
                borderColor: applicantData?.length >= 2 ? "#888888" : "#2E52A1",
              },
            ]}
            disabled={applicantData?.length >= 2 ? true : false}
            onPress={() => setShowBottomModal(!showBottomModal)}
          >
            <Text
              style={[
                styles.textStyle,
                { color: applicantData?.length >= 2 ? "#888888" : "#2E52A1" },
              ]}
            >
              Add Co-Aplicant
            </Text>
          </TouchableOpacity>
          {applicantData?.length
            ? applicantData.map((el, i) => (
                <CoApplicantCard data={el} key={i} />
              ))
            : null}
          {cardData && Object.keys(cardData).map((el, i) => (
            <CustomComponent title={el} key={i} value={cardData[el]} />
          ))}
        </Card>
        <CustomButton type="primary" label="Continue" onPress={() => {}} />
      </View>

      <CustomModal
        type="bottom"
        showModal={showBottomModal}
        setShowModal={setShowBottomModal}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {formData.map((el, i) => (
            <FormControl
              key={i}
              control={control}
              compType={el.type}
              validations={el.validations}
              name={el.id}
              setValue={setValue}
              label={el.label}
              placeHolder={el.placeHolder}
              data={el?.data}
            />
          ))}

          <CustomButton
            type="primary"
            label="Save"
            onPress={handleSubmit(onSubmit)}
            buttonContainer={{ marginTop: 20 }}
          />
        </ScrollView>
      </CustomModal>
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

const CoApplicantCard = ({ data }) => {
  return (
    <Card cardStyle={styles.coapplicantCard}>
      <Text style={styles.applicantText1}>Co-Applicant</Text>
      <View style={styles.con2}>
        <Text style={styles.applicantText2}>Name : {data?.name}</Text>
        <Text style={styles.applicantText2}>
          DOB :{" "}
          {new Date(data?.dob).getDate() +
            "/" +
            new Date(data?.dob).getMonth() +
            "/" +
            new Date(data?.dob).getFullYear()}
        </Text>
      </View>
      <Text style={styles.applicantText2}>Mobile Number : {data?.number}</Text>
      <Text style={styles.applicantText2}>Relation : {data?.relationship}</Text>
      <Text style={styles.applicantText2}>Income : {data?.income}</Text>
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
    paddingTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
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
