import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomModal from '../../components/CustomModal';
import { horizontalScale, verticalScale } from '../../utils/matrcis';
import { colors } from '../../colors';
import { TouchableOpacity } from 'react-native';
import { verifyPanApi } from '../../services/ApiUtils';

const Dummy = () => {
    const appVersion = '1.0.0';

    const jsonData = {
        "downTime": {
            "isAppDownTime": true,
            "appDownTimeMessage": "App is in under maintenance"
        },
        "android": {
            "latestVersion": "1.0.9",
            "isForceUpdateRequired": false,
            "updateMessage": "New version is available",
            "redirectUrl": "https://google.playstore.com/com.unico"
        },
        "iOS": {
            "latestVersion": "1.0.2",
            "isForceUpdateRequired": true,
            "updateMessage": "New version is available",
            "redirectUrl": "https://appStore.com/com.unico"
        },
        "general": {
            "isAnyGeneralMessage": true,
            "message": "Happy Diwali"
        }
    };

    const [appDownTimeAlertVisible, setAppDownTimeAlertVisible] = useState(false);
    const [forceUpdateAlertVisible, setForceUpdateAlertVisible] = useState(false);
    const [updateOrSkipAlertVisible, setUpdateOrSkipAlertVisible] = useState(false);
    const [generalMessageAlertVisible, setGeneralMessageAlertVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisible3, setModalVisible3] = useState(false);
    const [modalVisible4, setModalVisible4] = useState(false);


    useEffect(() => {
        if (jsonData.downTime.isAppDownTime) {
            setAppDownTimeAlertVisible(true);
            setModalVisible1(true)
        }

        const versionToNumber = (version) => {
            const parts = version.split('.').map(part => parseInt(part));
            return parts[0] * 10000 + parts[1] * 100 + parts[2];
        };

        const appVersionNumber = versionToNumber(appVersion);
        const latestVersionNumber = versionToNumber(jsonData.android.latestVersion);

        if (latestVersionNumber > appVersionNumber) {
            if (jsonData.android.isForceUpdateRequired) {
                // Force Update
                setForceUpdateAlertVisible(true);
                setModalVisible2(true)
            } else {
                // Update or Skip
                setUpdateOrSkipAlertVisible(true);
                setModalVisible3(true)
            }
        }
        if (jsonData.general.isAnyGeneralMessage) {
            setGeneralMessageAlertVisible(true);
            setModalVisible4(true)
        }
    }, []);

    return (
        <><View style={styles.container}>
            <Image
            source={require('../../../assets/images/unicoLogo.png')}
            style={{resizeMode:'contain', width: 200, height: 200}}
            
            />

            {/* {appDownTimeAlertVisible && <CustomModal
                showModal={modalVisible1}
                setShowModal={setModalVisible1}
                centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            >
                <View>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTxt}>{jsonData.downTime.appDownTimeMessage}</Text>
                        <TouchableOpacity style={styles.itemView} onPress={() => setModalVisible1(false)}>
                            <Text style={styles.itemText}>
                                Okay.
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </CustomModal>}

            {forceUpdateAlertVisible && <CustomModal
                showModal={modalVisible2}
                setShowModal={setModalVisible2}
                centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            >
                <View>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTxt}>{jsonData.android.updateMessage}</Text>
                        <TouchableOpacity style={styles.itemView} onPress={() => setModalVisible2(false)}>
                            <Text style={styles.itemText}>
                                Force Update
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </CustomModal>}

            {updateOrSkipAlertVisible && <CustomModal
                showModal={modalVisible3}
                setShowModal={setModalVisible3}
                centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            >
                <View>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTxt}>{jsonData.android.updateMessage}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>



                            <TouchableOpacity style={styles.itemView} onPress={() => setModalVisible3(false)}>
                                <Text style={styles.itemText}>
                                    skip
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.itemView} onPress={() => setModalVisible3(false)}>
                                <Text style={styles.itemText}>
                                    update
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </CustomModal>}

            {generalMessageAlertVisible && <CustomModal
                showModal={modalVisible4}
                setShowModal={setModalVisible4}
                centeredViewStyle={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            >
                <View>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderTxt}>{jsonData.general.message}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            <TouchableOpacity style={styles.itemView} onPress={() => setModalVisible4(false)}>
                                <Text style={styles.itemText}>
                                    Okay
                                </Text>
                            </TouchableOpacity>

                            
                        </View>
                    </View>

                </View>
            </CustomModal>} */}

{appDownTimeAlertVisible && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{jsonData.downTime.appDownTimeMessage}</Text>
          {/* <TouchableOpacity style={styles.alertButton} onPress={() => setAppDownTimeAlertVisible(false)}>
            <Text style={styles.alertButtonText}>Okay</Text>
          </TouchableOpacity> */}
        </View>
      )}

      {forceUpdateAlertVisible && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{jsonData.android.updateMessage}</Text>
          <TouchableOpacity style={[styles.alertButton]} onPress={() => setForceUpdateAlertVisible(false)}>
            <Text style={styles.alertButtonText}>Force Update </Text>
          </TouchableOpacity>
        </View>
      )}

      {updateOrSkipAlertVisible && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{jsonData.android.updateMessage}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.alertButton,{marginRight: verticalScale(5)}]} onPress={() => setUpdateOrSkipAlertVisible(false)}>
              <Text style={[styles.alertButtonText]}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.alertButton} onPress={() => setUpdateOrSkipAlertVisible(false)}>
              <Text style={styles.alertButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {generalMessageAlertVisible && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>{jsonData.general.message}</Text>
          <TouchableOpacity style={styles.alertButton} onPress={() => setGeneralMessageAlertVisible(false)}>
            <Text style={styles.alertButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      )}

</View>


        </>
    );
};

export default Dummy;

const styles = StyleSheet.create({
    modalHeader: {
        paddingVertical: 10,
    },
    modalHeaderTxt: {
        fontWeight: "500",
        fontSize: 18,
        color: colors.black,
        marginLeft: horizontalScale(5)
    },
    itemView: {
        alignSelf: 'center',
        backgroundColor: colors.coreBlue,
        padding: 10, borderRadius: 10
    },
    itemText: {
        fontWeight: "500",
        color: colors.white,
        fontSize: 18,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      alertContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: verticalScale(10)
      },
      alertText: {
        fontSize: 18,
        marginBottom: 10,
      },
      alertButton: {
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
      },
      alertButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: '100%',
        paddingHorizontal: 20,
      },
});
