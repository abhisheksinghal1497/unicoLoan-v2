import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { horizontalScale, verticalScale } from '../../utils/matrcis'
import { colors } from '../../colors'
import Slider from '@react-native-community/slider';
import { TextInput } from 'react-native-paper'
import Button from '../../components/Button'


const EmiCalculator = () => {
    const [sliderValue, setSliderValue] = useState(0);
    const [text, setText] = useState('');
    const [sliderValue2, setSliderValue2] = useState(0);
    const [text2, setText2] = useState('');
    const [sliderValue3, setSliderValue3] = useState(0);
    const [text3, setText3] = useState('');
    const [emi, setEmi] = useState(0);


    const onSliderValueChange = (value) => {
        setSliderValue(value);
        setText(value.toString()); // Convert slider value to string and set it in the text input
    };

    const onSliderValueChange2 = (value) => {
        setSliderValue2(value);
        setText2(value.toString()); // Convert slider value to string and set it in the text input
    };

    const onSliderValueChange3 = (value) => {
        setSliderValue3(value);
        setText3(value.toString()); // Convert slider value to string and set it in the text input
    };

    const onTextInputChange = (inputText) => {
        setText(inputText);
    };

    const onTextInputChange2 = (inputText) => {
        setText2(inputText);
    };

    const onTextInputChange3 = (inputText) => {
        setText3(inputText);
    };

    const onTextInputEndEditing = (inputText) => {
        const numericValue = parseFloat(inputText); // Convert text input value to a number
        if (!isNaN(numericValue)) {
            setSliderValue(numericValue); // Set slider value to the numeric value of the text input
        }
    };

    const onTextInputEndEditing2 = (inputText) => {
        const numericValue = parseFloat(inputText); // Convert text input value to a number
        if (!isNaN(numericValue)) {
            setSliderValue2(numericValue); // Set slider value to the numeric value of the text input
        }
    };

    const onTextInputEndEditing3 = (inputText) => {
        const numericValue = parseFloat(inputText); // Convert text input value to a number
        if (!isNaN(numericValue)) {
            setSliderValue3(numericValue); // Set slider value to the numeric value of the text input
        }
    };

    const calculateEMI = () => {
        const principal = parseFloat(text);
        const tenureMonths = parseFloat(text2);
        const interestRate = parseFloat(text3) / 12 / 100; // Convert annual interest rate to monthly and percentage to decimal
    
        // Calculate EMI using the formula
        const emi =
          (principal * interestRate * Math.pow(1 + interestRate, tenureMonths)) /
          (Math.pow(1 + interestRate, tenureMonths) - 1);
    
        setEmi(emi.toFixed(2)); // Update state with calculated EMI
      };


    return (
        <View style={{ flex: 1 }}>

            <ScrollView>
                <View style={{ marginHorizontal: horizontalScale(10) }}>
                    <Header
                        titleStyle={{ marginLeft: horizontalScale(-15) }}
                        onPressLeft={() => navigation.goBack()}
                        colour={colors.transparent}

                        left={require('../../../assets/images/Back.png')}
                        leftStyle={{ width: 30, height: 30 }} title="EMI Calculator"
                        onPressRight={() => alert("Faq")} />
                </View>
                <View style={{ justifyContent: 'center', marginTop: verticalScale(30) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginLeft: horizontalScale(20), color: "#C23934", bottom: verticalScale(2) }}>*</Text>
                        <Text style={{ color: "#3E3E3C", fontSize: 14, fontWeight: '400', lineHeight: 18 }}>Requested Loan Amount(₹) </Text>
                    </View>
                    <View style={{
                        marginVertical: verticalScale(10),
                    }}>
                        <Slider
                            value={sliderValue}
                            step={1}
                            style={{ width: '50%', alignSelf: 'center', transform: [{ scaleX: verticalScale(2), }, { scaleY: verticalScale(2) }], borderRadius: 20 }}
                            minimumValue={0}
                            maximumValue={5000000}
                            minimumTrackTintColor={"#0070D2"}
                            maximumTrackTintColor="#C4C4C4"
                            thumbTintColor={colors.coreBlue}
                            onValueChange={onSliderValueChange}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: horizontalScale(15), marginTop: verticalScale(-8) }}>
                        <Text style={{ color: "#3E3E3C", fontSize: 16, fontWeight: '400', lineHeight: 18 }}>
                            ₹ 1L
                        </Text>
                        <Text style={{ color: "#3E3E3C", fontSize: 16, fontWeight: '400', lineHeight: 18 }}>
                            ₹ 5Cr
                        </Text>
                    </View>

                    <TextInput
                        keyboardType="numeric"
                        style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', backgroundColor: 'transparent', maxWidth: '90%', marginHorizontal: horizontalScale(18) }}
                        onChangeText={onTextInputChange}
                        onEndEditing={(event) => onTextInputEndEditing(event.nativeEvent.text)}
                        value={text}
                    />

                </View>

                <View style={{ justifyContent: 'center', marginTop: 28}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginLeft: horizontalScale(20), color: "#C23934", bottom: verticalScale(2) }}>*</Text>
                        <Text style={{ color: "#3E3E3C", fontSize: 14, fontWeight: '400', lineHeight: 18 }}>Requested Monthly Tenure</Text>
                    </View>
                    <View style={{
                        marginVertical: verticalScale(10),
                    }}>
                        <Slider
                            value={sliderValue2}
                            step={1}
                            style={{ width: '50%', alignSelf: 'center', transform: [{ scaleX: verticalScale(2), }, { scaleY: verticalScale(2) }], borderRadius: 20 }}
                            minimumValue={0}
                            maximumValue={360}
                            minimumTrackTintColor={"#0070D2"}
                            maximumTrackTintColor="#C4C4C4"                            thumbTintColor={colors.coreBlue}
                            onValueChange={onSliderValueChange2}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: horizontalScale(15), marginTop: verticalScale(-8) }}>
                        <Text style={{ color: "#3E3E3C", fontSize: 14, fontWeight: '400', lineHeight: 18 }}>
                            12 Months
                        </Text>
                        <Text style={{ color: "#3E3E3C", fontSize: 14, fontWeight: '400', lineHeight: 18 }}>
                            360 Months
                        </Text>
                    </View>

                    <TextInput
                        keyboardType="numeric"
                        style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', backgroundColor: 'transparent', maxWidth: '90%', marginHorizontal: horizontalScale(18) }}
                        onChangeText={onTextInputChange2}
                        onEndEditing={(event) => onTextInputEndEditing2(event.nativeEvent.text)}
                        value={text2}


                    />

                </View>

                <View style={{ justifyContent: 'center', marginTop: 28}}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ marginLeft: horizontalScale(20), color: "#C23934", bottom: verticalScale(2) }}>*</Text>
                        <Text style={{ color: "#3E3E3C", fontSize: 14, fontWeight: '400', lineHeight: 18 }}>Rate Of Interest</Text>
                    </View>
                    <View style={{
                        marginVertical: verticalScale(10),
                    }}>
                        <Slider
                            value={sliderValue3}
                            step={1}
                            style={{ width: '50%', alignSelf: 'center', transform: [{ scaleX: verticalScale(2), }, { scaleY: verticalScale(2) }], borderRadius: 20 }}
                            minimumValue={0}
                            maximumValue={25}
                            minimumTrackTintColor={"#0070D2"}
                            maximumTrackTintColor="#C4C4C4"                            thumbTintColor={colors.coreBlue}
                            onValueChange={onSliderValueChange3}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: horizontalScale(15), marginTop: verticalScale(-8) }}>
                        <Text style={{ color: "#3E3E3C", fontSize: 14, fontWeight: '400', lineHeight: 18 }}>
                            1%
                        </Text>
                        <Text style={{ color: "#3E3E3C", fontSize: 14, fontWeight: '400', lineHeight: 18 }}>
                            25%
                        </Text>
                    </View>

                    <TextInput
                        keyboardType="numeric"
                        style={{ borderBottomWidth: 0.5, borderBottomColor: 'grey', backgroundColor: 'transparent', maxWidth: '90%', marginHorizontal: horizontalScale(18) }}
                        onChangeText={onTextInputChange3}
                        onEndEditing={(event) => onTextInputEndEditing3(event.nativeEvent.text)}
                        value={text3}


                    />

                </View>

                {emi > 0 && (
          <View style={{ alignItems: 'center', marginTop: verticalScale(25),  }}>
            <Text style={{ fontSize: 24, fontWeight:'600', color: '#000000' }}>EMI: ₹{emi}</Text>
          </View>
        )}

<View style={styles.buttonview}>
                            <Button
                                onPress={() => {
                                    calculateEMI()
                                }}
                                type="primary"
                                label="Calculate EMI"
                                buttonContainer={styles.button}
                            />
                        </View>
        

        {/* Display EMI */}
        

            </ScrollView>
        </View>
    )
}

export default EmiCalculator

const styles = StyleSheet.create({
    button:{
        marginTop: verticalScale(30),
        marginBottom: verticalScale(10),
        backgroundColor:'#0076C7',
        marginHorizontal: horizontalScale(120)
    }
})