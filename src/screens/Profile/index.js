import { ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { Text, useTheme } from "react-native-paper";
import { validations } from "../../constants/validations";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { styles } from "../ApplicationDetails/styles/ApplicationDetailStyle";
import Header from "../../components/Header";
import { assets } from "../../assets/assets";
import { getUserDetailQuery } from "./../../services/ApiUtils";
import DimensionUtils from "../../utils/DimensionUtils";
import Loader from "../../components/Loader";
import { toast } from "../../utils/functions";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";

export default function ApplicationDetails(props) {
  const [{ data = {}, isLoading, isError }] = getUserDetailQuery();
  const navigation = useNavigation()
  const { colors } = useTheme();
  const style = styles(colors);
  const goBack = () => props.navigation.goBack();

  const mock_data = [
    {
      id: "dob",
      label: "Date of Birth",
      type: component.textInput,
      placeHolder: "Enter Date of Birth",
      validations: validations.name,
      value: "19/08/1992",
      isDisabled: true,
    },
    {
      id: "MobileNumber",
      label: "Mobile Number",
      type: component.textInput,
      placeHolder: "Enter Mobile Number",
      validations: validations.nameWithoutRequired,
      value: "+91-9768787667",
      isDisabled: true,
    },
    {
      id: "PAN",
      label: "PAN Number",
      type: component.textInput,
      placeHolder: "Enter PAN Number",
      validations: validations.name,
      value: "CHIPA7867J",
      isDisabled: true,
    },
  ];

  const {
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (isError) {
      toast("error", "Some error occurred");
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      const { dob, pan, phone } = data;
      if (dob) {
        setValue("dob", dob);
      }

      if (phone) {
        setValue("MobileNumber", phone);
      }

      if (pan) {
        setValue("PAN", pan);
      }
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  const { email, firstName, lastName, profile } = data;

  const Container = ({ children }) => {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
              <Header
        title="Profile"
        left={assets.back}
        // rightImages={[
        //   { source: assets.chat },
        //   { source: assets.questionRound },
        // ]}
        leftStyle={{ height: verticalScale(15), width: verticalScale(15) }}
        leftImageProps={{ resizeMode: "contain" }}
        // rightStyle={{
        //   height: verticalScale(23),
        //   width: verticalScale(23),
        //   marginHorizontal: 10,
        // }}
        rightImageProps={{ resizeMode: "contain" }}
        titleStyle={{ fontSize: verticalScale(18) }}
        onPressLeft={() => {
          navigation.goBack()
        }}
      />
        <View
          style={{
            paddingHorizontal: horizontalScale(15),
            marginTop: verticalScale(10),
          }}
        >
  
        </View>
        {isError ? <Text>Some error occurred</Text> : children}
      </View>
    );
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={style.scrollviewStyle}>
        <View
          style={{ marginHorizontal: DimensionUtils.pixelSizeHorizontal(15) }}
        >
          <View
            style={{
              alignItems: "center",
              marginBottom: DimensionUtils.pixelSizeVertical(20),
            }}
          >
            <FastImage
              source={{ uri: profile }}
              resizeMode="cover"
              style={{
                width: DimensionUtils.pixelSizeVertical(140),
                height: DimensionUtils.pixelSizeVertical(140),
                borderRadius: DimensionUtils.pixelSizeVertical(140) / 2,
              }}
            />

            <Text
              style={{
                color: "#44465B",
                marginTop: DimensionUtils.pixelSizeVertical(22),
                marginBottom: DimensionUtils.pixelSizeVertical(12),
                fontSize: DimensionUtils.fontPixel(28),
              }}
            >
              {firstName} {lastName}
            </Text>
            <Text style={{ color: "#9EA0A4", fontSize: DimensionUtils.fontPixel(18), }}>{email}</Text>
          </View>

          {mock_data.map((comp) => {
            return (
              <FormControl
                key={comp.id}
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
                type={comp.keyboardtype}
              />
            );
          })}
        </View>
      </ScrollView>
    </Container>
  );
}
