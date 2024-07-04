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
import ErrorConstant from '../../constants/ErrorConstants'
import {
  FormControl,
  component,
} from "../../components/FormComponents/FormControl";
import { useForm } from "react-hook-form";
import { CaptureAddressConstants } from '../../constants/stringConstants';
import { doOCRForDL, doOCRForPassport, doOCRForVoterID } from '../../services/muleService/MuleApiUtils';
import { toast } from '../../utils/functions';
import ActivityIndicatorComponent from '../../components/ActivityIndicator';
import { log } from '../../utils/ConsoleLogUtils';


const CurrentAddress = ({ navigation }) => {
  const [imageSelected, setImageSelected] = useState('');
  const [activeSections, setActiveSections] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedFields, setSelectedFields] = useState([])

  // const otherkyc = getOtherKycList();
  // const TempKyc = getTempAddressKycList();


  const dlCheck = doOCRForDL()
  const passportCheck = doOCRForPassport()
  const voterIdCheck = doOCRForVoterID()

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


  const options = [
    {
      id: 1,
      title: selectedItem ? selectedItem : 'Documents',
      items: [
        {
          title: CaptureAddressConstants.DL
        },
        { title: CaptureAddressConstants.PASSPORT },
        {
          title: CaptureAddressConstants.VOTERID
        },
        { title: CaptureAddressConstants.NREGACard },
        { title: CaptureAddressConstants.EBILL },
        { title: CaptureAddressConstants.GBILL },
        { title: CaptureAddressConstants.MBILL }
      ]
    },

  ];

  useEffect(() => {
    try {
      if (dlCheck.data) {
        setValue('address', dlCheck.data?.results?.address?.[0].completeAddress)
      }
      if (dlCheck.error) {


      }
    } catch (error) {
      toast("error", ErrorConstant.SOMETHING_WENT_WRONG)
    }


  }, [dlCheck.data, dlCheck.error]);


  useEffect(() => {
    try {
      if (passportCheck.data) {
        // setValue('address', passportCheck.data?.results?.address?.[0].completeAddress)
      }
      if (passportCheck.error) {


      }
    } catch (error) {
      toast("error", ErrorConstant.SOMETHING_WENT_WRONG)
    }


  }, [passportCheck.data, passportCheck.error]);

  useEffect(() => {
    try {
      if (voterIdCheck.data) {
        log("voter id >>>>", JSON.stringify(voterIdCheck.data))
        // setValue('address', passportCheck.data?.results?.address?.[0].completeAddress)
      }
      if (voterIdCheck.error) {


      }
    } catch (error) {
      toast("error", ErrorConstant.SOMETHING_WENT_WRONG)
    }


  }, [voterIdCheck.data, voterIdCheck.error]);



  const handleGalleryUpload = () => {
    ImagePicker.openPicker({
      compressImageQuality: 0.6,
      includeBase64: true,
      cropping: true,
    }).then(image => {

      if (image?.path) {
        const fileName = image?.path?.split('/').pop();
        try {

          setImageSelected(fileName);
          setSelectedFields([
            {
              id: "address",
              label: "Address",
              type: component.textInput,
              placeHolder: "Enter address",
              isRequired: true,
              value: "",
              isMultiline: true,
            },
          ])
          setValue('address', "")
        } catch (error) {

        }

        makeOCRAPICCall(fileName, image)



      }
    }).catch(error => {
      console.log('Error:', error);
    });
  };

  const makeOCRAPICCall = async (fileName, image) => {
    try {
      const request = {

        "fileData": {
          "content": `data:${image.mime};base64,${image.data}`,
          "title": fileName ? fileName : "Doc.png"
        },
        "consent": "Y",
        "caseId": "eeea90ab-f4e0-4d9e-9efa-c03fffbd22c6",
      }



      if (selectedItem === CaptureAddressConstants.DL) {
        dlCheck?.mutate(request)

      } else if (selectedItem === CaptureAddressConstants.VOTERID) {
        voterIdCheck?.mutate(request)

      } else if (selectedItem === CaptureAddressConstants.PASSPORT) {
        passportCheck?.mutate(request)
      }
    } catch (error) {

    }
  }

  const handleRightIconPress = (index) => {
    if (index === 0) {
      navigation.navigate(screens.FAQ);
    } else if (index === 1) {
      navigation.navigate(screens.HomeScreen);
    }
  };

  const handleAccordionPress = (index) => {
    setActiveSections(activeSections.includes(index) ? [] : [index]);

  };

  const renderAccordionHeader = (section, index, isActive) => {
    return (
      <CustomShadow>
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


            ]}
          >
            <Text style={{
              color: selectedItem === item.title ? colors.coreBlue : '#000000',
              fontSize: selectedItem === item.title ? 16 : 14
            }}>{item.title}</Text>

          </TouchableOpacity>

        ))}
      </ScrollView>
    );
  };

  const handleItemPress = (optionId, item) => {
    console.log(`Selected item ${item.title} from option ${optionId}`);
    setSelectedItem(item.title);
    // Set dummy values for inputs based on selected item
    setImageSelected('');
    setActiveSections([])
    // setInputValue1(`Sample ${item.fields[0]}`);
    // setInputValue2(`Sample ${item.fields[1]}`);
    //setSelectedFields(item.fields)
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

  const submitDoc = async () => {
    const isValid = await trigger()
    if (isValid) {
      //  dlCheck.mutate(watch())
    }
  }

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
        {(dlCheck.isPending || voterIdCheck.isPending || passportCheck.isPending) && <ActivityIndicatorComponent />}

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
          {/* {selectedItem && (
            <>
              <TextInput
                style={styles.input}

                value={inputValue1}
                onChangeText={(text) => setInputValue1(text)}
              />
              <TextInput
                style={styles.input}

                value={inputValue2}
                onChangeText={(text) => setInputValue2(text)}
              />
            </>
          )} */}

          <View style={{ marginVertical: 16 }}>


            {selectedItem &&

              <TouchableOpacity
                disabled={imageSelected ? true : false}
                onPress={() => handleGalleryUpload()}
                style={styles.uploadButton}
              >
                <Text style={[styles.uploadButtonText, {
                  borderColor: imageSelected ? colors.grey : colors.coreBlue,
                  color: imageSelected ? colors.grey : colors.coreBlue,
                }]}>
                  {imageSelected ? 'Uploaded' : 'Upload'}
                </Text>
              </TouchableOpacity>
            }


          </View>

          {/* Upload Button */}

          {/* Display selected image and option */}
          {imageSelected && (
            <>
              <View style={{ borderBottomWidth: 3, borderBottomColor: colors.coreBlue, width: '100%', alignSelf: 'center', marginVertical: verticalScale(9) }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: horizontalScale(5), marginTop: verticalScale(10) }}>
                <Text style={{ color: colors.surface, fontSize: 15, fontWeight: '500' }}>
                  {imageSelected}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(null);
                    setImageSelected(null);

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
        {console.log(selectedFields)}

        {imageSelected && selectedFields && selectedFields.map((comp, index) => {
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

              watch={watch}



              showRightComp={comp.showRightComp || false}

              isMultiline={comp.isMultiline}
              maxLength={comp.maxLength}
              isDisabled={comp.isDisabled}
              isUpperCaseRequired={true}
              isEditable={comp.isEditable}
            />

          );
        })}
      </View>

      {/* Submit Button */}
      <View style={styles.buttonview}>
        {selectedItem && imageSelected &&
          <Button
            onPress={submitDoc}
            type="primary"
            label="Continue"
            disabled={imageSelected !== "" ? false : true}
          />
        }
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
    marginVertical: 10,

  },
  selectedItem: {
    color: 'red',
  },
});
