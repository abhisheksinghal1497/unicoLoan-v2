import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { assets } from "../../assets/assets";
import customTheme from "../../colors/theme";
import CustomButton from "../../components/Button";
import Header from "../../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screens } from '../../constants/screens';
import { useFocusEffect } from '@react-navigation/native';
import CustomModal from "../../components/CustomModal";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { colors } from "../../colors";
import CustomShadow from "../../components/FormComponents/CustomShadow";
import { FlatList } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { getOtherKycList, getTempAddressKycList } from "../../services/ApiUtils";

const KYCDocuments = ({ navigation }) => {

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageBack, setSelectedImageBack] = useState('');
  const [selectedImageSelfie, setSelectedImageSelfie] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])

  const [isLoading, setIsLoading] = useState(true);

  const otherkyc = getOtherKycList()
  const TempKyc = getTempAddressKycList()

  useEffect(()=>{
    otherkyc?.mutate()
    TempKyc?.mutate()
  },[])

  useEffect(()=>{
    if(otherkyc.data){
      setIsLoading(false)
      setData(otherkyc.data)
    }
  },[otherkyc.data])

  useEffect(()=>{
    if(TempKyc.data){
      setIsLoading(false)
      setData2(TempKyc.data)
    }
  },[TempKyc.data])

  useEffect(()=>{
    if(otherkyc.error){
      Alert.alert(otherkyc.error)
    }
  },[otherkyc.error])

  useEffect(()=>{
    if(TempKyc.error){
      Alert.alert(TempKyc.error)
    }
  },[TempKyc.error])

  console.log('selectedItem', selectedItem?.title)
 
 
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
    const savedSelfie = await AsyncStorage.getItem('selfieCapture')
    const currentDataSelfie = JSON.parse(savedSelfie)
    setSelectedImageSelfie(currentDataSelfie)
  }

  return (
    <ScrollView>

      {/* same address Yes/No selection Modal */}
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <TouchableOpacity style={{}} onPress={() => setShowModal(!showModal)}>
          <View style={[{ paddingVertical: verticalScale(10) }]}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center', textAlign: 'center' }}>Is Current Address is same as in Aadhaar?</Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: verticalScale(10) }}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate(screens.CongratulationScreen);
                  setShowModal(false);
                }}
                  style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('CurrentAddress')} style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </CustomModal>

    
     

{/* select Gallery or Camera to uplaod Document Dropdown*/}
    

      <Header
        title="KYC Documents"
        left={require('../../images/back.png')}
        onPressLeft={() => { navigation?.navigate(screens.PanDetails) }}
        right={require('../../images/question.png')}
        onPressRight={() => { }} />
      <View style={styles.topCon}>
        <Image source={assets.protection} />
        <Text>
          Your data is 100% secure. We do not sell or misuse your personal data.
          Read our Privacy Policy
        </Text>
      </View>

      <View style={styles.con2}>
        <CustomImageContainer selectedImage={selectedImage} />
        <CustomImageContainer selectedImage={selectedImageBack} />
      </View>
      <SuccessText Successtext ={"E-Addhaar Successfully Verified"} />
      <View style={styles.con3} />
      <View style={styles.con4}>
        {/* <CustomImageContainer selectedImage={selectedImageSelfie} /> */}
        {/* <SuccessText /> */}
          <View style={styles.customCon}>
      <View
        style={{
          borderColor: "#e1e3e8",
          alignItems: "center",
          borderWidth: 1,
          paddingVertical: 50,
          width: "100%",
          borderRadius: 20,
          backgroundColor:'#E6E6E6',borderRadius:10
        }}
      >
        <Image
        source={selectedImage ? {uri :  `data:${selectedImage?.mime};base64,${selectedImage?.data}` } : require('../../images/aadhar-front.png')}
        style={{height:100,width:100}}
        resizeMode="cover"
        //  source={assets.aadhar_front}
         />
      </View>
      <Text style={styles.conText1}>Upload Your Selfie</Text>
      
    </View>
    <SuccessText Successtext ={"Verified"} /> 
        <CustomButton
          type="primary"
          label="Confirm and Continue"
          onPress={() => {
            setShowModal(true);
          }}
          buttonContainer={{ width: "100%", marginTop: 20 }}
        />
      </View>
    </ScrollView>
  );
};

const CustomImageContainer = ({ selectedImage }) => {
  return (
    <View style={styles.customCon}>
      <View
        style={styles.customInnCon}
      >
        <Image
          source={selectedImage ? { uri: `data:${selectedImage?.mime};base64,${selectedImage?.data}` } : require('../../images/aadhar-front.png')}
          style={{ height: 100, width: 100 }}
          resizeMode="cover"
        //  source={assets.aadhar_front}
        />
      </View>
      <Text style={styles.conText1}>Upload Your Aadhaar Front Photo</Text>
    </View>
  );
};

const SuccessText = ({Successtext}) => {
  return (
    <View style={styles.successCon}>
      <Image source={assets.tick} />
      <Text style={styles.successText}>{Successtext}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
    paddingHorizontal: 16,
  },
  topCon: {
    flexDirection: "row",
    backgroundColor: "#EEF4FD",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 10,
    marginHorizontal: horizontalScale(20),
  },
  modalHeader: {
    paddingVertical: 10,
  },
  modalHeaderTxt: {
    fontWeight: "bold",
    fontSize: 18,
  },
  itemView: {
    padding: 10,
  },
  itemText: {
    ...customTheme.fonts.regularText,
    color: colors.black,
  },
  label: {
    ...customTheme.fonts.regularText,
    color: customTheme.colors.labelColor
  },
  container: {
    marginHorizontal: 5,
    marginTop: 10,
    paddingBottom: 0,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 6,
    marginTop: 5,
  },
  selectContainer: {
    backgroundColor: customTheme.colors.textInputBackground,
    padding: 13,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  selectArr: {
    fontSize: 18,
    color: colors.black,
    fontWeight: "900",
  },
  asterisk: {
    color: colors.asteriskRequired,
  },
  selectField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
  },
  cancelButton: {
    alignSelf: "center",
    marginTop: verticalScale(15),
    padding: 7,
    paddingHorizontal: horizontalScale(25),
    borderRadius: 10,
    backgroundColor: colors.coreBlue,
  },
  titleText: {
    alignSelf: 'center'
  },
  conText1: {
    color: "#44465B",
    ...customTheme.fonts.regularText,
    textAlign: "center",
    marginTop: 10,
  },
  con2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  con3: { height: 1, width: "100%", backgroundColor: "#C0C0C0" },
  con4: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  customCon: { width: "49%", alignItems: "center" },
  customInnCon: {
    borderColor: "#e1e3e8",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 50,
    width: "100%",
    borderRadius: 20,
    

  },
  successCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  successText: {
    ...customTheme.fonts.regularText,
    color: "#0F9D58",
    marginLeft: 10,
  },
});

export default KYCDocuments;
