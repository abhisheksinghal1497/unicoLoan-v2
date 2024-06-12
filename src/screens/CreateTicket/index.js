import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import customTheme from "../../colors/theme";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { validations } from "../../constants/validations";
import CustomButton from "../../components/Button";
import { assets } from "../../assets/assets";
import { createTicketMethod } from "../../services/ApiUtils";

const CreateTicket = (props) => {


  const {selectedCategoryTitle,selectedItem}=props.route.params;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {caseSubType:selectedCategoryTitle,caseType:selectedItem},
  });

  const createTicketFn=createTicketMethod();

  useEffect(() => {
    if (createTicketFn?.data) {
      alert('Success')
    }
  }, [createTicketFn?.data]);

  useEffect(() => {
    if (createTicketFn?.error) {
      alert("error");
    }
  }, [createTicketFn?.error]);

  const raise_ticket_data = [
    {
      id: "applicationNumber",
      label: "Loan Application Number",
      type: component.dropdown,
      placeHolder: "Loan Application Number",
      value: "",
      validations:validations.text,
      data: [
        {
          id: "loanNumber-1",
          label: "LX108209029900",
          value: "LX108209029900",
        },
        {
          id: "loanNumber-2",
          label: "LX108209029911",
          value: "LX108209029911",
        },
      ],
    },
    {
        id: "firstName",
        label: "First Name",
        type: component.textInput,
        placeHolder: "Enter first Name",
        validations: validations.text,
        isRequired: true,
        value: "",
        validations:validations.name
      },
      {
        id: "lastName",
        label: "Last Name",
        type: component.textInput,
        placeHolder: "Enter last Name",
        validations: validations.text,
        isRequired: true,
        value: "",
        validations:validations.name
      },
    
    {
      id: "caseType",
      label: "Case Type",
      type: component.dropdown,
      placeHolder: "Select Case Type",
      data: [
        {
          id: "caseType-1",
          label: "Query 1",
          value: "Query 1",
        },
        {
          id: "caseType-2",
          label: "Query 2",
          value: "Query 2",
        },
      ],
      value:""
    
      ,
      isDisabled:true

    },
    {
        id: "caseSubType",
        label: "Case Sub Type",
        type: component.textInput,
        isDisabled:true,
        placeHolder: "Case Sub Type",
        value: "Query Complaint 2",

      },
      {
          id: "caseSubject",
          label: "Case Subject",
          type: component.textInput,
          placeHolder: "Enter Case Subject",
          validations: validations.text,
          value: "",
          validations:validations.text
        },
        {
          id: "description",
          label: "Description",
          type: component.textInput,
          placeHolder: "Enter Description",
          validations: validations.text,
          isRequired:true,
          isMultiline:true,
          value: "",
          validations:validations.text

        },
   
  ];

  const onSubmit=(data)=>{
    console.log("data",data)
    createTicketFn.mutate(data);
  }







  return (
    <View style={styles.container}>
      <Header
        title="Raise Tickets"
        left={require("../../images/back.png")}
        onPressLeft={() => {
          props?.navigation.goBack();
        }}
        right={assets.ChatsCircle}
        onPressRight={() => {}}
        colour="transparent"
      />

      <ScrollView showsVerticalScrollIndicator={false} >
        {raise_ticket_data.map((comp) => {
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
              showRightComp={true}
              isMultiline={comp.isMultiline}
              maxLength={comp.maxLength}
              isDisabled={comp.isDisabled}
            //   value={comp.value}
            />
          );
        })}

        <CustomButton
          type="primary"
          label="Continue"
          isDisabled={false}
          buttonContainer={styles.buttonContainer}
          // buttonContainer={{}}
          onPress={handleSubmit(onSubmit)
          }
        />
      </ScrollView>
    </View>
  );
};

export default CreateTicket;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "white",
    flex:1,
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom:40
  },
});
