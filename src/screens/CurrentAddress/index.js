import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, TextInput, Image } from 'react-native';
import ImagePicker from "react-native-image-crop-picker";
import Header from '../../components/Header';
import { assets } from "../../assets/assets";
import { screens } from '../../constants/screens';
import { horizontalScale, verticalScale } from '../../utils/matrcis';
import { colors } from '../../colors';
import customTheme from '../../colors/theme';
import CustomShadow from '../../components/FormComponents/CustomShadow';
import Button from '../../components/Button';
import { getOtherKycList, getTempAddressKycList } from '../../services/ApiUtils';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CurrentAddress = ({ navigation }) => {
  const [imageSelected, setImageSelected] = useState('');
  const [activeSections, setActiveSections] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');

  const otherkyc = getOtherKycList();
  const TempKyc = getTempAddressKycList();

  const options = [
    {
      id: 1,
      title: 'Other Kyc',
      items: [
        { title: 'Driving License', fields: ['License Number', 'Expiry Date'] },
        { title: 'Passport', fields: ['Passport Number', 'Country of Issue'] },
        { title: 'Voter ID', fields: ['Voter ID Number', 'State of Issue'] },
        { title: 'NREGA Card', fields: ['Card Number', 'Date of Issue'] }
      ]
    },
    {
      id: 2,
      title: 'Temporary Address Proof',
      items: [
        { title: 'Electricity Bill', fields: ['Bill Number', 'Bill Date'] },
        { title: 'Gas Bill', fields: ['Gas Bill Number', 'Connection Date'] },
        { title: 'Mobile Bill', fields: ['Mobile Bill Number', 'Bill Month'] }
      ]
    }
  ];

  useEffect(() => {
    otherkyc?.mutate();
    TempKyc?.mutate();
  }, []);

  const handleRightIconPress = (index) => {
    if (index === 0) {
      navigation.navigate(screens.FAQ);
    } else if (index === 1) {
      navigation.navigate(screens.HomeScreen);
    }
  };

  const handleAccordionPress = (index) => {
    setActiveSections(activeSections.includes(index) ? [] : [index]);
    setSelectedItem(null); // Reset selected item when accordion item is pressed
    setInputValue1('');
    setInputValue2('');
  };

  const renderAccordionHeader = (section, index, isActive) => {
    return (
      <CustomShadow containerStyle={{ margin: 10 }} shadowColor={colors.gray100}>
        <TouchableOpacity
          style={[
            styles.selectContainer,
            {
              backgroundColor: "transparent",
            },
          ]}
          onPress={() => handleAccordionPress(index)}
        >
          <View
            style={[
              styles.selectField,
              { borderColor: colors.error },
            ]}
          >
            <Text>{section.title}</Text>
            <Icon
              name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={24}
              color="black"
            />
          </View>
        </TouchableOpacity>
      </CustomShadow>
    );
  };

  const renderAccordionContent = (section) => {
    return (
      <ScrollView>
        {section.items.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => handleItemPress(section.id, item)}
            style={[
              styles.item,
              { backgroundColor: activeSections.includes(section.id) ? 'lightgray' : 'white' },
              selectedItem === item.title ? styles.selectedItem : null
            ]}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  const handleItemPress = (optionId, item) => {
    console.log(`Selected item ${item.title} from option ${optionId}`);
    setSelectedItem(item.title);
    // Set dummy values for inputs based on selected item
    setInputValue1(`Sample ${item.fields[0]}`);
    setInputValue2(`Sample ${item.fields[1]}`);
  };

  const handleGalleryUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('image path--', image.path);
      setImageSelected(image.path);
    }).catch(error => {
      console.log('Error:', error);
    });
  };

  const handleCameraUpload = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image.path);
      setImageSelected(image.path);
    }).catch(error => {
      console.log('Error:', error);
    });
  };

  return (
    <ScrollView style={{ backgroundColor: '#ffff' }} >
      <View style={styles.container}>
        <View style={{ marginHorizontal: horizontalScale(10) }}>
          <Header
            title="Upload Documents"
            left={require('../../images/back.png')}
            rightImages={[{ source: assets.chat }, { source: assets.questionRound }]}
            leftStyle={{ height: verticalScale(15), width: verticalScale(15) }}
            leftImageProps={{ resizeMode: "contain" }}
            rightStyle={{ height: verticalScale(23), width: verticalScale(23), marginHorizontal: 10 }}
            rightImageProps={{ resizeMode: "contain" }}
            titleStyle={{ fontSize: verticalScale(18) }}
            onPressRight={(index) => handleRightIconPress(index)}
            onPressLeft={() => { navigation.navigate(screens.KYCDocuments); }}
          />
        </View>

        <View style={[styles.container, { marginHorizontal: horizontalScale(11) }]}>
          <View style={{ marginTop: verticalScale(15), marginBottom: verticalScale(15) }}>
            <Text style={{ fontWeight: '500', fontSize: 18, lineHeight: 20, color: '#44465B', lineHeight: 21 }}>Please choose the current Address Proof from Below Options.</Text>
          </View>

          <Accordion
            sections={options}
            activeSections={activeSections}
            renderHeader={renderAccordionHeader}
            renderContent={renderAccordionContent}
            onChange={(sections) => setActiveSections(sections)}
          />

          {/* Text Inputs */}
          {selectedItem && (
            <>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${options.find(sec => sec.id === 1).items.find(item => item.title === selectedItem).fields[0]}`}
                value={inputValue1}
                onChangeText={(text) => setInputValue1(text)}
              />
              <TextInput
                style={styles.input}
                placeholder={`Enter ${options.find(sec => sec.id === 1).items.find(item => item.title === selectedItem).fields[1]}`}
                value={inputValue2}
                onChangeText={(text) => setInputValue2(text)}
              />
            </>
          )}

          {/* Upload Button */}
          <TouchableOpacity
            disabled={imageSelected ? true : false}
            onPress={() => handleCameraUpload()}
            style={styles.uploadButton}
          >
            <Text style={[styles.uploadButtonText, {
              borderColor: imageSelected ? colors.grey : colors.coreBlue,
              color: imageSelected ? colors.grey : colors.coreBlue,
            }]}>
              {imageSelected ? 'Uploaded' : 'Upload'}
            </Text>
          </TouchableOpacity>

          {/* Display selected image and option */}
          {imageSelected !== "" && (
            <>
              <View style={{ borderBottomWidth: 1, borderBottomColor: colors.border, width: '100%', alignSelf: 'center', marginVertical: verticalScale(9) }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: horizontalScale(5), marginTop: verticalScale(10) }}>
                <Text style={{ color: colors.surface, fontSize: 15, fontWeight: '500' }}>
                  {imageSelected.split('/').pop().slice(0, 24)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(null);
                    setImageSelected('');
                    setInputValue1('');
                    setInputValue2('');
                  }}
                >
                  <Image
                    source={require('../../../src/assets/cross.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

        </View>
      </View>

      {/* Submit Button */}
      <View style={styles.buttonview}>
        <Button
          onPress={() => {
            alert('Submit');
            console.log('imageSelected submit', imageSelected);
          }}
          type="primary"
          label="Submit"
          disabled={imageSelected !== "" ? false : true}
        />
      </View>
    </ScrollView>
  );
};

export default CurrentAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 4,
  },
  buttonview: {
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20)
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  uploadButton: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: verticalScale(20),
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    textAlign: 'center'
  },
  selectContainer: {
    backgroundColor: customTheme.colors.textInputBackground,
    padding: 13,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  selectField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  item: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: 'lightgray',
  },
});
