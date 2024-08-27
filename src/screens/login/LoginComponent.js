import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { colors } from '../../colors';
import CustomShadow from '../../components/FormComponents/CustomShadow';
import InputField from '../../components/FormComponents/InputField';

const LoginComponent = () => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpField, setShowOtpField] = useState(false);
    const phoneInputRef = useRef(null); const handlePhoneNumberChange = (text) => {
        setPhoneNumber(text);
    };

    const handleSendOtp = () => {
        // Here you would typically make an API call to send the OTP to the phone number
        // For this example, we'll just simulate the process
        console.log('Sending OTP to', phoneNumber);
        setShowOtpField(true);
        phoneInputRef.current.blur(); // Dismiss keyboard after sending OTP
    }; const handleLogin = () => {
        // Here you would make an API call to verify the OTP and log in the user
        console.log('Logging in with OTP', otp);
    };

    const handleOtpChange = (text) => {
        setOtp(text);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text_font_20}>Welcome Back</Text>
            <Text style={[styles.text_font_18, { marginTop: 5 }]}>Let's resume your journey!</Text>
            <Text style={[styles.text_font_14]}>As you are our existing user,{'\n'}please login using your mobile number</Text>

            <CustomShadow containerStyle={{ marginTop: 24 }}>
                <View style={{
                    flexDirection: 'row', minHeight: 60, alignItems: 'center', paddingHorizontal: 8, justifyContent: 'space-around', width: '100%'

                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.text_font_18}>+91</Text>
                        <TextInput
                            ref={phoneInputRef}
                            style={[{ marginHorizontal: 8 }, styles.text_font_18]}
                            maxLength={10}
                            placeholder="Mobile number"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={handlePhoneNumberChange}
                        />
                    </View>
                    <Text style={[{
                        alignItems: 'flex-end', fontFamily: "Nunito",
                        fontSize: 14,
                        fontWeight: "400",
                        fontStyle: "normal",
                        lineHeight: 14,
                        color: "#21005B"
                    }]}>Verify</Text>

                </View>
            </CustomShadow>



            <Button title="Send OTP" onPress={handleSendOtp} disabled={!phoneNumber} />
            {/* {showOtpField && (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        keyboardType="number-pad"
                        value={otp}
                        onChangeText={handleOtpChange}
                    />
                    <Button title="Login" onPress={handleLogin} disabled={!otp} />
                </View>
            )}
            {showOtpField && (
                <Text style={styles.otpSentMessage}>OTP has been sent to {phoneNumber}</Text>
            )} */}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 24,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    otpSentMessage: {
        marginTop: 10,
        textAlign: 'center',
    },

    text_font_20: {
        fontFamily: "Nunito",
        fontSize: 20,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 28,
        color: colors.black
    },
    text_font_18: {
        fontFamily: "Nunito",
        fontSize: 18,
        fontWeight: "500",
        fontStyle: "normal",
        lineHeight: 28,
        color: colors.black
    },
    text_font_14: {
        fontFamily: "Nunito",
        fontSize: 14,
        fontWeight: "400",
        fontStyle: "normal",
        lineHeight: 14,

        color: "#464646",
        marginVertical: 16
    }
});



export default LoginComponent;