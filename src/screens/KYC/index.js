import { Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { colors } from '../../colors'
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useForm } from "react-hook-form";
import { Modal, useTheme } from 'react-native-paper'
import CustomButton from '../../components/Button'
import Header from '../../components/Header'
import { validations } from "../../constants/validations";
import customTheme from '../../colors/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screens } from '../../constants/screens';
import { useFocusEffect } from '@react-navigation/native';
import ProgressCard from '../../components/ProgressCard'
import { ScrollView } from 'react-native-gesture-handler';
import { uploadOtpMethod ,uploadAdhaarMethod} from "../../services/ApiUtils";



const WIDTH = Dimensions.get('window').width;
const screenName = "Documents"





const KYC = (props) => {

  const [selectedImage, setSelectedImage] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [selectedImageBack, setSelectedImageBack] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const uploadOtpMethodFn = uploadOtpMethod();
  const uploadAdhaarMethodFn = uploadAdhaarMethod();

  useEffect(() => {
    if (uploadOtpMethodFn?.data) {
      alert('Success')
    }
  }, [uploadOtpMethodFn?.data]);

  useEffect(() => {
    if (uploadAdhaarMethodFn?.error) {
      alert("error");
    }
  }, [uploadAdhaarMethodFn?.error]);

  useEffect(() => {
    if (uploadAdhaarMethodFn?.data) {
      alert('Success')
    }
  }, [uploadAdhaarMethodFn?.data]);

  useEffect(() => {
    if (uploadAdhaarMethodFn?.error) {
      alert("error");
    }
  }, [uploadAdhaarMethodFn?.error]);

  console.log(Boolean(selectedImage) && Boolean(selectedImageBack), 'Vaue here')

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    await AsyncStorage.setItem('CurrentScreen', JSON.stringify(screens.KYC));
    const savedData = await AsyncStorage.getItem('FrontAdhaar');
    const currentData = JSON.parse(savedData);
    console.log(currentData, 'front adhaar');
    setSelectedImage(currentData)
    const savedDataBack = await AsyncStorage.getItem('BackAdhaar');
    const currentDataBack = JSON.parse(savedDataBack);
    console.log(currentData, 'front adhaar');
    setSelectedImageBack(currentDataBack)
  }

  const { fonts } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState(0);
  // const {
  //   control,
  //   formState: { errors, isValid },
  // } = useForm({ mode: "onBlur", defaultValues: { otp: "", checkbox: false } });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const mock_data = [
    {
      id: "adhaarNumber",
      label: "Adhaar Number",
      type: component.textInput,
      placeHolder: "Enter Adhaar Card Number",
      validations: validations.aadhar,
      isRequired: true,
      data: [],
      value: "",
      showRightComp: true,
      maxLength: 12
    },
  ];


  const showModal = () => {
    setValue("adhaarNumber", "")
    setValue("otp", "")
    setCaptcha("")
    setVisible(true)
    setType(0)
  };
  const hideModal = () => setVisible(false);

  console.log(getValues('otp')?.length,"Otp values here-->")




  // const startTimer = React.useCallback()

  const TimerContent = () => {
    const [counter, setCounter] = useState(60);
    useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);
    return counter !== 0 ? (
      <View style={styles.timerContainer}>
        <Image source={require('../../images/timer.png')} style={styles.timerImage} />
        <Text
          style={[fonts.bodyRegular, { color: 'rgba(124, 126, 139, 1)', marginTop: 3 }]}>00:{counter < 10 ? `0${counter}` : counter}</Text>
      </View>
    ) : (
      <TouchableOpacity style={styles.timerContainer} onPress={() => setCounter(60)}>
        <Text
          style={[fonts.bodyRegular, { color: 'rgba(46, 82, 161, 1)', marginTop: 3 }]}>Resend</Text>
      </TouchableOpacity>
    )
  }

  const onSubmitOtp = () => {
    hideModal(); setType(0);
    uploadOtpMethodFn.mutate({ "otp": 1234 });
    props.navigation.navigate(screens.CaptureSelfie)
  }
  const onSubmitAdhaar = () => {
    setType(1);
    const AdhaarDetails = getValues('adhaarNumber');
    uploadOtpMethodFn.mutate({ "AdharNumber": AdhaarDetails,"captcha": captcha });
  }

  return (
    <View style={{flex:1}}>
    <ScrollView style={styles.container}>
      <Header
        title="Documents"
        left={require('../../images/back.png')}
        onPressLeft={() => { props?.navigation?.navigate(screens.PanDetails) }}
        right={require('../../images/question.png')}
        onPressRight={() => { }} />
      <ProgressCard screenName={screenName} percentage={10} ImageData={require('../../images/Home.png')} />
      <View style={styles.subContainer}>
        <Text style={[fonts.labelSmall, { width: '100%' }]}>Let's verify your identity quickly</Text>
        <TouchableOpacity onPress={() => { showModal() }} style={{ alignSelf: 'center', marginTop: 15, }}>
          <View style={styles.recommendedContainer}>
            <Text style={[fonts.smallLightText, { color: colors.white }]}>Recommended</Text>
          </View>
          <View style={styles.cardContainer}>
            <Image source={require('../../images/aadhar-front.png')} style={styles.frontImage} />
          </View>
        </TouchableOpacity>
        <Text style={[fonts.labelMedium, { marginTop: 10, color: 'rgba(68, 70, 91, 1)' }]}>Generate E-Aadhaar</Text>
        <Text style={[fonts.labelSmall, { marginTop: 5, lineHeight: 22, textAlign: 'center' }]}>You will receive an OTP on your{'\n'}Aadhaar
          {'\n'}linked mobile number</Text>
        <View style={styles.noteContainer}>
          <Image source={require('../../images/bulb.png')} style={styles.bulbImage} />
          <Text style={fonts.bodySmall}>Choose <Text style={fonts.bodyBold}>e-Aadhaar</Text> to get <Text style={fonts.bodyBold}>special benefits</Text> on Interest Rates!</Text>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.horizonalDivider} />
          <Text style={[fonts.labelSmall, { marginTop: 1, marginHorizontal: 10 }]}>OR</Text>
          <View style={styles.horizonalDivider} />
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => props.navigation.navigate(screens.CaptureAdhaar, { method: "Front" })}>
            <View style={styles.cardContainerTwo}>
              <Image
                source={selectedImage ? { uri: `data:${selectedImage.mime};base64,${selectedImage.data}` } : require('../../images/aadhar-front.png')}
                style={[styles.frontImage]} />
            </View>
            <Text style={[fonts.labelMedium, styles.titleText]}>Upload Your{'\n'}Aadhaar Front{'\n'}Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(screens.CaptureAdhaar, { method: "Back" })} >
            <View style={styles.cardContainerTwo}>
              <Image
                source={selectedImageBack ? { uri: `data:${selectedImageBack.mime};base64,${selectedImageBack.data}` } : require('../../images/aadhar-back.png')}
                style={[styles.frontImage]} />
            </View>
            <Text style={[fonts.labelMedium, styles.titleText]}>Upload Your{'\n'}Aadhaar Back{'\n'}Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton
        type="primary"
        label="Continue"
        buttonContainer={styles.buttonContainer}
        onPress={() => { showModal() }}
        disable={Boolean(selectedImage) && Boolean(selectedImageBack) ? false : true}
      />

      
    </ScrollView >
    <Modal 
      withHandle={false}
        statusBarTranslucent={true}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
         >
        {type === 0 ?
          <View>
             <TouchableOpacity onPress={hideModal} style={{ height: 20, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>    
            <Image source={require('../../images/cross.png')} style={{ height: 20, width: 20 }} />
           </TouchableOpacity>
            {mock_data.map((comp, index) => {
              return (index === 0 || (!errors[comp.id] && getValues('adhaarNumber')?.length === 12 && !isVerified)) && (
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
                    !errors[comp.id] && getValues('adhaarNumber')?.length === 12 ? isVerified ? (
                      <Text>Verify</Text>
                    ) : (
                      <Image
                        source={require("../../images/tick.png")}
                        style={styles.tickImage}
                      />
                    ) : setIsVerified(true)
                  }
                  rightCompPress={() => {
                    setIsVerified(!isVerified);
                  }}
                  isMultiline={comp.isMultiline}
                  maxLength={comp.maxLength}
                  isDisabled={comp.isDisabled}
                />
              );
            })}

            <Text style={[fonts.labelMedium, styles.labelText]}>Enter Captcha</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder='Captcha'
                style={[fonts.inputText, styles.input]}
                onChangeText={(text) => setCaptcha(text)} />
            </View>
            <View style={[styles.rowContainer, { marginBottom: 20, maxWidth: '90%', alignSelf: 'center' }]}>
              <ImageBackground source={require('../../images/captcha-bg.png')} style={styles.captchaContainer}>
                <Text style={[fonts.labelLarge, styles.captchaText]}>iWXn11</Text>
              </ImageBackground>
              <TouchableOpacity style={styles.refreshContiner}>
                <Image source={require('../../images/refresh.png')} style={styles.refreshImage} />
              </TouchableOpacity>
            </View>
            <CustomButton
              type="primary"
              label="Continue"
              buttonContainer={styles.modalButtonContainer}
              disable={getValues('adhaarNumber')?.length !== 12 || isVerified}
              onPress={() => { onSubmitAdhaar() }} />
          </View>
          :
           <View>
            <Text style={[fonts.labelMedium, { marginTop: 10, color: 'rgba(68, 70, 91, 1)', textAlign: 'center' }]}>OTP Verification</Text>
            <Text style={[fonts.labelSmall, { marginTop: 5, lineHeight: 18, textAlign: 'center' }]}>One-Time Password has been sent to{'\n'}your registered Mobile Number.</Text>
            <FormControl
              compType={component.otpInput}
              control={control}
              validations={validations.otp}
              name="otp"
              label="Enter otp"
              errors={errors.leadId}
              isRequired
              setValue={setValue}
              style={styles.otpInputContainer}
              maxLength={6}
            />
            <TimerContent />
            <CustomButton
              type="primary"
              label="Submit"
              buttonContainer={styles.modalButtonContainer}
              disable={getValues('otp')?.length !== 6}
              onPress={() => onSubmitOtp()}
            />
          </View>
        }
      </Modal >
    </View>
  )
}

export default KYC

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: colors.bgColor,
    paddingHorizontal: 16,
  },
  subContainer: {
    flexGrow: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    // position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    marginTop: 30,
    marginBottom: 30
    // bottom: 10
  },
  modalButtonContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  recommendedContainer: {
    width: 140,
    height: 20,
    backgroundColor: '#0076C7',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContainer: {
    width: 140,
    height: 120,
    borderWidth: 1,
    borderColor: 'rgba(189, 197, 208, 0.5)',
    marginTop: -1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardContainerTwo: {
    width: 140,
    height: 140,
    borderWidth: 1,
    borderColor: 'rgba(189, 197, 208, 0.5)',
    // marginTop: -1,
    borderRadius: 20,
  },
  frontImage: {
    width: '100%',
    height: '100%',
    // marginTop: 5,
    marginLeft: -1,
    borderRadius: 10,
  },
  noteContainer: {
    backgroundColor: 'rgba(239, 244, 253, 1)',
    padding: 10,
    width: '100%',
    paddingHorizontal: 20,
    paddingLeft: 40,
    marginTop: 10,
    borderRadius: 10,
  },
  bulbImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    position: 'absolute',
    top: -15,
    left: 8
  },
  horizonalDivider: {
    flexGrow: 1,
    height: 2,
    backgroundColor: 'rgba(192, 192, 192, 1)',
  },
  dividerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  titleText: { marginTop: 10, color: 'rgba(68, 70, 91, 1)', textAlign: 'center' },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15
  },
  modalContainer: {
    width:'100%',
    padding: 20,
    paddingTop: 30,
    backgroundColor: colors.white,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  labelText: {
    marginTop: 10,
  },
  inputContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 50,
    flexDirection: 'row',
    marginVertical: 10,
  },
  input: {
    // flexGrow: 1,
    // marginHorizontal: 5,
    // paddingVertical: 8
    height: '100%',
    width: '100%'
  },
  tickImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  captchaContainer: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  refreshContiner: {
    padding: 10,
    backgroundColor: 'rgba(46, 82, 161, 1)'
  },
  captchaText: {
    color: colors.black,
    marginTop: 4,
    letterSpacing: 20,
  },
  otpInputContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'rgba(232, 232, 234, 1)',
    backgroundColor: customTheme.colors.greyShadow,
    marginLeft: 10,
    height: 60,
    // borderRadius: 10,
    marginVertical: 20,
    // marginTop: 40,
    borderWidth: 2,
    borderColor: '#E8E8EA'
  },
  timerImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain'
  },
  timerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  }
})