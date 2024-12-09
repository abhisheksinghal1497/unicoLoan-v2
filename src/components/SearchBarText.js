import React, { memo, useState, useMemo, useEffect } from "react";
import { FlatList, Text, StyleSheet, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { verticalScale } from "../utils/matrcis";
import Button from "./Button";
const SearchbarText = ({ pincodeDataRes, continueClicked }) => {
    const [pinCode, setPincode] = React.useState('');
    const [data, setData] = useState(null)

    const changedTextValue = (value) => {
        setPincode(value)
    }

    const HandlePinCode = (value) => {

        setPincode(value);
    };





    useEffect(() => {
        function filterDuplicatePincode(pinData) {
            const uniquePins = new Set();
            const uniquePinData = [];
            pinData?.forEach?.((item) => {
                if (item && item.PinCode__r && item.PinCode__r.PIN__c) {
                    const pinCode = item.PinCode__r.PIN__c;
                    if (!uniquePins.has(pinCode)) {
                        uniquePins.add(pinCode);
                        uniquePinData.push(item);
                    }
                }
            });
            return uniquePinData;
        }


        const matchingPincodes = filterDuplicatePincode(pincodeDataRes)?.filter(
            (pin) =>
                pinCode?.length > 0 &&
                pin?.PinCode__r?.PIN__c.toString().includes(pinCode)
        );
        if (pincodeDataRes) {

            setData(matchingPincodes);
        } else {
            setData([])
        }

    }, [pinCode])


    const isValid = data?.length !== 0 || pinCode.length === 0;




    return (
        <View style={{ flex: 1 }}>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.pinValue}
                    keyboardType="numeric"
                    maxLength={6}
                    onChangeText={changedTextValue}
                    value={pinCode}
                    placeholder="Enter pincode here"
                />

            </View>
            {!isValid && (
                <View style={{ marginVertical: 16 }}>
                    <Text style={{ color: 'red' }}>
                        Pincode is not serviceable
                    </Text>
                </View>
            )}
            <ScrollView style={styles.scrollView} propagateSwipe={true}>

                {data?.map((pincode, index) => (

                    <TouchableOpacity
                        onPress={() => HandlePinCode(pincode?.PinCode__r?.PIN__c)}
                        key={index}
                    >
                        <Text style={styles.additionalText}>
                            {pincode?.PinCode__r?.PIN__c} {pincode?.PinCode__r?.State__c}
                        </Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>




            <View style={{ marginTop: 16 }}>
                {(isValid) &&
                    <View style={styles.button}>

                        <Button
                            disable={pinCode?.length != 6 || !isValid}
                            label="Ok"
                            type="primary"
                            onPress={() => {
                                continueClicked?.(pinCode, data?.[0])
                            }}
                        />

                    </View>
                }
            </View>


        </View>


    )
}



const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: "100%",
        marginBottom: 80,
        minHeight: 200
    },
    modal: {
        width: "95%",
        height: "55%",
        alignSelf: "center",
    },
    modalHeader: {
        justifyContent: "space-between",
        paddingBottom: verticalScale(15),
        flexDirection: "row",
        alignItems: "center",
    },
    modalHeaderTxt: {
        fontSize: verticalScale(19),
        color: "#44465B",
    },
    textInputContainer: {
        height: 50,
        width: "100%",
        borderRadius: 33,
        backgroundColor: "white",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 20,
        shadowColor: "black",
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
        color: "black",
        marginHorizontal: 10,
    },

    additionalText: {
        fontSize: verticalScale(12),
        marginVertical: 14,
        marginHorizontal: 15,
    },
    button: {
        marginVertical: 16,
        width: "50%",
        justifyContent: "center",
        alignSelf: "center",


    },
});

export default memo(SearchbarText)