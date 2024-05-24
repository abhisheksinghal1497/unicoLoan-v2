import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import ImagePicker from "react-native-image-crop-picker";
import Header from '../../components/Header'
import { horizontalScale, verticalScale } from '../../utils/matrcis'
import { colors } from '../../colors'
import customTheme from '../../colors/theme'
import CustomShadow from '../../components/FormComponents/CustomShadow'
import CustomModal from '../../components/CustomModal'
import Button from '../../components/Button'
import { Image } from 'react-native';

const data = [
  {
    id: '1',
    title: "Driving License"
  },
  {
    id: '2',
    title: "Passport"
  },
  {
    id: '3',
    title: "Voter ID"
  },
  {
    id: '4',
    title: "NREGA Card"
  }
];

const data2 = [
  {
    id: '1',
    title: "Electricity Bill"
  },
  {
    id: '2',
    title: "Gas Bill"
  },
  {
    id: '3',
    title: "Mobile Bill"
  },
];

const CurrentAddress = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [imageSelected, setImageSelected] = useState('');

  console.log('imageSelected', imageSelected.split('/').pop())

  const handleGalleryUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
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

  return (
    <ScrollView >
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
          <Header
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
                borderColor: imageSelected.split('/').pop() !== "" ? "grey" : "#2E52A1",
                color: imageSelected.split('/').pop() !== "" ? "grey" : "#2E52A1",
              }]}> {imageSelected.split('/').pop() !== "" ? 'Uploaded' : 'Upload'}</Text>
            </TouchableOpacity>
          )}

          {(imageSelected !== "") && (
            <><View style={{ borderBottomWidth: 1, borderBottomColor: '#606060', width: ' 100%', alignSelf: 'center', marginVertical: verticalScale(9) }}>
            </View><View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: horizontalScale(5), marginTop: verticalScale(10) }}>
                <Text style={{ color: '#0076C7', fontSize: 15, fontWeight: '500' }}>
                  {imageSelected.split('/').pop()}
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
              }}
              type="primary"
              label="Submit"
              disable={!imageSelected !== "" ? true : false}
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