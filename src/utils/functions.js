import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { errorConsoleLog, log } from "./ConsoleLogUtils";
import { fetch } from "@react-native-community/netinfo";
import uuid from "react-native-uuid";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const alert = (title, subTitle, onPressOK, onPressCancel) => {
  if (onPressCancel) {
    Alert.alert(
      title,
      subTitle,
      [
        {
          text: "Cancel",
          onPress: () => onPressCancel(),
          style: "cancel",
        },
        { text: "OK", onPress: () => onPressOK() },
      ],
      { cancelable: false }
    );
  } else {
    Alert.alert(title, subTitle, [{ text: "OK", onPress: () => onPressOK() }], {
      cancelable: false,
    });
  }
};

export const toast = (type, title, subTitle) => {
  Toast.show({
    type: type,
    text1: title,
    text2: subTitle,
  });
};

export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

export function validateOtp(otp) {
  try {
    let regex = new RegExp(/[6-9]\d{6}/, "i");
    return regex.test(otp);
  } catch (error) {
    return true;
  }
}

export const convertFormArrToObj = (data = []) => {
  const obj = data.reduce(
    (prev, cur) => ({ ...prev, [cur.name]: { ...cur } }),
    {}
  );
  return obj;
};

export const GetPicklistValues = (arr, fieldName, defaultValues) => {
  try {

    if (!arr || !fieldName) {
      return {};
    }
    const data = arr?.find((value) => value.name === fieldName)?.picklistValues;
    console.log("array length>>>", arr?.length)

    return data && data?.length > 0 ? data : defaultValues;
  } catch (error) {

    return defaultValues;
  }
};

export const getConsentTime = () => {
  let timestamp = new Date().getTime();
  try {
    timestamp = Math.floor(timestamp / 1000);
  } catch (error) {
    console.error(error);
  } finally {
    return timestamp?.toString();
  }
};

export const getIpAddress = async () => {
  let ipAddress = "192.0.3.146"; // hardcoded for safer side

  try {
    const currentIpAddress = await fetch();
    log("currentIpAddress", currentIpAddress?.details?.ipAddress);
    if (currentIpAddress && currentIpAddress?.details?.ipAddress) {
      ipAddress = currentIpAddress?.details?.ipAddress;
    }
  } catch (error) {
    errorConsoleLog("IP ADDRESS", error);
  } finally {
    return ipAddress;
  }
};

export const getUniqueId = () => uuid?.v4();

export const useResetRoutes = () => {
  const navigation = useNavigation();
  const resetRoute = (screenName, params = {}) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: screenName, params },
        ],
      })
    );
  };
  return resetRoute;
};
