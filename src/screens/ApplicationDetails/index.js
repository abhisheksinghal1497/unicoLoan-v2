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
import { getUserDetailQuery } from "./../../services/ApiUtils";
import DimensionUtils from "../../utils/DimensionUtils";

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
  const [{ data = {}, error }] = getUserDetailQuery();
  const mock_data = [
    {
      id: "rmUser",
      label: "RM USER",
      type: component.dropdown,
      placeHolder: "Select User",
      validations: validations.required,
      maxLength: 10,
      // keyboardtype: "numeric",
      isRequired: true,
      data: [
        {
          id: "rm_user_1",
          label: "User 1",
          value: "user1",
        },

        {
          id: "rm_user_2",
          label: "User 2",
          value: "user2",
        },
      ],
      value: {},
    },
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
      validations: validations.name,
      isRequired: true,
      value: "",
    },
    {
      id: "middleName",
      label: "Middle Name",
      type: component.textInput,
      placeHolder: "Enter middle Name",
      validations: validations.nameWithoutRequired,
      isRequired: false,
      value: "",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: component.textInput,
      placeHolder: "Enter last Name",
      validations: validations.name,
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
      validations: validations.phone,
      isRequired: true,
      value: "",
      isDisabled: true,
    },
    {
      id: "alternateMobileNumber",
      label: "Alternate mobile number",
      type: component.textInput,
      placeHolder: "Enter alternate mobile number",
      validations: validations.phoneWithoutRequired,
      isRequired: false,
      value: "",
      keyboardtype: "numeric",
    },

    {
      id: "email",
      label: "Email",
      type: component.textInput,
      placeHolder: "Enter email",
      validations: validations.email,
      isRequired: false,
      value: "",
      isDisabled: true,
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
      validations: validations.numberOnly,
      isRequired: false,
      keyboardtype: "numeric",
      value: "",
    },

    {
      id: "loanAmount",
      label: "Loan Amount",
      type: component.textInput,
      placeHolder: "Enter required loan amount",
      validations: validations.numberOnlyRequired,
      keyboardtype: "numeric",
      isRequired: true,
      value: "",
    },

    {
      id: "propertyIdentified",
      label: "Property Identified",
      type: component.dropdown,
      placeHolder: "Select answer",
      validations: validations.text,
      isRequired: false,
      data: [
        {
          id: "propertyIdentified_type_1",
          label: "Yes",
          value: "Yes",
        },

        {
          id: "propertyIdentified_type_2",
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
      isRequired: true,
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
      type: component.textInput,
      placeHolder: "YY-MM",
      validations: validations.yyMMDate,
      isRequired: true,
      value: "",
    },
    {
      id: "rentPerMonth",
      label: "Rent per month",
      type: component.textInput,
      placeHolder: "Rent per month",
      validations: validations.numberOnly,
      isRequired: true,
      keyboardtype: "numeric",
      value: "",
    },
    {
      id: "employmentExperience",
      label: "Employment experience",
      type: component.textInput,
      placeHolder: "YY-MM",
      validations: validations.yyMMDate,
      isRequired: true,
      value: "",
    },
    {
      id: "totalWorkExperience",
      label: "Total Work experience",
      type: component.textInput,
      placeHolder: "YY-MM",
      validations: validations.yyMMDate,
      isRequired: true,
      value: "",
    },
    {
      id: "familyDependant",
      label: "Family Dependant",
      type: component.textInput,
      placeHolder: "Enter Family Dependant",
      validations: validations.numberOnlyRequired,
      isRequired: true,
      keyboardtype: "numeric",
      value: "",
    },

    {
      id: "familyDependantChildren",
      label: "Family Dependant Children",
      type: component.textInput,
      placeHolder: "Enter Family Dependant Children",
      validations: validations.numberOnlyRequired,
      isRequired: true,
      keyboardtype: "numeric",
      value: "",
    },

    {
      id: "familyDependantOther",
      label: "Family Dependant Other",
      type: component.textInput,
      placeHolder: "Enter Family Dependant Other",
      validations: validations.numberOnlyRequired,
      isRequired: true,
      keyboardtype: "numeric",
      value: "",
    },

    {
      id: "totalBusinessExperience",
      label: "Total Business experience",
      type: component.textInput,
      placeHolder: "YY-MM",
      validations: validations.yyMMDate,
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
      isMultiline: true,
    },

    {
      id: "pincode",
      label: "Pincode",
      type: component.textInput,
      placeHolder: "Enter Pincode",
      validations: validations.numberOnlyRequired,
      isRequired: true,
      value: "",
      keyboardtype: "numeric",
    },
  ];

  // const allFields = mock_data.map

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    mode: "onBlur",
    defaultValues: { LeadSource: "Customer Mobile App", branchName: "" },
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

      // if (currentData) {
      //   Object.keys(currentData).forEach((item) =>
      //     setValue(item, currentData[item])
      //   );
      // }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      const { mobileNumber, email, userId } = data;
      if (mobileNumber) {
        setValue("mobileNumber", mobileNumber);
      }

      if (email) {
        setValue("email", email);
      }

      if (userId) {
        setValue("rmName", userId);
      }
    }
  }, [data]);

  const onSubmit = async () => {
    try {
      const isValid = await trigger();
      if (isValid) {
        props?.navigation?.navigate(screens.PanDetails);
      }
    } catch (error) {
      console.log("IN ERROR");
    }
  };

  const ChangeValue = async (value, id) => {
    setValue(id, value);

    if (id === "pincode") {
    }
    const prevValue = { ...watch() };
    console.log("PREV VALUE---------", prevValue);
    prevValue[id] = value;
    await AsyncStorage.setItem("ApplicationDetails", JSON.stringify(prevValue));
  };

  // DATA THAT IS GOING TO BE POPULATED
  // Lead source, branch name by pincode, mobile number, email

  const checkFormCondition = (id) => {
    if (
      id !== "rentPerMonth" &&
      id !== "employmentExperience" &&
      id !== "totalWorkExperience" &&
      id !== "totalBusinessExperience"
    ) {
      return true;
    }

    if (id === "rentPerMonth" && watch("presentAccommodation") === "rented") {
      return true;
    } else if (
      watch("customerProfile") === "salaried" &&
      (id === "employmentExperience" || id === "totalWorkExperience")
    ) {
      return true;
    } else if (
      id === "totalBusinessExperience" &&
      watch("customerProfile") === "self-employed"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const toggleModal = () => setShowModal(!showModal);
  const style = styles(colors);
  const goBack = () => props.navigation.goBack();

  const getPercentage = () => {
    const customerProfile = watch("customerProfile");
    const isRented = watch("presentAccommodation") === "rented";

    const { totalRequiredFields, filledRequiredFields } = mock_data.reduce(
      (acc, field) => {
        if (field.isRequired) {
          if (!isRented && field.id === "rentPerMonth") {
            return acc;
          }

          if (
            customerProfile !== "salaried" &&
            (field.id === "employmentExperience" ||
              field.id === "totalWorkExperience")
          ) {
            return acc;
          }

          if (
            field.id === "totalBusinessExperience" &&
            customerProfile !== "self-employed"
          ) {
            return acc;
          }

          acc.totalRequiredFields++;
          if (!!watch(field.id)) {
            acc.filledRequiredFields++;
          }
        }
        return acc;
      },
      { totalRequiredFields: 0, filledRequiredFields: 0 }
    );

    let completionPercentage = 0;
    if (totalRequiredFields > 0) {
      completionPercentage = (filledRequiredFields / totalRequiredFields) * 100;
    }

    console.log({
      totalRequiredFields,
      completionPercentage,
      filledRequiredFields,
    });

    return completionPercentage;
  };

  const percentage = getPercentage();
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
          <ApplicationCard navigation={props?.navigation} />
        </View>

        <View
          style={{ marginHorizontal: DimensionUtils.pixelSizeHorizontal(15) }}
        >
          {mock_data.map((comp, index) => {
            if (!checkFormCondition(comp.id)) {
              return <></>;
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
                keyIndex={comp.id}
                setValue={setValue}
                isMultiline={comp.isMultiline}
                maxLength={comp.maxLength}
                isDisabled={comp.isDisabled}
                onChangeText={(value) => ChangeValue(value, comp.id)}
                type={comp.keyboardtype}
                trigger={trigger}
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
            // disable={percentage !== 100}
            onPress={onSubmit}
            buttonContainer={{ marginVertical: verticalScale(20) }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
