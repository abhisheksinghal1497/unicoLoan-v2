import { Dimensions, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect,useCallback } from 'react'
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
import { screens } from '../../constants/screens';
import { KycScreen } from '../../constants/stringConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const WIDTH = Dimensions.get('window').width;



const KYC = (props) => {
  const [selectedImage, setSelectedImage] = useState('');
  // useEffect(() => {
    // async function fetchData() {
    //   // await AsyncStorage.setItem('FrontAdhaar', JSON.stringify(screens.KYC));
    //   const savedData = await AsyncStorage.getItem('FrontAdhaar');
    //   const currentData = JSON.parse(savedData);
    //   console.log(currentData, 'front adhaar');
    // }
    // fetchData();
  // }, []);
  useFocusEffect(
    useCallback(() => {
      // async function fetchData() {
      //   await AsyncStorage.setItem('CurrentScreen', JSON.stringify(screens.KYC));
      //   const savedData = await AsyncStorage.getItem('FrontAdhaar');
      //   const currentData = JSON.parse(savedData);
      //   console.log(currentData, 'front adhaar');
      //   // setSelectedImage(currentData)
      // }
      fetchData();

    }, [])
  );

const fetchData = async() =>{
  await AsyncStorage.setItem('CurrentScreen', JSON.stringify(screens.KYC));
  const savedData = await AsyncStorage.getItem('FrontAdhaar');
  const currentData = JSON.parse(savedData);
  console.log(currentData, 'front adhaar');
  setSelectedImage(currentData)
}

  const { fonts } = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState(0);
  const [captcha, setCaptcha] = React.useState('');
  const [isVerifiedOne, setIsVerifiedOne] = useState(true);
  const [isVerifiedTwo, setIsVerifiedTwo] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    getFieldState,
    panNumber,
    setValue,
    clearErrors
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  const onSubmit = async() =>{
    props.navigation.navigate(screens.CaptureSelfie)
  }

  // const startTimer = React.useCallback()

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const mock_data = [
    {
      id: "aadharNumber",
      label: "Aadhar Number",
      type: component.textInput,
      placeHolder: "XXXX-XXXX-XXXX",
      validations: validations.aadhar,
      isRequired: true,
      data: [],
      value: "",
      showRightComp: true,
      maxLength: 12,
      isVerified: isVerifiedOne,
      setIsVerified: setIsVerifiedOne,
      onFocus: () => {clearErrors()}
    },
    {
      id: "captcha",
      label: "Captcha",
      type: component.textInput,
      placeHolder: "Enter Captcha",
      value: "",
      isRequired: true,
      data: [],
      maxLength: 6,
      showRightComp: true,
      isVerified: isVerifiedTwo,
      setIsVerified: setIsVerifiedTwo,
      onFocus: () => {clearErrors()}
    },
  ];

  useEffect(() => {
    generateString(6);
  }, [])

  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setCaptcha(result);
    // return result;
  }

  const TimerContent = () => {
    const [counter, setCounter] = React.useState(60);
    React.useEffect(() => {
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
          style={[fonts.bodyRegular, { color: 'rgba(46, 82, 161, 1)', marginTop: 3 }]}>{KycScreen.resend}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Header
        title="Documents"
        left={require('../../images/back.png')}
        onPressLeft={() => { props?.navigation?.navigate(screens.PanDetails) }}
        right={require('../../images/question.png')}
        onPressRight={() => { }} />
      <View style={styles.subContainer}>
        <Text style={[fonts.labelSmall, { width: '100%' }]}>{KycScreen.topLabel}</Text>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => showModal()}>
          <View style={{ alignSelf: 'center', marginTop: 15 }}>
            <View style={styles.recommendedContainer}>
              <Text style={[fonts.smallLightText, { color: colors.white }]}>{KycScreen.recommended}</Text>
            </View>
            <View style={styles.cardContainer}>
              <Image source={require('../../images/aadhar-front.png')} style={[styles.frontImage, { marginTop: 5, marginLeft: -1, }]} />
            </View>
          </View>
          <Text style={[fonts.labelMedium, { marginTop: 10, color: 'rgba(68, 70, 91, 1)' }]}>{KycScreen.eCardTitle}</Text>
          <Text style={[fonts.labelSmall, { marginTop: 5, lineHeight: 22, textAlign: 'center' }]}>{KycScreen.eCardSubTitle}</Text>
        </TouchableOpacity>
        <View style={styles.noteContainer}>
          <Image source={require('../../images/bulb.png')} style={styles.bulbImage} />
          <Text style={fonts.bodySmall}>Choose <Text style={fonts.bodyBold}>e-Aadhaar</Text> to get <Text style={fonts.bodyBold}>special benefits</Text> on Interest Rates!</Text>
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.horizonalDivider} />
          <Text style={[fonts.labelSmall, { marginTop: 1, marginHorizontal: 10 }]}>{KycScreen.or}</Text>
          <View style={styles.horizonalDivider} />
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={() => props.navigation.navigate(screens.CaptureAdhaar, { method: "Front" })}>
            <View style={styles.cardContainerTwo}>
              <Image
               source={selectedImage ? {uri :  `data:${selectedImage.mime};base64,${selectedImage.data}` } : require('../../images/aadhar-front.png')}
                style={[styles.frontImage, { marginTop: 20 }]} />
            </View>
            <Text style={[fonts.labelMedium, styles.titleText]}>{KycScreen.frontCardTitle}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate(screens.CaptureAdhaar, { method: "Back" })} >
            <View style={styles.cardContainerTwo}>
              <Image source={require('../../images/aadhar-back.png')} style={[styles.frontImage]} />
            </View>
            <Text style={[fonts.labelMedium, styles.titleText]}>{KycScreen.backCardTitle}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton
        type="primary"
        label="Continue"
        buttonContainer={styles.buttonContainer}
        onPress={() => { }} />
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
        {type === 0 ? <View>
          {mock_data.map((comp, index) => {
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
                showRightComp={comp.showRightComp || false}
                rightComp={() =>
                  !errors[comp.id] && getValues(comp.id)?.length === comp?.maxLength ? comp.isVerified ? (
                    <Text>Verify</Text>
                  ) : (
                    <Image
                      source={require("../../images/tick.png")}
                      style={styles.tickImage}
                    />
                  ) : comp.setIsVerified(true)
                }
                rightCompPress={() => {
                  if(comp.id === 'captcha') {if(getValues('captcha')?.replace(/\s/g, '') === captcha?.replace(/\s/g, '')) {
                      comp.setIsVerified(!comp.isVerified);
                    }
                  } else {
                    comp.setIsVerified(!comp.isVerified);
                  }
                }}
                isMultiline={comp.isMultiline}
                maxLength={comp.maxLength}
                isDisabled={comp.isDisabled}
                onFocus={comp.onFocus}
              />
            );
          })}
          <View style={[styles.rowContainer, { marginBottom: 20, maxWidth: '90%', alignSelf: 'center' }]}>
            <ImageBackground source={require('../../images/captcha-bg.png')} style={styles.captchaContainer}>
              <Text style={[fonts.labelLarge, styles.captchaText]}>{captcha}</Text>
            </ImageBackground>
            <TouchableOpacity style={styles.refreshContiner} onPress={() => generateString(6)}>
              <Image source={require('../../images/refresh.png')} style={styles.refreshImage} />
            </TouchableOpacity>
          </View>
          <CustomButton
            type="primary"
            label="Continue"
            disable={getValues('aadharNumber')?.length !== 12 || isVerifiedOne || isVerifiedTwo}
            buttonContainer={styles.modalButtonContainer}
            onPress={() => { setType(1) }} />
        </View>
          : <View>
            <Text style={[fonts.labelMedium, { marginTop: 10, color: 'rgba(68, 70, 91, 1)', textAlign: 'center' }]}>{KycScreen.otpTitle}</Text>
            <Text style={[fonts.labelSmall, { marginTop: 20, lineHeight: 18, textAlign: 'center' }]}>{KycScreen.otpSubTitle}</Text>
            <FormControl
              compType={component.otpInput}
              control={control}
              validations={validations.text}
              name="otp"
              label="Enter otp"
              errors={errors.leadId}
              isRequired
              // placeholder="Enter Lead Id"
              style={styles.otpInputContainer}
            />
            <TimerContent />
            <CustomButton
              type="primary"
              label="Submit"
              buttonContainer={styles.modalButtonContainer}
              onPress={() => { hideModal(); setType(0);onSubmit()}} />
          </View>}
      </Modal >
    </View >
  )
}

export default KYC

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  subContainer: {
    flexGrow: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: '90%',
    bottom: 10
  },
  modalButtonContainer: {
    alignSelf: 'center',
    width: '90%',
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainerTwo: {
    width: 140,
    height: 140,
    borderWidth: 1,
    borderColor: 'rgba(189, 197, 208, 0.5)',
    marginTop: -1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  frontImage: {
    width: 96,
    height: 67,
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
    width: '100%',
    padding: 20,
    paddingTop: 40,
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
    flexGrow: 1,
    marginHorizontal: 5,
    paddingVertical: 8
  },
  tickImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  captchaContainer: {
    height: 50,
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
    padding: 15,
    backgroundColor: 'rgba(46, 82, 161, 1)'
  },
  captchaText: {
    color: colors.black,
    letterSpacing: 20,
    width: '80%',
  },
  otpInputContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(232, 232, 234, 1)',
    backgroundColor: customTheme.colors.textInputBackground,
    marginLeft: 10,
    height: 50,
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginVertical: 20,
    marginTop: 40,
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