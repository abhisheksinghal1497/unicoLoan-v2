import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../colors'
import { Modal, useTheme } from 'react-native-paper'
import CustomButton from '../../components/Button'
import Header from '../../components/Header'
import { screens } from '../../constants/screens';

const WIDTH = Dimensions.get('window').width;

const KYC = (props) => {
  const { fonts } = useTheme();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  return (
    <View style={styles.container}>
      <Header title="Documents" navigation={props.navigation} />
      <View style={styles.subContainer}>
        <Text style={[fonts.labelSmall, { width: '100%' }]}>Let's verify your identity quickly</Text>
        <View style={{ alignSelf: 'center', marginTop: 15 }}>
          <View style={styles.recommendedContainer}>
            <Text style={[fonts.smallLightText, { color: colors.white }]}>Recommended</Text>
          </View>
          <View style={styles.cardContainer}>
            <Image source={require('../../images/aadhar-front.png')} style={styles.frontImage} />
          </View>
        </View>
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
          <TouchableOpacity  onPress={() => props.navigation.navigate(screens.CaptureAdhaar, { method: "Front" }) }>
            <View style={styles.cardContainerTwo}>
              <Image source={require('../../images/aadhar-front.png')} style={[styles.frontImage, { marginTop: 20 }]} />
            </View>
            <Text style={[fonts.labelMedium, styles.titleText]}>Upload Your{'\n'}Aadhaar Front{'\n'}Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => props.navigation.navigate(screens.CaptureAdhaar, { method: "Back" }) } >
            <View style={styles.cardContainerTwo}>
              <Image source={require('../../images/aadhar-back.png')} style={[styles.frontImage, { marginTop: 20 }]} />
            </View>
            <Text style={[fonts.labelMedium, styles.titleText]}>Upload Your{'\n'}Aadhaar Back{'\n'}Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomButton
        type="primary"
        label="Continue"
        buttonContainer={styles.buttonContainer}
        onPress={() => { showModal() }} />
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
        <Text style={[fonts.labelMedium, styles.labelText]}>Aadhaar Number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='XXXX-XXXX-XXXX'
            style={[fonts.inputText, styles.input]}
            onChangeText={(text) => setPhone(text)} />
            <Image source={require('../../images/tick.png')} style={styles.tickImage} />
        </View>
        <Text style={[fonts.labelMedium, styles.labelText]}>Enter Captcha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Captcha'
            style={[fonts.inputText, styles.input]}
            onChangeText={(text) => setPhone(text)} />
        </View>
        <View style={[styles.rowContainer, {marginBottom: 20}]}>
          <View style={styles.captchaContainer} />
          <TouchableOpacity style={styles.refreshContiner}>
            <Image source={require('../../images/refresh.png')} style={styles.refreshImage} />
          </TouchableOpacity>
        </View>
        <CustomButton
          type="primary"
          label="Continue"
          buttonContainer={styles.modalButtonContainer}
          onPress={() => { hideModal() }} />
      </Modal>
    </View>
  )
}

export default KYC

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
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
    width: '100%',
    bottom: 10
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
    marginTop: -1,
    borderRadius: 20,
  },
  frontImage: {
    width: 96,
    height: 67,
    marginTop: 5,
    marginLeft: -1,
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
    height: 40,
    flexGrow: 1,
    backgroundColor: 'rgba(68, 70, 91, 1)'
  },
  refreshImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  refreshContiner: {
    padding: 10,
    backgroundColor: 'rgba(46, 82, 161, 1)'
  }
})