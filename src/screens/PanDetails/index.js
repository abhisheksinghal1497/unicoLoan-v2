import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import { colors } from '../../colors'
import { useTheme } from 'react-native-paper'
import CustomButton from '../../components/Button'
import Header from '../../components/Header'
import { screens } from '../../constants/screens'
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;

const PanDetails = (props) => {
  const { fonts } = useTheme();
  const [pan, setPan] = useState('');
  const [dataFields, setdataFields] = useState([]);
  // const [message, setMessage] = useState('12345');

  useEffect(() => {
    async function fetchData() {
      await AsyncStorage.setItem('CurrentScreen', JSON.stringify(screens.PanDetails));
      const savedData = await AsyncStorage.getItem('PanDetails');
      const currentData = JSON.parse(savedData);
      console.log(currentData,'current value');
      setPan(currentData.toString())
      setdataFields(currentData)
    }
    fetchData();
  }, []);


  const onSubmit = async() =>{
    props?.navigation?.navigate(screens.KYC)
  }

  const OnChangePan = async(pan) =>{
    console.log(pan,'pan here')
    setPan(pan)
    await AsyncStorage.setItem('PanDetails', JSON.stringify(pan));
    await AsyncStorage.setItem('CurrentScreen', JSON.stringify(screens.PanDetails));
  }

  return (
    <View style={styles.container}>
      <Header
        title="PAN Details"
        left={require('../../images/back.png')}
        right={require('../../images/question.png')}
        onPressLeft={() => { props?.navigation?.navigate(screens.ApplicantDetails) }}
        onPressRight={() => { }} />
      <View style={styles.subContainer}>
        <Text style={fonts.labelMedium}>PAN Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value= {pan}
            placeholder='PAN Number'
            style={[fonts.inputText, styles.input]}
            onChangeText={(text) => OnChangePan(text)} />
          <Image source={require('../../images/tick.png')} style={styles.tickImage} />
        </View>
        {/* <Text style={[fonts.labelMedium, styles.labelText]}>PAN</Text> */}
        {/* <View style={styles.inputContainer}>
          <TextInput
            placeholder='Enter your name'
            style={[fonts.inputText, styles.input]}
            onChangeText={(text) => setPan(text)} />
        </View>
        <Text style={[fonts.labelMedium, styles.labelText]}>DOB</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Select your date of birth'
            style={[fonts.inputText, styles.input]}
            onChangeText={(text) => setPan(text)} />
        </View> */}
        <CustomButton
          type="primary"
          label="Continue"
          buttonContainer={styles.buttonContainer}
          onPress={() => { onSubmit()}} />
      </View>
    </View>
  )
}

export default PanDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
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
    width: '100%',
    bottom: 10
  }
})