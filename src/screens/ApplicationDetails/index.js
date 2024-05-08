import { Button, ScrollView, View } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useTheme, Text } from "react-native-paper";
import { validations } from "../../constants/validations";
import { styles } from "./styles/ApplicationDetailStyle";
import ApplicationCard from "./component/ApplicationCard";

export default function ApplicationDetails() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    setValue,
  } = useForm({ mode: "onBlur", defaultValues: { otp: "", checkbox: false } });

  const { colors } = useTheme();

  const onSubmit = (data) => console.log(JSON.stringify(data, null, 2));

  // {
  //   id: "leadId", // unique id for field
  //   label: "SFDC Lead Id", // label to show to the user
  //   type: component.textInput, // type of field
  //   placeHolder: "Enter Lead Id12", // placeholder to show to the user when there is no value is entered
  //   validations: validations.text, // validations for field (smme as we pass to the rule prop in 'Controller' comp from react-hook-form)
  //   isRequired: true, // whether the filed is mandatory or not
  //   data: [], // data need for the filed e.g. options for select/dropdown
  //   value: "", // current value of the filed. can be use directly to send to API
  // },
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
      placeHolder: "Customer Profile",
      validations: validations.text,
      isRequired: true,
      data: [
        { id: 1, label: "Salaried", value: "Salaried" },
        { id: 2, label: "Self-Employed", value: "Self-Employed" },
      ],
      value: "",
    },
    {
      id: "firstName",
      label: "First Name",
      type: component.textInput,
      placeHolder: "First Name",
      validations: validations.text,
      isRequired: false,
      value: "",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: component.textInput,
      placeHolder: "Last Name",
      validations: validations.text,
      isRequired: false,
      value: "",
    },
    {
      id: "dateOfBirth",
      label: "Date of Birth",
      type: component.datetime,
      placeHolder: "Select date of birth",
      validations: validations.text,
      isRequired: false,
      value: "",
    },
  ];

  const style = styles(colors);

  return (
    <ScrollView contentContainerStyle={style.scrollviewStyle}>
      <View style={style.container}>
        <ApplicationCard />
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
              />
            );
          })}
          {/* // ! temporary submit button */}
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </ScrollView>
  );
}
