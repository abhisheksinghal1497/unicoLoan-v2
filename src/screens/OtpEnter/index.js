import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Button from "../../components/Button";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { Image } from "react-native";
import { colors } from "../../colors";

const OtpScreen = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(49);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    setIntervalId(id);
    return () => clearInterval(intervalId);
  }, []);

  const handleOnSubmit = () => {
    if (!code) {
      setErrorMessage("Please Enter OTP");
    } else if (code.length !== 4) {
      setErrorMessage("Please enter all four digits of OTP");
    } else {
      console.log("Code is", code);
      setErrorMessage("");
      navigation.navigate("HomeScreen");
    }
  };

  const handleCodeChanged = (newCode) => {
    setCode(newCode);
    if (errorMessage && newCode.length === 4) {
      setErrorMessage("");
    }
  };

  const handleResend = () => {
    clearInterval(intervalId);
    setTimer(49);
    const id = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    setIntervalId(id);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"#EFEFED"} />
      <ImageBackground
        source={require("../../assets/city.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ paddingHorizontal: horizontalScale(30) }}>
          <View style={{ marginTop: verticalScale(-260) }}>
            <Text
              style={{
                color: "#000000",
                fontSize: 20,
                fontWeight: "600",
                lineHeight: 28,
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                color: "#000000",
                fontSize: 18,
                fontWeight: "500",
                lineHeight: 28,
              }}
            >
              Let's resume your journey!
            </Text>
            <Text
              style={{
                color: "#000000",
                fontSize: 20,
                fontWeight: "600",
                lineHeight: 28,
                marginTop: verticalScale(32),
              }}
            >
              Enter OTP
            </Text>
            <Text
              style={{
                color: "#464646",
                fontSize: 14,
                fontWeight: "400",
                lineHeight: 19,
                marginTop: verticalScale(10),
              }}
            >
              OTP has sent to your Mobile Number
            </Text>
            <OTPInputView
              style={{
                width: "100%",
                height: 80,
                marginBottom: verticalScale(0),
                marginTop: verticalScale(0),
              }}
              pinCount={4}
              onCodeChanged={handleCodeChanged}
              code={code}
              codeInputFieldStyle={[
                styles.underlineStyleBase,
                { borderColor: errorMessage ? "red" : "transparent" },
              ]}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`);
                setErrorMessage("");
              }}
            />
            {errorMessage ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/ErrorSign.png")}
                  style={{
                    width: 12,
                    height: 14,
                    marginRight: horizontalScale(5),
                    marginTop: verticalScale(2),
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{ color: "#E8292D", fontWeight: "400", fontSize: 14 }}
                >
                  {errorMessage}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View
          style={[
            styles.buttonview,
            {
              marginTop: errorMessage ? verticalScale(-5) : verticalScale(-25),
            },
          ]}
        >
          <Button
            onPress={() => handleOnSubmit()}
            type="primary"
            label="Submit"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: verticalScale(12),
          }}
        >
          <Text
            style={{
              color: "#3E3E3C",
              fontSize: 12,
              fontWeight: "500",
              lineHeight: 18,
              marginRight: horizontalScale(1),
            }}
          >
            OTP will expire in 00:{timer}{" "}
          </Text>
          {timer === 0 && (
            <TouchableOpacity onPress={handleResend}>
              <Text
                style={{
                  color: "#0076C7",
                  fontSize: 12,
                  fontWeight: "500",
                  lineHeight: 18,
                }}
              >
                Resend
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginTop: verticalScale(240),
          }}
        >
          <Text
            style={{
              fontWeight: "400",
              fontSize: 16,
              lineHeight: 21,
              color: colors.black,
            }}
          >
            Not registered yet?
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                fontWeight: "400",
                fontSize: 16,
                lineHeight: 21,
                color: "#0076C7",
              }}
            >
              {" "}
              Click here to register
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#EFEFED",
  },
  buttonview: {
    marginHorizontal: horizontalScale(30),
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },

  borderStyleHighLighted: {
    borderColor: "red",
    borderWidth: 1,
  },

  underlineStyleBase: {
    width: 65,
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    color: "#000000",
    fontWeight: "700",
    fontSize: 20,
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 4, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
