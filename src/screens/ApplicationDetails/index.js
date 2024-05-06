import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useTheme } from "react-native-paper";
import { validations } from "../../constants/validations";

export default function ApplicationDetails() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    setValue,
  } = useForm({ mode: "onBlur" });

  const { colors } = useTheme();

  const onSubmit = (data) => console.log(JSON.stringify(data, null, 2));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text>ApplicationDetails</Text>

      <FormControl
        compType={component.input}
        control={control}
        validations={validations.text}
        name="leadId"
        label="SFDC Lead Id"
        errors={errors.leadId}
        isRequired
        placeholder="Enter Lead Id"
      />

      <FormControl
        compType={component.number}
        control={control}
        validations={validations.phone}
        name="phone"
        label="Phone No."
        errors={errors.phone}
        isRequired
        placeholder="Enter your phone no."
      />

      <FormControl
        compType={component.dropdown}
        control={control}
        validations={validations.required}
        name="leadSrc"
        label="Lead Source"
        errors={errors.leadSrc}
        isRequired
        placeholder="Please select Lead Source"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
