import React, { useState, useEffect, useRef } from 'react';
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
import Canvas, { Image as CanvasImage } from 'react-native-canvas';


const CurrentAddress = ({ navigation }) => {
  const [imageSelected, setImageSelected] = useState('');
  const [firstImageSelected, setFirstImageSelected] = useState(null)
  const [secondImageSelected, setSecondImageSelected] = useState(null)
  const [activeSections, setActiveSections] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedFields, setSelectedFields] = useState([])

  // const otherkyc = getOtherKycList();
  // const TempKyc = getTempAddressKycList();


  const dlCheck = doOCRForDL()
  const passportCheck = doOCRForPassport()
  const voterIdCheck = doOCRForVoterID()
  const canvasRef = useRef(null);

  const dlFields = [
    {
      id: "dl",
      label: "DL No",
      type: component.textInput,
      placeHolder: "Enter DL Number",
      isRequired: true,
      value: "",
    },
    {
      id: "dlExpiry",
      label: "Expiry Date",
      type: component.datetime,
      placeHolder: "Enter Expiry Date",
      isRequired: true,
      value: "",
    },
    {
      id: "address",
      label: "Address",
      type: component.textInput,
      placeHolder: "Enter address",
      isRequired: true,
      value: "",
      isMultiline: true,
    },]
  //Passport No, Expiry Date
  const passPortFields = [
    {
      id: "passportNo",
      label: "Passport No",
      type: component.textInput,
      placeHolder: "Enter Passport No",
      isRequired: true,
      value: "",
    },
    {
      id: "passportExpiry",
      label: "Expiry Date",
      type: component.datetime,
      placeHolder: "Enter Expiry Date",
      isRequired: true,
      value: "",
    },
    {
      id: "address",
      label: "Address",
      type: component.textInput,
      placeHolder: "Enter address",
      isRequired: true,
      value: "",
      isMultiline: true,
    },]

    const voterIdFields = [
      {
        id: "voterID",
        label: "Voter Id No",
        type: component.textInput,
        placeHolder: "Enter Voter Id No",
        isRequired: true,
        value: "",
      },
    ]

    const neregaFields = [
      //NREGA ID
      {
        id: "neragaID",
        label: "NREGA ID",
        type: component.textInput,
        placeHolder: "Enter NREGA ID",
        isRequired: true,
        value: "",
      },
    ]

  const electicityFields = [
    // Bill No, Bill Date 
    {
      id: "electricBillNumber",
      label: "Bill No",
      type: component.textInput,
      placeHolder: "Enter Bill No",
      isRequired: true,
      value: "",
    },

    {
      id: "electricBillDate",
      label: "Bill Date",
      type: component.textInput,
      placeHolder: "Enter Bill Date",
      isRequired: true,
      value: "",
    },
  ]

  const gasFields = [
    // Bill No, Bill Date 
    {
      id: "gasBillNumber",
      label: "Bill No",
      type: component.textInput,
      placeHolder: "Enter Bill No",
      isRequired: true,
      value: "",
    },

    {
      id: "gasBillDate",
      label: "Bill Date",
      type: component.textInput,
      placeHolder: "Enter Bill Date",
      isRequired: true,
      value: "",
    },
  ]

  const mobileFields = [
    // Bill No, Bill Date 
    {
      id: "mobileBillNumber",
      label: "Bill No",
      type: component.textInput,
      placeHolder: "Enter Bill No",
      isRequired: true,
      value: "",
    },

    {
      id: "mobileBillDate",
      label: "Bill Date",
      type: component.textInput,
      placeHolder: "Enter Bill Date",
      isRequired: true,
      value: "",
    },
  ]

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
          title: CaptureAddressConstants.DL, fields: [

          ]
        },
        { title: CaptureAddressConstants.PASSPORT,fields: [...passPortFields] }, 
        {
          title: CaptureAddressConstants.VOTERID, fields:[...voterIdFields]
        },
        { title: CaptureAddressConstants.NREGACard, fields: [...neregaFields] },
        { title: CaptureAddressConstants.EBILL, fields: [...electicityFields] },
        { title: CaptureAddressConstants.GBILL, fields: [...gasFields] },
        { title: CaptureAddressConstants.MBILL, fields: [...mobileFields] }
      ]
    },

  ];

  useEffect(() => {
    try {
      if (dlCheck.data) {
        setValue('address', dlCheck.data?.results?.address?.[0].completeAddress)
        setValue('dl', dlCheck.data?.results?.dlNumber)
        try {
          // need to get DL expiry 
          // will get the response like this "nonTransport": "13-02-2019 to 12-02-2039",
          let expiryResponse = dlCheck.data?.results?.validity
          if (expiryResponse && expiryResponse.nonTransport) {
            if (expiryResponse.nonTransport?.toString()?.toLowerCase()?.includes("to")) {
              const expiry = expiryResponse.nonTransport?.toString()?.toLowerCase()?.split('to')?.pop()

              setValue('dlExpiry', expiry?.trim())

            }

          } else if (expiryResponse && expiryResponse.transport) {
            if (expiryResponse.transport?.toString()?.toLowerCase()?.includes("to")) {
              const expiry = expiryResponse.transport?.toString()?.toLowerCase()?.split('to')?.pop()
              setValue('dlExpiry', expiry?.trim())

            }
          }

        } catch (error) {

        }
      }
      if (dlCheck.error) {


      }
    } catch (error) {
      toast("error", ErrorConstant.SOMETHING_WENT_WRONG)
    }


  }, [dlCheck.data, dlCheck.error]);

  useEffect(() => {
    // alert(canvasRef.current && firstImageSelected?.data && secondImageSelected?.data)
    if (canvasRef.current && firstImageSelected && secondImageSelected) {
      //alert('dsj')
      mergeBase64Images(canvasRef, firstImageSelected?.data, secondImageSelected?.data);
      setTimeout(() => {
        uploadMultipleFiles()
      }, 500)
    }
    // wait for 2 seconds

  }, [canvasRef.current, firstImageSelected, secondImageSelected]);

  const uploadMultipleFiles = async () => {
    try {
      let dataURL = await canvasRef.current.toDataURL()
      log("uploadMultipleFiles>>>>>", dataURL)
      if (dataURL) {
        if (selectedItem === CaptureAddressConstants.PASSPORT) {
          passportCheck?.mutate(dataURL)
        }
      }
    } catch (error) {

    }
  }

  const mergeBase64Images = (canvasRef, base64Image1, base64Image2) => {
    const canvas = canvasRef.current;



    const context = canvas.getContext('2d');
    //context.rotate(45 * Math.PI / 180)

    const image1 = new CanvasImage(canvas);
    const image2 = new CanvasImage(canvas);

    image1.src = `data:image/jpeg;base64,${base64Image1}`;
    image2.src = `data:image/jpeg;base64,${base64Image2}`;

    image1.addEventListener('load', () => {
      // Draw the first image
      context.save()



      //  context.drawImage(image1, 0, 0, canvas.width / 2, canvas.height);

      image2.addEventListener('load', () => {
        canvas.width = Math.max(image1.width, image2.width)
        canvas.height = image1.height + image2.height
        // Draw the second image next to the first image
        context.drawImage(image1, 0, 0, image1.width, image1.height);
        context.drawImage(image2, 0, image1.height + 50, image2.width, image2.height);

        // Optionally, convert the canvas content to base64


      });
    });
  };


  useEffect(() => {
    try {
      if (passportCheck.data) {
        setValue('passportNo', passportCheck.data?.results?.passportNumber?.passportNumberFromSource)
        setValue('passportExpiry', passportCheck.data?.results?.ocrDetails?.[0]?.details?.doe?.value)
        setValue('address', passportCheck.data?.results?.ocrDetails?.[1]?.details?.address?.value)
        //passportExpiry, address


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



  const handleGalleryUpload = (type) => {
    ImagePicker.openPicker({
      compressImageQuality: 0.6,
      includeBase64: true,
      cropping: true,
    }).then(image => {

      if (image?.path) {
        const fileName = image?.path?.split('/').pop();
        try {

          if (type === 0) {
            setImageSelected(image);
          } else if (type === 1) {
            setFirstImageSelected(image)
          } else if (type === 2) {
            setSecondImageSelected(image)
          }
         
         

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
        // alert(request)
        //  passportCheck?.mutate(request)
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
    setFirstImageSelected(null)
    setSecondImageSelected(null)
    setActiveSections([])
    setSelectedFields(item.fields)
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
        {<Canvas ref={canvasRef} style={{ width: 1, height: 1 }} />}
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
              <>
                {selectedItem !== CaptureAddressConstants.PASSPORT ?


                  <TouchableOpacity
                    disabled={imageSelected ? true : false}
                    onPress={() => handleGalleryUpload(0)}
                    style={styles.uploadButton}
                  >
                    <Text style={[styles.uploadButtonText, {
                      borderColor: imageSelected ? colors.grey : colors.coreBlue,
                      color: imageSelected ? colors.grey : colors.coreBlue,
                    }]}>
                      {imageSelected ? 'Uploaded' : 'Upload'}
                    </Text>
                  </TouchableOpacity>

                  :
                  <View>
                    <TouchableOpacity
                      disabled={imageSelected ? true : false}
                      onPress={() => handleGalleryUpload(1)}
                      style={styles.uploadButton}
                    >
                      <Text style={[styles.uploadButtonText, {
                        borderColor: imageSelected ? colors.grey : colors.coreBlue,
                        color: imageSelected ? colors.grey : colors.coreBlue,
                      }]}>
                        {firstImageSelected ? 'Uploaded' : 'Upload'} {selectedItem} FirstPage
                      </Text>
                    </TouchableOpacity>

                    {firstImageSelected && (
                      <View style={{ marginVertical: 16 }}>
                        <View style={{ borderBottomWidth: 3, borderBottomColor: colors.coreBlue, width: '100%', alignSelf: 'center', marginVertical: verticalScale(16) }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: horizontalScale(5), marginTop: verticalScale(10) }}>
                          <Text style={{ color: colors.surface, fontSize: 15, fontWeight: '500' }}>
                            {firstImageSelected?.path?.split('/').pop()}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {

                              setFirstImageSelected(null);

                            }}
                          >
                            <Image
                              source={require('../../../src/assets/cross.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}


                    <TouchableOpacity
                      disabled={imageSelected ? true : false}
                      onPress={() => handleGalleryUpload(2)}
                      style={styles.uploadButton}
                    >
                      <Text style={[styles.uploadButtonText, {
                        borderColor: imageSelected ? colors.grey : colors.coreBlue,
                        color: imageSelected ? colors.grey : colors.coreBlue,
                      }]}>
                        {firstImageSelected ? 'Uploaded' : 'Upload'} {selectedItem} SecondPage
                      </Text>
                    </TouchableOpacity>

                    {secondImageSelected && (
                      <View style={{ marginVertical: 16 }}>
                        <View style={{ borderBottomWidth: 3, borderBottomColor: colors.coreBlue, width: '100%', alignSelf: 'center', marginVertical: 16 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: horizontalScale(5), marginTop: verticalScale(10) }}>
                          <Text style={{ color: colors.surface, fontSize: 15, fontWeight: '500' }}>
                            {secondImageSelected?.path?.split('/').pop()}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {

                              setSecondImageSelected(null);

                            }}
                          >
                            <Image
                              source={require('../../../src/assets/cross.png')}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                }
              </>
            }


          </View>

          {/* Upload Button */}

          {/* Display selected image and option */}
          {imageSelected && (
            <>
              <View style={{ borderBottomWidth: 3, borderBottomColor: colors.coreBlue, width: '100%', alignSelf: 'center', marginVertical: verticalScale(9) }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: horizontalScale(5), marginTop: verticalScale(10) }}>
                <Text style={{ color: colors.surface, fontSize: 15, fontWeight: '500' }}>
                  {imageSelected?.path?.split('/').pop()}
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

        {(imageSelected || (firstImageSelected && secondImageSelected)) && selectedFields && selectedFields.map((comp, index) => {
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
        {selectedItem && (imageSelected || (firstImageSelected && secondImageSelected)) &&
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
