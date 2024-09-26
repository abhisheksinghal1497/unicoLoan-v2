import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Container from "../../components/Container";
import Header from "../../components/Header";
import { assets } from "../../assets/assets";
import { verticalScale, horizontalScale } from "../../utils/matrcis";
import { screens } from "../../constants/screens";
import { postObjectData } from "../../services/sfDataServices/netService";
import {
  component,
  FormControl,
} from "../../components/FormComponents/FormControl";
import { validations } from "../../constants/validations";
import { useForm } from "react-hook-form";
import {
  deleteObjectMutation,
  postObjectMutation,
  updateObjectMutation,
} from "../../services/ApiUtils";
import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";
import ErrorConstants from "../../constants/ErrorConstants";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import Button from "../../components/Button";
import customTheme from "../../colors/theme";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../colors";
import CustomModal from "../../components/CustomModal";
import Card from "../../components/Card";
import moment from "moment";
import { parsedDate } from "../CurrentAddress";

const CoApplicant = ({ coApplicantsArr, setCoApplicantsArr, loanId }) => {
  const createDataMutate = postObjectMutation();
  const updateDataMutate = updateObjectMutation();
  const deleteDataMutate = deleteObjectMutation();
  // -1 means there is no active co applicant for now
  const [activeApplicantIndex, setActiveApplicantIndex] = useState(-1);
  const isCreateForm = !coApplicantsArr[activeApplicantIndex]?.Id;
  const [showBottomModal, setShowBottomModal] = useState(false);
  const selectedID = coApplicantsArr[activeApplicantIndex]?.Id;


  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    watch,
    setValue,
    reset,
    trigger,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const CoApplicantForm = [
    {
      Id: "FName__c",
      label: "First Name",
      type: component.textInput,
      placeHolder: "Enter first Name",
      validations: validations.name,
      isRequired: true,
      value: "",
    },
    {
      Id: "MName__c",
      label: "Middle Name",
      type: component.textInput,
      placeHolder: "Enter middle Name",
      validations: validations.nameWithoutRequired,
      isRequired: false,
      value: "",
    },
    {
      Id: "LName__c",
      label: "Last Name",
      type: component.textInput,
      placeHolder: "Enter last Name",
      validations: validations.name,
      isRequired: true,
      maxLength: 255,
      value: "",
    },
    {
      Id: "DOB__c",
      label: "Date of birth",
      type: component.datetime,
      placeHolder: "Enter date of birth",
      isRequired: true,
      value: "",
    },

    {
      Id: "MobNumber__c",
      label: "Mobile number",
      type: component.textInput,
      placeHolder: "Enter mobile number",
      validations: validations.phone,
      isRequired: true,
      value: "",
      maxLength: 10,
    },

    {
      Id: "TotalIncome__c",
      label: "Total income",
      type: component.textInput,
      placeHolder: "Enter income",
      validations: validations.numberOnlyRequired,
      isRequired: true,
      value: "",
    },

    {
      Id: "Relationship__c",
      label: "Relationship",
      // type: component.dropdown,
      type: component.textInput,
      placeHolder: "Enter Relationship",
      validations: validations.name,
      isRequired: true,
      maxLength: 255,
      value: "",
      // data: [
      //   {
      //     Id: "relationship-1",
      //     label: "Mother",
      //     value: "mother",
      //   },
      //   {
      //     Id: "relationship-2",
      //     label: "Father",
      //     value: "father",
      //   },
      //   {
      //     Id: "relationship-3",
      //     label: "Brother",
      //     value: "brother",
      //   },
      //   {
      //     Id: "relationship-4",
      //     label: "Sister",
      //     value: "sister",
      //   },
      //   {
      //     Id: "relationship-5",
      //     label: "Son",
      //     value: "son",
      //   },
      //   {
      //     Id: "relationship-6",
      //     label: "Daughter",
      //     value: "daughter",
      //   },
      //   {
      //     Id: "relationship-7",
      //     label: "Husband",
      //     value: "husband",
      //   },
      //   {
      //     Id: "relationship-8",
      //     label: "Wife",
      //     value: "wife",
      //   },
      // ],
    },
  ];

  const selectUpdateForm = (index) => {
    setActiveApplicantIndex(index);
    const applicantData = { ...coApplicantsArr[index] };
    setValue("FName__c", applicantData?.FName__c);
    setValue("MName__c", applicantData?.MName__c);
    setValue("LName__c", applicantData?.LName__c);
    setValue("DOB__c", applicantData?.DOB__c);
    setValue("MobNumber__c", applicantData?.MobNumber__c);
    setValue("Relationship__c", applicantData?.Relationship__c);
    setValue("TotalIncome__c", applicantData?.TotalIncome__c);
    setShowBottomModal(true);
  };

  const createApplicant = async (formData) => {
    if (coApplicantsArr.length === 2) {
      Toast.show({ type: "error", text1: "Only 2 co applicants are allowed" });
      return;
    }
    const data = {
      ...formData,
      MName__c: formData?.MName__c ?? "",
      ApplType__c: "C",
      LoanAppln__c: loanId,
      DOB__c: parsedDate(formData?.DOB__c),
    };

    try {
      const Id = await createDataMutate.mutateAsync({
        objectName: "Applicant__c",
        body: data,
      });
     
      setCoApplicantsArr([...coApplicantsArr, { ...data, Id }]);
      setActiveApplicantIndex(-1);
      reset();
      setShowBottomModal(false);
    } catch (error) {
      console.log("FAILED TO CREATE-----------", error);
      Toast.show({ type: "error", text1: ErrorConstants.SOMETHING_WENT_WRONG });
    }
  };

  const deleteApplicant = async (id) => {
    try {
      const response = await deleteDataMutate.mutateAsync({
        objectName: "Applicant__c",
        id,
      });

      setCoApplicantsArr(coApplicantsArr.filter((el) => el.Id !== id));
      setActiveApplicantIndex(-1);
      reset();
      setShowBottomModal(false);
    } catch (error) {
      console.log("FAILED TO DELTE-----------", error);
      Toast.show({ type: "error", text1: ErrorConstants.SOMETHING_WENT_WRONG });
    }
  };

  const updateApplicant = async (formData) => {
    const data = {
      ...formData,
      MName__c: formData?.MName__c ?? "",
      DOB__c: parsedDate(formData?.DOB__c),
    };
    const id = coApplicantsArr[activeApplicantIndex]?.Id;
    if (!id) {
      Toast.show({ type: "error", text1: ErrorConstants.SOMETHING_WENT_WRONG });
      return;
    }

    try {
      const response = await updateDataMutate.mutateAsync({
        objectName: "Applicant__c",
        body: data,
        id,
      });
      const prevArr = [...coApplicantsArr];
      const coApplicantIndex = prevArr.findIndex((el) => el.Id === id);
      if (coApplicantIndex !== -1) {
        prevArr[coApplicantIndex] = {
          Id: prevArr[coApplicantIndex].Id,
          ...data,
        };
      }
      setCoApplicantsArr([...prevArr]);
      setActiveApplicantIndex(-1);
      reset();

      setShowBottomModal(false);
    } catch (error) {
      console.log("FAILED TO CREATE-----------", error);
      Toast.show({ type: "error", text1: ErrorConstants.SOMETHING_WENT_WRONG });
    }
  };

  const createNewApplicant = () => {
    if (coApplicantsArr.length === 2) {
      Toast.show({ type: "error", text1: "Only 2 co applicants are allowed" });
      return;
    }
    setActiveApplicantIndex(coApplicantsArr.length === 0 ? 0 : 1);
    setShowBottomModal(true);
  };

  const CoApplicantCard = ({ data, index }) => {
    return (
      <Card cardStyle={styles.coapplicantCard}>
        <TouchableOpacity onPress={() => selectUpdateForm(index)}>
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
              <Text style={styles.applicantText1}>
                Co-Applicant {index + 1}
              </Text>
              <MaterialIcons
                name={"delete"}
                size={16}
                color={colors.asteriskRequired}
                onPress={() => deleteApplicant(data?.Id)}
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

  return (
    <View>
      <View
        style={{
          marginVertical: verticalScale(5),
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: verticalScale(10),
        }}
      >
        <Button
          type="secondery"
          label="Add Co-Applicant"
          onPress={createNewApplicant}
          buttonContainer={{
            alignSelf: "flex-start",
            paddingHorizontal: horizontalScale(10),
            borderRadius: 8,
            paddingVertical: 3,
            borderColor:
              coApplicantsArr?.length === 2
                ? "#888888"
                : customTheme.colors.primary,
          }}
          labelStyle={{
            fontSize: verticalScale(10),
            color:
              coApplicantsArr?.length === 2
                ? "#888888"
                : customTheme.colors.primary,
          }}
        />
      </View>
      <View style={styles.container}>
        <ActivityIndicatorComponent
          visible={
            createDataMutate.isPending ||
            deleteDataMutate.isPending ||
            updateDataMutate.isPending
          }
        />

        {coApplicantsArr.map((el, index) => {
          if (!el?.Id) {
            return <></>;
          }
          return <CoApplicantCard key={el?.Id} data={el} index={index} />;
        })}
      </View>

      {/* {activeApplicantIndex === -1 && coApplicantsArr.length < 2 && (
        <View style={styles.buttonview}>
          <Button
            onPress={createNewApplicant}
            type="primary"
            label="Create Applicant"
          />
        </View>
      )} */}

      <CustomModal
        type="bottom"
        showModal={showBottomModal}
        setShowModal={setShowBottomModal}
        modalStyle={{
          borderRadius: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        withFeedback={true}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {isCreateForm ? "Create Applicant" : "Update applicant"}
          </Text>
          {CoApplicantForm.map((comp, i) => (
            <FormControl
              compType={comp.type}
              control={control}
              validations={comp.validations}
              name={comp.Id}
              label={comp.label}
              errors={errors[comp.Id]}
              isRequired={comp.isRequired}
              placeholder={comp.placeHolder}
              data={comp.data}
              key={comp.Id}
              watch={watch}
              showRightComp={comp.showRightComp || false}
              isMultiline={comp.isMultiline}
              maxLength={comp.maxLength}
              isDisabled={comp.isDisabled}
              // isUpperCaseRequired={true}
              // isEditable={comp.isEditable}
              type={comp.keyboardType}
            />
          ))}

          {isCreateForm ? (
            <Button
              type="primary"
              onPress={handleSubmit(createApplicant)}
              label={"Create Applicant"}
              buttonContainer={{ marginTop: 20, marginBottom: 20 }}
            />
          ) : (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <Button
                type="secondery"
                onPress={() => deleteApplicant(selectedID)}
                label={"Delete"}
                buttonContainer={{
                  marginTop: 20,
                  marginBottom: 20,
                  paddingHorizontal: horizontalScale(25),
                }}
              />
              <Button
                type="primary"
                onPress={handleSubmit(updateApplicant)}
                label={"Update applicant"}
                buttonContainer={{
                  marginTop: 20,
                  marginBottom: 20,
                  paddingHorizontal: horizontalScale(25),
                }}
              />
            </View>
          )}
        </ScrollView>
      </CustomModal>
    </View>
  );
};

export default CoApplicant;

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
  buttonview: {
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  uploadButton: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: verticalScale(20),
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: "500",
    alignSelf: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    textAlign: "center",
  },
  selectContainer: {
    backgroundColor: customTheme.colors.textInputBackground,
    padding: 13,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  selectField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    padding: 10,
    marginVertical: 10,
  },
  selectedItem: {
    color: "red",
  },
});
