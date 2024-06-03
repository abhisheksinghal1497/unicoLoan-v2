// import { ScrollView, StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, Alert, Button as B } from 'react-native'
// import React, { useState } from 'react'
// import Header from '../../components/Header';
// import { horizontalScale, verticalScale } from '../../utils/matrcis';
// import { colors } from '../../colors';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
// import Button from '../../components/Button'
// import CustomModal from '../../components/CustomModal';

// const PinCodeVerify = ({ navigation }) => {
//   const [code, setCode] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isChecked, setIsChecked] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalVisible2, setModalVisible2] = useState(false);
//   const [modalMessage, setModalMessage] = useState('');

//   const handleCheckBoxClick = () => {
//     setIsChecked(!isChecked);
//   };

//   const handleCodeChanged = (newCode) => {
//     setCode(newCode);
//     if (errorMessage && newCode.length === 6) {
//       setErrorMessage('');
//     }
//   }

//   const handleOnSubmit = () => {
//     return new Promise((resolve, reject) => {
//       if (!code) {
//         setErrorMessage('Please Enter the Pin');
//         reject('Please Enter the Pin');
//       } else if (code.length !== 6) {
//         setErrorMessage('Please enter all six digits of Pin');
//         reject('Please enter all six digits of Pin');
//       } else if (isChecked) {
//         setErrorMessage('');
//         reject('Please select the Terms & Conditions checkbox');
//       } else {
//         setErrorMessage('');
//         console.log('Code is', code);
//         resolve('Verified');
//       }
//     });
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setModalVisible2(false);
//   }

//   // const handleOnSubmit = () => {
//   //   if (!code) {
//   //     setErrorMessage('Please Enter the Pin');
//   //   } else if (code.length !== 6) {
//   //     setErrorMessage('Please enter all six digits of Pin');
//   //   } else if (isChecked) {
//   //     Alert.alert('Please select the Terms & Conditions checkbox');
//   //   } else {
//   //     console.log('Code is', code);
//   //     setErrorMessage('');
//   //     Alert.alert('Submitted');
//   //   }
//   // };
//   //

//   return (
//     <View style={styles.container}>
//       {/* <StatusBar
//         backgroundColor={"#EFEFED"}
//       /> */}
//       <ScrollView>
//         <CustomModal
//           showModal={modalVisible}
//           setShowModal={setModalVisible}
//           centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
//         >
//           <View>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalHeaderTxt}> {modalMessage}</Text>
//               <B title="Okay" onPress={closeModal} />
//             </View>

//           </View>
//         </CustomModal>

//         <CustomModal
//           showModal={modalVisible2}
//           setShowModal={setModalVisible2}
//           centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
//         >
//           <View>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalHeaderTxt}> {modalMessage}</Text>
//               <B title="Okay" onPress={closeModal} />
//             </View>

//           </View>
//         </CustomModal>
//         <Header
//           onPressLeft={() => navigation.goBack()}
//           colour={colors.transparent}
//           left={require('../../../assets/images/Back.png')}
//           leftStyle={{ width: 30, height: 30, }} title="Pin Code"
//         />
//         <View style={{ paddingHorizontal: 16, }}>
//           <Text style={{ color: '#000000', fontSize: 20, fontWeight: '600', lineHeight: 28 }}>Enter Pin</Text>
//           <OTPInputView
//             style={{ width: '100%', height: 80, marginBottom: verticalScale(0), marginTop: verticalScale(10), }}
//             pinCount={6}
//             onCodeChanged={(newCode) => handleCodeChanged(newCode)}
//             code={code}
//             codeInputFieldStyle={[styles.underlineStyleBase,
//             { borderColor: errorMessage ? 'red' : 'transparent' }
//             ]}
//             onCodeFilled={(code) => {
//               console.log(`Code is ${code}, you are good to go!`);
//               setErrorMessage('');
//             }}
//           />
//           {errorMessage ?
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Image
//                 source={require('../../../assets/images/ErrorSign.png')}
//                 style={{ width: 12, height: 14, marginRight: horizontalScale(5), marginTop: verticalScale(2) }}
//                 resizeMode='contain'
//               />
//               <Text style={{ color: '#E8292D', fontWeight: '400', fontSize: 14 }}>{errorMessage}</Text>
//             </View> : null}

//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <TouchableOpacity
//               onPress={() => handleCheckBoxClick()}
//             >
//               <Image
//                 style={{ width: 20, height: 20, resizeMode: 'contain' }}
//                 source={isChecked ? require('../../../assets/images/unchecked.png') : require('../../../assets/images/check-box.png')}
//               />
//             </TouchableOpacity>
//             <Text style={{ marginLeft: verticalScale(5) }}>Please agree our Terms & condiiton to proceed</Text>

//           </View>
//         </View>
//         <View style={[styles.buttonview,]}>
//           <Button
//             onPress={() => {
//               handleOnSubmit()
//                 .then((message) => {
//                   setModalMessage(message);
//                   setModalVisible(true);
//                 })
//                 .catch((error) => {
//                   setModalMessage(error);
//                   setModalVisible2(true)
//                 });
//             }}
//             type="primary"
//             label="Submit"
//           />
//         </View>
//       </ScrollView>
//     </View>
//   )
// }

// export default PinCodeVerify

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   underlineStyleBase: {
//     width: 45,
//     height: 45,
//     borderWidth: 1,
//     borderRadius: 10,
//     color: '#000000',
//     fontWeight: '700',
//     fontSize: 20,
//     backgroundColor: '#FFFFFF',
//     shadowOffset: { width: 4, height: 6 },
//     shadowOpacity: 1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   buttonview: {
//     marginHorizontal: horizontalScale(30),
//     justifyContent: 'flex-end',
//     marginTop: verticalScale(450),
//     marginBottom: verticalScale(20)
//   },
//   modalHeader: {
//     paddingVertical: 10,
//   },
//   modalHeaderTxt: {
//     fontWeight: "500",
//     fontSize: 18,
//     color: colors.black,
//     marginLeft: horizontalScale(5)
//   },
// })


import React, { useState } from "react";
import { View, Text, StyleSheet,TextInput ,Alert,} from "react-native";
import CustomModal from '../../components/CustomModal';
import { verticalScale } from "../../utils/matrcis";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Button from "../../components/Button";


const ModalScreen = ({ modalStyle }) => {
  
  
  const [pinCode, setPinCode] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOkPress = () => {
    if (pinCode.length !== 6) {
      Alert.alert(
        "Invalid Pin",
        "Pin code must be 6 digits",
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "Success",
        "Valid pin code entered",
        [{ text: "OK" ,}]
      );
      setPinCode('')
      setModalVisible(true)
    }
  };


  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
     <Text  onPress={openModal}>OpenModal</Text>
   
    <CustomModal
      type="center"
      showModal={modalVisible}
      setShowModal={setModalVisible}
      centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      modalStyle={[styles.modal, modalStyle]}>
        
    <View style={styles.modalHeader}>
      
       <Text style={styles.modalHeaderTxt}>Enter Pin code</Text>
       <EvilIcons
            onPress={closeModal}
            name="close"
            size={verticalScale(22)}
            color={"#828282"}
          />
   </View>
    <View style={styles.textInputContainer}>
      <TextInput
            style={styles.pinValue}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={setPinCode}
            value={pinCode}
    
          />
          </View>
          <View>
            <Text style={styles.additionalText}>New DelSultanpur</Text>
            {/* <Text style={styles.additionalText}>New Delhi/Dwarika</Text> */}
          </View>
          <View style={styles.button}>
          <Button label="Ok" type="primary" onPress={handleOkPress}  />
        </View>

</CustomModal>
</View>
  )}
  const styles = StyleSheet.create({
    modal: {
      width: "95%",
      height:'55%',
      alignSelf:'center', 
     
    },
    modalHeader:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: verticalScale(15),
    },
   
    modalHeaderTxt: {
      fontSize: verticalScale(19),
      color: "#44465B", 
      
    },
    close:{
      size:verticalScale(2),
      color:"#828282"
    },
    textInputContainer: {
      height: 50,
      width:'105%',    
      borderRadius: 33,
      backgroundColor: 'white', 
      justifyContent:'center',
      alignSelf:'center',
      marginBottom: 20,    
      shadowColor: 'black', 
      shadowOffset: {
          width: 0,
          height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 12,
    },
    pinValue: {
      fontSize: 16,
      color: 'black',
      marginHorizontal:10
    },
    additionalText: {
      marginVertical: 5,
    },
 
    button: {
    maxHeight:65,
    marginBottom:15,
    borderRadius: 33,
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
    position:'absolute',
    bottom:0
    },

  })
  export default ModalScreen;