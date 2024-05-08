import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import InputField from "../../components/FormComponents/InputField";
import { useForm } from "react-hook-form";

const Eligibility = () => {
  const [showBottomModal, setShowBottomModal] = useState(true);

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

  return (
    <ScrollView>
      <Text>index</Text>

      <CustomModal
        type="bottom"
        showModal={showBottomModal}
        setShowModal={setShowBottomModal}
      >
        <InputField
          control={control}
          validations={{
            required: true,
            minLength: 2,
          }}
          setValue={setValue}
          name=""
          label="Co-Applicant Name"
        />
        <InputField
          control={control}
          validations={{
            required: true,
            minLength: 2,
          }}
          setValue={setValue}
          name=""
          label="Co-Applicant DOB"
        />
        <InputField
          control={control}
          validations={{
            required: true,
            minLength: 2,
          }}
          setValue={setValue}
          name=""
          label="Co-Applicant Income"
        />
      </CustomModal>
    </ScrollView>
  );
};

export default Eligibility;
