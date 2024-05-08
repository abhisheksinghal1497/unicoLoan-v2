import { Button, View } from "react-native";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useTheme, Text } from "react-native-paper";
import { validations } from "../../constants/validations";
import { styles } from "./styles/ApplicationDetailStyle";

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
        { label: "Salaried", value: "Salaried" },
        { label: "Self-Employed", value: "Self-Employed" },
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

  return (
    <View>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
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
  );
}
