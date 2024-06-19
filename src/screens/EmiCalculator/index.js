import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { horizontalScale, verticalScale } from '../../utils/matrcis'
import { colors } from '../../colors'
import Slider from '@react-native-community/slider';
import { TextInput } from 'react-native-paper'
import Button from '../../components/Button'

const EmiCalculator = ({ navigation }) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [text, setText] = useState('');
    const [sliderValue2, setSliderValue2] = useState(0);
    const [text2, setText2] = useState('');
    const [sliderValue3, setSliderValue3] = useState(0);
    const [text3, setText3] = useState('');
    const [emi, setEmi] = useState(0);

    const onSliderValueChange = (value) => {
        setSliderValue(value);
        setText(value.toString());
    };

    const onSliderValueChange2 = (value) => {
        setSliderValue2(value);
        setText2(value.toString());
    };

    const onSliderValueChange3 = (value) => {
        setSliderValue3(value);
        setText3(value.toString());
    };

    const onTextInputChange = (inputText) => {
        const numericValue = inputText.replace(/[^0-9]/g, '');
        const numberValue = parseInt(numericValue, 10);
        if (numberValue > 5000000) {
            setText('5000000');
        } else {
            setText(numericValue.toString());
        }
    };

    const onTextInputChange2 = (inputText) => {
        const numericValue = inputText.replace(/[^0-9]/g, '');
        const numberValue = parseInt(numericValue, 10);
        if (numberValue > 360) {
            setText2('360');
        } else {
            setText2(numericValue.toString());
        }
    };

    const onTextInputChange3 = (inputText) => {
        const numericValue = inputText.replace(/[^0-9]/g, '');
        const numberValue = parseInt(numericValue, 10);
        if (numberValue > 25) {
            setText3('25');
        } else {
            setText3(numericValue.toString());
        }
    };

    const onTextInputEndEditing = (inputText) => {
        const numericValue = parseFloat(inputText);
        if (!isNaN(numericValue)) {
            setSliderValue(numericValue);
        }
    };

    const onTextInputEndEditing2 = (inputText) => {
        const numericValue = parseFloat(inputText);
        if (!isNaN(numericValue)) {
            setSliderValue2(numericValue);
        }
    };

    const onTextInputEndEditing3 = (inputText) => {
        const numericValue = parseFloat(inputText);
        if (!isNaN(numericValue)) {
            setSliderValue3(numericValue);
        }
    };

    const calculateEMI = () => {
        if (!text || !text2 || !text3) {
            alert("Please select all the fields.");
            return;
        }
        const principal = parseFloat(text);
        const tenureMonths = parseFloat(text2);
        const interestRate = parseFloat(text3) / 12 / 100;
        if (principal === 0 || tenureMonths === 0 || interestRate === 0) {
            alert("Please enter valid values for all the fields.");
            return;
        }
        const emi =
            (principal * interestRate * Math.pow(1 + interestRate, tenureMonths)) /
            (Math.pow(1 + interestRate, tenureMonths) - 1);

        setEmi(emi.toFixed(2));
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
                        leftStyle={{ width: 30, height: 30 }} title="EMI Calculator" />
                </View>
                {/* Requested Loan Amount */}
                <View style={{ justifyContent: 'center', marginTop: verticalScale(30) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.star}>*</Text>
                        <Text style={styles.title}>Requested Loan Amount(₹) </Text>
                    </View>
                    <View style={{
                        marginVertical: verticalScale(10),
                    }}>
                        <Slider
                            value={sliderValue}
                            step={1}
                            style={styles.sliderstyle} minimumValue={0}
                            maximumValue={5000000}
                            minimumTrackTintColor={"#0070D2"}
                            maximumTrackTintColor="#C4C4C4"
                            thumbTintColor={colors.coreBlue}
                            onValueChange={onSliderValueChange}
                        />
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.number}>
                            ₹ 1L
                        </Text>
                        <Text style={styles.number}>
                            ₹ 50L
                        </Text>
                    </View>

                    <TextInput
                        maxLength={7}
                        keyboardType="numeric"
                        style={styles.inputbox} onChangeText={onTextInputChange}
                        onEndEditing={(event) => onTextInputEndEditing(event.nativeEvent.text)}
                        value={text}
                    />

                </View>

                {/* Requested Monthly Tenure */}
                <View style={{ justifyContent: 'center', marginTop: verticalScale(28) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.star}>*</Text>
                        <Text style={styles.title}>Requested Monthly Tenure</Text>
                    </View>
                    <View style={{
                        marginVertical: verticalScale(10),
                    }}>
                        <Slider
                            value={sliderValue2}
                            step={1}
                            style={styles.sliderstyle} minimumValue={0}
                            maximumValue={360}
                            minimumTrackTintColor={"#0070D2"}
                            maximumTrackTintColor="#C4C4C4" thumbTintColor={colors.coreBlue}
                            onValueChange={onSliderValueChange2}
                        />
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.number}>
                            12 Months
                        </Text>
                        <Text style={styles.number}>
                            360 Months
                        </Text>
                    </View>

                    <TextInput
                        maxLength={3}
                        keyboardType="numeric"
                        style={styles.inputbox} onChangeText={onTextInputChange2}
                        onEndEditing={(event) => onTextInputEndEditing2(event.nativeEvent.text)}
                        value={text2}
                    />

                </View>

                {/* Rate of Interest */}
                <View style={{ justifyContent: 'center', marginTop: verticalScale(28) }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.star}>*</Text>
                        <Text style={styles.title}>Rate Of Interest</Text>
                    </View>
                    <View style={{
                        marginVertical: verticalScale(10),
                    }}>
                        <Slider
                            value={sliderValue3}
                            step={1}
                            style={styles.sliderstyle}
                            minimumValue={0}
                            maximumValue={25}
                            minimumTrackTintColor={"#0070D2"}
                            maximumTrackTintColor="#C4C4C4" thumbTintColor={colors.coreBlue}
                            onValueChange={onSliderValueChange3}
                        />
                    </View>
                    <View style={styles.numberView}>
                        <Text style={styles.number}>
                            1%
                        </Text>
                        <Text style={styles.number}>
                            25%
                        </Text>
                    </View>

                    <TextInput
                        maxLength={2}
                        keyboardType="numeric"
                        style={styles.inputbox}
                        onChangeText={onTextInputChange3}
                        onEndEditing={(event) => onTextInputEndEditing3(event.nativeEvent.text)}
                        value={text3}
                    />

                </View>

                {emi > 0 && (
                    <View style={styles.emiview}>
                        <Text style={styles.emi}>EMI: ₹{emi}</Text>
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
            </ScrollView>
        </View>
    )
}

export default EmiCalculator

const styles = StyleSheet.create({
    button: {
        marginTop: verticalScale(30),
        marginBottom: verticalScale(10),
        backgroundColor: '#0076C7',
        marginHorizontal: horizontalScale(120)
    },
    sliderstyle: {
        width: '50%', alignSelf: 'center', transform: [{ scaleX: verticalScale(2), }, { scaleY: verticalScale(2) }], borderRadius: 20, height: verticalScale(30)
    },
    emi: {
        fontSize: 24, fontWeight: '600', color: '#000000'
    },
    number: { color: "#3E3E3C", fontSize: 16, fontWeight: '400', lineHeight: 18 },
    numberView: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: horizontalScale(15), marginTop: verticalScale(-8) },
    emiview: { alignItems: 'center', marginTop: verticalScale(25), },
    inputbox: { borderBottomWidth: 0.5, borderBottomColor: 'grey', backgroundColor: 'transparent', maxWidth: '90%', marginHorizontal: horizontalScale(18), marginTop: verticalScale(-5), marginBottom: verticalScale(5) },
    star: { marginLeft: horizontalScale(20), color: "#C23934", bottom: verticalScale(2) },
    title: { color: "#3E3E3C", fontSize: 14, fontWeight: '400', lineHeight: 18 },

})