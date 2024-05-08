import { View, ScrollView,StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import InputField from "../../components/FormComponents/InputField";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Button";
import Card from "../../components/Card";
import { Text } from 'react-native-paper';
import { TouchableOpacity } from "react-native-gesture-handler";
import customTheme from "../../colors/theme";

const Eligibility = () => {
  const [showBottomModal, setShowBottomModal] = useState(false);

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
        <View style={styles.topCon}>
            <Card>
                <TouchableOpacity style={styles.btnStyle} onPress={()=>setShowBottomModal(!showBottomModal)}>
                    <Text style={styles.textStyle}>Add Co-Aplicant</Text>
                </TouchableOpacity>
                <CustomComponent title="Product" value="Home Loan" />
                <CustomComponent title="Requested Loan Amount" value="50 lc" />
                <CustomComponent title="Product" value="Home Loan" />
                <CustomComponent title="Product" value="Home Loan" />
                <CustomComponent title="Product" value="Home Loan" />
                <CustomComponent title="Product" value="Home Loan" />

            </Card>
        </View>

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
        <CustomButton type="primary" label="Save" onPress={()=>setShowBottomModal(!showBottomModal)}/>
        <CustomButton type="primary" label="Cancel" onPress={()=>setShowBottomModal(!showBottomModal)} buttonContainer={{marginTop:20}}/>
      </CustomModal>
    </ScrollView>
  );
};

const CustomComponent=({title,value})=>{
    return(
        <View style={styles.customCompCon}>
            <Text variant="titleSmall">{title}</Text>
            <Text variant="bodyMedium">{value}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    topCon:{
        marginHorizontal:20
    },
    btnStyle:{borderWidth:1,borderColor:"#2E52A1",alignSelf:"center",justifyContent:"center", paddingHorizontal:10, paddingVertical:5,borderRadius:4},
    customCompCon:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:20
    },
    textStyle:{
        ...customTheme.fonts.smallText,
        color:"#2E52A1"
    }
})

export default Eligibility;
