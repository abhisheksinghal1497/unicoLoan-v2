import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import ImagePicker from "react-native-image-crop-picker";
import Header from '../../components/Header'
import { assets } from "../../assets/assets";
import { screens } from '../../constants/screens';
import { horizontalScale, verticalScale } from '../../utils/matrcis'
import { colors } from '../../colors'
import customTheme from '../../colors/theme'
import CustomShadow from '../../components/FormComponents/CustomShadow'
import CustomModal from '../../components/CustomModal'
import Button from '../../components/Button'
import { Image } from 'react-native';
import { getOtherKycList, getTempAddressKycList } from '../../services/ApiUtils';

const CurrentAddress = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [imageSelected, setImageSelected] = useState('');
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

  console.log('imageSelected', imageSelected.split('/').pop())

  const handleGalleryUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('image path--', image.path);
      setModalVisible3(false)
      setImageSelected(image.path);
    }).catch(error => {
      console.log('Error:', error);
    });
  }

  const handleCameraUpload = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image.path);
      setModalVisible3(false)
      setImageSelected(image.path);
    }).catch(error => {
      console.log('Error:', error);
    });
  }

  const renderOptions = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => {
          setSelectedItem(item.title);
          setModalVisible(false);
        }}
      >
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const renderOptions2 = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.itemView}
        onPress={() => {
          setSelectedItem2(item.title);
          setModalVisible2(false);
        }}
      >
        <Text style={styles.itemText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  const handleRightIconPress = (index) => {
    if (index === 0) {
        navigation.navigate(screens.FAQ);
    } else if (index === 1) {
        navigation.navigate(screens.HomeScreen);
    } 
};
  return (
    <ScrollView style={{backgroundColor:'#ffff'}} >
      <View style={styles.container}>
        <CustomModal
          showModal={modalVisible}
          setShowModal={setModalVisible}
          centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTxt}> Select one</Text>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={renderOptions}
            />
          </View>
        </CustomModal>

        <CustomModal
          showModal={modalVisible2}
          setShowModal={setModalVisible2}
          centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTxt}> Select one</Text>
            </View>
            <FlatList
              data={data2}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={renderOptions2}
            />
          </View>
        </CustomModal>

        <CustomModal
          showModal={modalVisible3}
          setShowModal={setModalVisible3}
          centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
        >
          <View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTxt}> Select one</Text>
            </View>
            <TouchableOpacity style={styles.itemView} onPress={() => handleGalleryUpload()}>
              <Text style={styles.itemText}>
                Gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemView} onPress={() => handleCameraUpload()}>
              <Text style={styles.itemText}>
                Camera
              </Text>
            </TouchableOpacity>
          </View>
        </CustomModal>

        <View style={{ marginHorizontal: horizontalScale(10) }}>
          {/* <Header
            titleStyle={{ marginLeft: horizontalScale(0) }}
            onPressLeft={() => navigation.navigate('KYCDocuments')}
            colour={colors.transparent}
            left={require('../../../src/assets/backk.png')}
            leftStyle={{ width: 14, height: 13 }}
            title="Upload Documents"
            onPressRight={(index) => {
              if (index === 0) {
                alert("Chat");
              } else if (index === 1) {
                alert("Question");
              }
            }}
            rightImages={[
              { source: require('../../../src/assets/chatt.png'), imageProps: { style: { width: 32, height: 32, marginRight: horizontalScale(8) } } },
              { source: require('../../../src/assets/Question.png'), imageProps: { style: { width: 32, height: 32 } } },
            ]}
          /> */}
      <Header        
       title="Upload Documents"
       left={require('../../images/back.png')}
       rightImages={[{source: assets.chat,},{source: assets.questionRound,},]}
       leftStyle={{height: verticalScale(15),width: verticalScale(15),}}
       leftImageProps={{resizeMode: "contain",}}
       rightStyle={{height: verticalScale(23),width: verticalScale(23),marginHorizontal:10}}
       rightImageProps={{ resizeMode: "contain"}}
       titleStyle={{fontSize: verticalScale(18), }}
       onPressRight={handleRightIconPress}
       onPressLeft={() => {navigation.navigate(screens.KYCDocuments);}}
     />
        </View>

        <View style={[styles.container, { marginHorizontal: horizontalScale(11) }]}>
          <View style={{ marginTop: verticalScale(15) }}>
            <Text style={{ fontWeight: '500', fontSize: 18, lineHeight: 20, color: '#44465B', lineHeight: 21 }}>Please choose the current Address Proof from Below Options.</Text>
          </View>
          <Text style={styles.error}>
            {" "}
          </Text>
          {
            !selectedItem2 ?
              <CustomShadow shadowColor={colors.gray100}>
                <TouchableOpacity
                  style={[
                    styles.selectContainer,
                    styles,
                    {
                      backgroundColor:
                        "transparent",
                    },
                  ]}
                  activeOpacity={1}
                  disabled={imageSelected.split('/').pop() !== "" ? true : false}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <View
                    style={[
                      styles.selectField,
                      { borderColor: colors.error },
                    ]}
                  >
                    <Text
                      style={[
                        { color: "#000" }
                      ]}
                    >
                      {selectedItem ? selectedItem : "Other Kyc"} </Text>
                    <Text style={styles.selectArr}>&#9013;</Text>
                  </View>
                </TouchableOpacity>
              </CustomShadow> : null
          }
          <Text style={styles.error}>
            {" "}
          </Text>
          {
            !selectedItem ?
              <CustomShadow shadowColor={colors.gray100}>
                <TouchableOpacity
                  style={[
                    styles.selectContainer,
                    styles,
                    {
                      backgroundColor:

                        "transparent",
                    },
                  ]}
                  activeOpacity={1}
                  disabled={imageSelected.split('/').pop() !== "" ? true : false}
                  onPress={() => {
                    setModalVisible2(true);
                  }}
                >
                  <View
                    style={[
                      styles.selectField,
                      { borderColor: colors.error },
                    ]}
                  >
                    <Text
                      style={[
                        { color: "#000" }
                      ]}>
                      {selectedItem2 ? selectedItem2 : 'Temperary Address Proof'}
                    </Text>
                    <Text style={styles.selectArr}>&#9013;</Text>
                  </View>
                </TouchableOpacity>
              </CustomShadow> : null
          }

          {(selectedItem || selectedItem2) && (
            <TouchableOpacity
              disabled={imageSelected.split('/').pop() !== "" ? true : false}
              onPress={() => setModalVisible3(true)} style={styles.uploadButton}>
              <Text style={[styles.uploadButtonText, {
                borderColor: imageSelected.split('/').pop() !== "" ? colors.grey : colors.coreBlue,
                color: imageSelected.split('/').pop() !== "" ?  colors.grey : colors.coreBlue,
              }]}> {imageSelected.split('/').pop() !== "" ? 'Uploaded' : 'Upload'}</Text>
            </TouchableOpacity>
          )}

          {(imageSelected !== "") && (
            <><View style={{ borderBottomWidth: 1, borderBottomColor: colors.border, width: ' 100%', alignSelf: 'center', marginVertical: verticalScale(9) }}>
            </View><View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: horizontalScale(5), marginTop: verticalScale(10) }}>
                <Text style={{ color: colors.surface, fontSize: 15, fontWeight: '500' }}>
                  {imageSelected.split('/').pop().slice(0, 24)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(null);
                    setSelectedItem2(null);
                    setImageSelected('');
                  }}
                >
                  <Image
                    source={require('../../../src/assets/cross.png')}
                    resizeMode="contain" />
                </TouchableOpacity>
              </View></>
          )}
          <View style={styles.buttonview}>
            <Button
              onPress={() => {
                alert('Submit')
                console.log('imageSelected submit',imageSelected)
              }}
              type="primary"
              label="Submit"
              disable={imageSelected !== "" ? false : true}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default CurrentAddress

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
  buttonview: {
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(380),
    marginBottom: verticalScale(20)
  },
  itemText: {
    fontWeight: "500",
    color: colors.black,
    fontSize: 18,
  },
  modalHeader: {
    paddingVertical: 10,
  },
  modalHeaderTxt: {
    fontWeight: "500",
    fontSize: 18,
    color: colors.black,
    marginLeft: horizontalScale(5)
  },
  uploadButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: verticalScale(20),
  },
  uploadButtonText: {
    fontSize: 10,
    fontWeight: '400',
    alignSelf: 'center',
    borderWidth: 1,
    paddingHorizontal: 24.5,
    paddingVertical: 6.8,
    borderRadius: 4,
  },
  itemView: {
    padding: 10,
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
  selectContainer: {
    backgroundColor: customTheme.colors.textInputBackground,
    padding: 13,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
})