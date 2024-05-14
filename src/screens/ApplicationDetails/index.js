import { ScrollView, View } from "react-native";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useTheme } from "react-native-paper";
import { validations } from "../../constants/validations";
import { screens } from "../../constants/screens";
import Button from "././../../components/Button";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import ApplicationCard from "./component/ApplicationCard";
import { styles } from "./styles/ApplicationDetailStyle";
import Header from "../../components/Header";
import { assets } from "../../assets/assets";
import HelpModal from "./component/HelpModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDateYearsBack } from "../../utils/dateUtil";

const initialData = [
  {
    id: "applicationType",
    value: 0,
  },
  {
    id: "customerProfile",
    value: 0,
  },
  {
    id: "firstName",
    value: 0,
  },
  {
    id: "lastName",
    value: 0,
  },
  {
    id: "dob",
    value: 0,
  },
];

export default function ApplicationDetails(props) {
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    async function fetchData() {
      await AsyncStorage.setItem(
        "CurrentScreen",
        JSON.stringify(screens.ApplicantDetails)
      );
      const savedData = await AsyncStorage.getItem("ApplicationDetails");
      const currentData = JSON.parse(savedData);
      console.log(currentData, "current value");
      {
        currentData?.map((item) => {
          console.log(item);
          setValue(item.id, item.value);
        });
      }
    }
    fetchData();
  }, []);

  const onSubmit = (data) => {
    console.log("njnjnjnb");
    console.log(JSON.stringify(data, null, 2));
    props?.navigation?.navigate(screens.PancardNumber);
  };

  const ChangeValue = async (value, id) => {
    setValue(id, value);
    objIndex = initialData.findIndex((obj) => obj.id === id);
    initialData[objIndex].value = value;
    await AsyncStorage.setItem(
      "ApplicationDetails",
      JSON.stringify(initialData)
    );
  };

  // DATA THAT IS GOING TO BE POPULATED
  // Lead source, branch name by pincode, mobile number, email

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
      id: "customerProfile",
      label: "Customer Profile",
      type: component.dropdown,
      placeHolder: "Select Customer Profile",
      validations: validations.text,
      maxLength: 10,
      keyboardtype: "numeric",
      isRequired: true,
      data: [
        {
          id: "cust_type_1",
          label: "Salaried",
          value: "salaried",
        },

        {
          id: "cust_type_2",
          label: "Self-Employed",
          value: "self-employed",
        },
      ],
      value: {},
    },
    {
      id: "firstName",
      label: "First Name",
      type: component.textInput,
      placeHolder: "Enter first Name",
      validations: validations.text,
      isRequired: true,
      value: "",
    },
    {
      id: "middleName",
      label: "Middle Name",
      type: component.textInput,
      placeHolder: "Enter middle Name",
      validations: validations.text,
      isRequired: true,
      value: "",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: component.textInput,
      placeHolder: "Enter last Name",
      validations: validations.text,
      isRequired: true,
      value: "",
    },
    {
      id: "dob",
      label: "Date of Birth",
      type: component.datetime,
      placeHolder: "DD-MM-YYYY",
      validations: validations.text,
      isRequired: false,
      value: "",
      datepickerProps: {
        minimumDate: getDateYearsBack(18),
        maximumDate: getDateYearsBack(100),
      },
    },
    {
      id: "mobileNumber",
      label: "Mobile number",
      type: component.textInput,
      placeHolder: "Enter mobile number",
      validations: validations.text,
      isRequired: true,
      value: "",
    },
    {
      id: "alternateMobileNumber",
      label: "Alternate mobile number",
      type: component.textInput,
      placeHolder: "Enter alternate mobile number",
      validations: validations.text,
      isRequired: false,
      value: "",
    },

    {
      id: "email",
      label: "Email",
      type: component.textInput,
      placeHolder: "Enter alternate mobile number",
      validations: validations.text,
      isRequired: false,
      value: "",
    },

    {
      id: "product",
      label: "Product",
      type: component.dropdown,
      placeHolder: "Select product",
      validations: validations.text,
      maxLength: 10,
      // keyboardtype: "numeric",
      isRequired: true,
      data: [
        {
          id: "product_type_1",
          label: "Housing Loan",
          value: "Housing Loan",
        },

        {
          id: "product_type_2",
          label: "Non Housing Loan",
          value: "Non Housing Loan",
        },
      ],
      value: {},
    },

    {
      id: "tenure",
      label: "Tenure",
      type: component.textInput,
      placeHolder: "Enter requested tenure in months",
      validations: validations.text,
      isRequired: false,
      value: "",
    },

    {
      id: "loanAmount",
      label: "Loan Amount",
      type: component.textInput,
      placeHolder: "Enter required loan amount",
      validations: validations.text,
      isRequired: true,
      value: "",
    },

    {
      id: "propertyIdentified",
      label: "Property Identified",
      type: component.dropdown,
      placeHolder: "Select answer",
      validations: validations.text,
      maxLength: 10,
      // keyboardtype: "numeric",
      isRequired: false,
      data: [
        {
          id: "propertyIdentified_type_1",
          label: "Yes",
          value: "Yes",
        },

        {
          id: "propertyIdentified_type_1",
          label: "No",
          value: "No",
        },
      ],
      value: {},
    },

    {
      id: "presentAccommodation",
      label: "Present Accommodation",
      type: component.dropdown,
      placeHolder: "Select Present Accommodation",
      validations: validations.text,
      maxLength: 10,
      // keyboardtype: "numeric",
      isRequired: false,
      data: [
        {
          id: "presentAccommodation_type_1",
          label: "own",
          value: "own",
        },

        {
          id: "presentAccommodation_type_2",
          label: "family",
          value: "family",
        },
        {
          id: "presentAccommodation_type_3",
          label: "rented",
          value: "rented",
        },
        {
          id: "presentAccommodation_type_4",
          label: "employer",
          value: "employer",
        },
      ],
      value: {},
    },

    {
      id: "periodOfStay",
      label: "Period of stay",
      type: component.datetime,
      placeHolder: "YY-MM",
      validations: validations.text,
      isRequired: true,
      value: "",
    },
    {
      id: "rentPerMonth",
      label: "Rent per month",
      type: component.textInput,
      placeHolder: "Applicant Type",
      validations: validations.text,
      isRequired: true,
      keyboardtype: "numeric",
      value: "",
    },

    {
      id: "employmentExperience",
      label: "Employment experience",
      type: component.datetime,
      placeHolder: "YY-MM",
      validations: validations.text,
      isRequired: true,
      value: "",
    },

    {
      id: "employmentExperience",
      label: "Employment experience",
      type: component.datetime,
      placeHolder: "YY-MM",
      validations: validations.text,
      isRequired: true,
      value: "",
    },

    {
      id: "totalEmploymentExperience",
      label: "Total Employment experience",
      type: component.datetime,
      placeHolder: "YY-MM",
      validations: validations.text,
      isRequired: true,
      value: "",
    },

    {
      id: "familyDependant",
      label: "Family Dependant",
      type: component.textInput,
      placeHolder: "Applicant Type",
      validations: validations.text,
      isRequired: true,
      keyboardtype: "numeric",
      value: "",
    },

    {
      id: "familyDependantChildren",
      label: "Family Dependant Children",
      type: component.textInput,
      placeHolder: "Enter Family Dependant Children",
      validations: validations.text,
      isRequired: true,
      keyboardtype: "numeric",
      value: "",
    },

    {
      id: "familyDependantOther",
      label: "Family Dependant Other",
      type: component.textInput,
      placeHolder: "Enter Family Dependant Other",
      validations: validations.text,
      isRequired: true,
      keyboardtype: "numeric",
      value: "",
    },

    {
      id: "totalBusinessExperience",
      label: "Total Business experience",
      type: component.datetime,
      placeHolder: "YY-MM",
      validations: validations.text,
      isRequired: true,
      value: "",
    },

    {
      id: "address",
      label: "Address",
      type: component.textInput,
      placeHolder: "Enter address",
      validations: validations.text,
      isRequired: true,
      value: "",
    },

    {
      id: "pincode",
      label: "Pincode",
      type: component.textInput,
      placeHolder: "Enter Pincode",
      validations: validations.text,
      isRequired: true,
      value: "",
    },
  ];

  const toggleModal = () => setShowModal(!showModal);
  const style = styles(colors);
  const goBack = () => props.navigation.goBack();

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <HelpModal
        toggleModal={toggleModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <View
        style={{
          paddingHorizontal: horizontalScale(15),
          marginTop: verticalScale(10),
        }}
      >
        <Header
          colour="#fff"
          title="Applicant Details"
          left={assets.back}
          right={assets.questionRound}
          leftStyle={{
            height: verticalScale(15),
            width: verticalScale(15),
          }}
          leftImageProps={{
            resizeMode: "contain",
          }}
          rightStyle={{
            height: verticalScale(25),
            width: verticalScale(25),
          }}
          rightImageProps={{
            resizeMode: "contain",
          }}
          titleStyle={{
            fontSize: verticalScale(18),
          }}
          onPressRight={toggleModal}
          onPressLeft={goBack}
        />
      </View>
      <ScrollView contentContainerStyle={style.scrollviewStyle}>
        <View style={style.container}>
          <ApplicationCard />
        </View>

        <View>
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
                isMultiline={comp.isMultiline}
                maxLength={comp.maxLength}
                isDisabled={comp.isDisabled}
                onChangeText={(value) => ChangeValue(value, comp.id)}
                // showRightComp={true}
                // rightComp={() =>
                //   isVerified ? (
                //     <Text>Verify</Text>
                //   ) : (
                //     <Image
                //       source={require("../../images/tick.png")}
                //       style={styles.tickImage}
                //     />
                //   )
                // }
                // rightCompPress={() => {
                //   setIsVerified(!isVerified);
                // }}
              />
            );
          })}
        </View>
        <View style={{ paddingHorizontal: horizontalScale(30) }}>
          <Button
            type="primary"
            label="Continue"
            onPress={handleSubmit(onSubmit)}
            buttonContainer={{ marginVertical: verticalScale(20) }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
