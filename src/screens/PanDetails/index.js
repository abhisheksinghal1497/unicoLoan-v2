import { Dimensions, Image, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../colors'
import { useTheme } from 'react-native-paper'
import CustomButton from '../../components/Button'
import Header from '../../components/Header'
import { screens } from '../../constants/screens'
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { validations } from "../../constants/validations";
import { Controller, useForm } from "react-hook-form";

const WIDTH = Dimensions.get('window').width;

const PanDetails = (props) => {
  const { fonts } = useTheme();
  const [phone, setPhone] = useState();
  const [isVerified, setIsVerified] = useState(true);
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
      id: "panNumber",
      label: "PAN Number",
      type: component.textInput,
      placeHolder: "Enter Pan Card Number",
      validations: validations.pan,
      isRequired: true,
      data: [],
      value: "",
      showRightComp: true,
      maxLength: 10
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

  const propStyle = (percent) => {
    const base_degrees = -135;
    const rotateBy = base_degrees + (percent * 3.6);
    return {
      transform: [{ rotateZ: `${rotateBy}deg` }]
    };
  }

  const renderThirdLayer = (percent) => {
    if (percent > 50) {
      /**
      * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
      * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
      * before passing to the propStyle function
      **/
      return <View style={[styles.secondProgressLayer, propStyle((percent - 50), 45)]}></View>
    } else {
      return <View style={styles.offsetLayer}></View>
    }
  }

  const CircularProgress = ({ percent }) => {
    let firstProgressLayerStyle;
    if (percent > 50) {
      firstProgressLayerStyle = propStyle(50, -135);
    } else {
      firstProgressLayerStyle = propStyle(percent, -135);
    }

    return (
      <View style={styles.processContainer}>
        <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}>
          <Image source={require('../../assets/home_icon.png')} style={styles.homeIcon} />
        </View>
        {renderThirdLayer(50)}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        title="PAN Details"
        left={require('../../images/back.png')}
        right={require('../../images/question.png')}
        onPressLeft={() => { props.navigation.goBack() }}
        onPressRight={() => { }} />
      <ScrollView>
        <View style={styles.cardContainer}>
          <View style={{ flexGrow: 1 }}>
            <Text style={[fonts.labelMedium, { color: 'rgba(46, 82, 161, 1)' }]}>PAN Details</Text>
            <Text style={[fonts.labelMedium, { color: 'rgba(46, 82, 161, 1)', marginVertical: 5 }]}>LXC537676727</Text>
            <Text style={[fonts.labelSmall, { color: 'rgba(46, 82, 161, 1)' }]}>Housing Loan</Text>
          </View>
          <View style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <CircularProgress percent={30} />
            <Text style={[fonts.smallText, { color: 'rgba(46, 82, 161, 1)', fontSize: 7, marginTop: 10 }]}>UNICO HOUSING FINANCE LIMITED</Text>
          </View>
        </View>
        {mock_data.map((comp, index) => {
          return (index === 0 || (!errors[comp.id] && getValues('panNumber')?.length === 10 && !isVerified)) && (
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
                !errors[comp.id] && getValues('panNumber')?.length === 10 ? isVerified ? (
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
      </ScrollView>
      <CustomButton
        type="primary"
        label="Continue"
        disable={getValues('panNumber')?.length !== 10 || isVerified}
        buttonContainer={styles.buttonContainer}
        onPress={() => { props?.navigation?.navigate(screens.KYC) }} />
    </View>
  )
}

export default PanDetails

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
  subContainer: {
    marginTop: 10,
    flexGrow: 1,
  },
  labelText: {
    marginTop: 10,
  },
  buttonContainer: {
    position: 'absolute',
    width: '95%',
    bottom: 20,
    alignSelf: 'center',
  },
  homeIcon: {
    width: 47,
    aspectRatio: 1.2,
    resizeMode: 'contain',
    transform: [{ rotateZ: '27deg' }],
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: 'rgba(225, 243, 255, 1)',
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  processContainer: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderRadius: 100,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstProgressLayer: {
    width: 100,
    height: 100,
    borderWidth: 10,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: '#ffffff',
    borderBottomColor: '#ffffff',
    borderRightColor: '#ffffff',
    borderTopColor: '#ffffff',
    transform: [{ rotateZ: '-135deg' }],
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondProgressLayer: {
    width: 100,
    height: 100,
    position: 'absolute',
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{ rotateZ: '45deg' }]
  },
  offsetLayer: {
    width: 100,
    height: 100,
    position: 'absolute',
    borderWidth: 10,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#fff',
    borderTopColor: '#fff',
    transform: [{ rotateZ: '-135deg' }]
  }
})