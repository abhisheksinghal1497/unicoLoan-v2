import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../colors";
import { ActivityIndicator } from "react-native-paper";
import CustomButton from "../../components/Button";
import Header from "../../components/Header";
import { screens } from "../../constants/screens";
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { validations } from "../../constants/validations";
import { useForm } from "react-hook-form";
import ProgressCard from "../../components/ProgressCard";
import HelpModal from "../ApplicationDetails/component/HelpModal";
import { verifyPanApi, submitPanApi } from "../../services/ApiUtils";
import { toast } from "../../utils/functions";

const WIDTH = Dimensions.get("window").width;
const screenName = "PAN Details";

const PanDetails = (props) => {
  const [isVerified, setIsVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [message, setMessage] = useState('12345');
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    watch,
    setValue,
    trigger,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });
  const { mutateAsync, isPending } = verifyPanApi();
  const { mutateAsync: mutateAsyncSubmit, isPending: isPendingSubmit } =
    submitPanApi();

  const toggleModal = () => setShowModal(!showModal);

  const mock_data = [
    {
      id: "panNumber",
      label: "PAN Number",
      type: component.textInput,
      placeHolder: "Enter Pan Card Number",
      validations: validations.pan,
      isRequired: true,
      data: [],
      value: "",
      showRightComp: true,
      maxLength: 10,
    },
    {
      id: "name",
      label: "Name",
      type: component.textInput,
      placeHolder: "Enter Your Name",
      value: "",
    },
    {
      id: "dob",
      label: "DOB",
      type: component.textInput,
      placeHolder: "Enter Your Date of Birth",
      value: "",
    },
  ];

  const verifyPanBtn = async () => {
    try {
      if (isVerified || isPending) {
        return;
      }
      const isValid = await trigger();
      if (!isValid) {
        toast("error", "Value is invalid");
        return;
      }
      const { panNumber } = watch();
      await mutateAsync({ panNumber, success: true });
      toast("success", "Pan verified successfully");
      setIsVerified(true);
    } catch (error) {
      const { message } = error;
      const errorMsg = message || "Pan is not valid";
      toast("error", errorMsg);
      setError("panNumbRr", errorMsg);
    }
  };

  const submitPan = async () => {
    try {
      if(isPendingSubmit){
        return;
      }
      const isValid = await trigger();
      if(!isValid){
        toast('error', "Some error occurred");
      }
      const data = watch();
      const response = await mutateAsyncSubmit(data);
      console.log('RESPONSE---', response)
      props?.navigation?.navigate(screens.KYC);
    } catch (error) {
      toast('error', "Some error occurred");
    }
  }

  return (
    <View style={styles.container}>
      <HelpModal
        toggleModal={toggleModal}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <Header
        title={screenName}
        left={require("../../images/back.png")}
        right={require("../../images/question.png")}
        onPressLeft={() => {
          props?.navigation?.navigate(screens.ApplicantDetails);
        }}
        onPressRight={toggleModal}
      />
      <ScrollView>
        <ProgressCard screenName={screenName} />
        {mock_data.map((comp, index) => {
          return (
            (index === 0 ||
              (!errors[comp.id] &&
                getValues("panNumber")?.length === 10 &&
                isVerified)) && (
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
                showRightComp={comp.showRightComp || false}
                rightComp={() =>
                  !errors[comp.id] && isValid ? (
                    !isVerified ? (
                      isPending ? (
                        <ActivityIndicator size={"small"} />
                      ) : (
                        <Text>Verify</Text>
                      )
                    ) : (
                      <Image
                        source={require("../../images/tick.png")}
                        style={styles.tickImage}
                      />
                    )
                  ) : (
                    <></>
                  )
                }
                rightCompPress={verifyPanBtn}
                isMultiline={comp.isMultiline}
                maxLength={comp.maxLength}
                isDisabled={comp.isDisabled}
              />
            )
          );
        })}
      </ScrollView>
      <CustomButton
        type="primary"
        label="Continue"
        disable={!isVerified}
        buttonContainer={styles.buttonContainer}
        onPress={submitPan}
        isLoading={isPendingSubmit}
      />
    </View>
  );
};

export default PanDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  inputContainer: {
    backgroundColor: colors.bgColor,
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 50,
    flexDirection: "row",
    marginVertical: 10,
  },
  input: {
    flexGrow: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
  },
  tickImage: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  subContainer: {
    marginTop: 10,
    flexGrow: 1,
  },
  labelText: {
    marginTop: 10,
  },
  buttonContainer: {
    position: "absolute",
    width: "95%",
    bottom: 20,
    alignSelf: "center",
  },
  homeIcon: {
    width: 47,
    aspectRatio: 1.2,
    resizeMode: "contain",
    transform: [{ rotateZ: "27deg" }],
  },
  processContainer: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderRadius: 100,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  firstProgressLayer: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderRadius: 100,
    position: "absolute",
    borderLeftColor: "#ffffff",
    borderBottomColor: "#ffffff",
    borderRightColor: "#ffffff",
    borderTopColor: "#ffffff",
    transform: [{ rotateZ: "-135deg" }],
    justifyContent: "center",
    alignItems: "center",
  },
  secondProgressLayer: {
    width: 100,
    height: 100,
    position: "absolute",
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#3498db",
    borderTopColor: "#3498db",
    transform: [{ rotateZ: "45deg" }],
  },
  offsetLayer: {
    width: 100,
    height: 100,
    position: "absolute",
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#fff",
    borderTopColor: "#fff",
    transform: [{ rotateZ: "-135deg" }],
  },
});
