import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { log } from './ConsoleLogUtils';

export const alert = (title, subTitle, onPressOK, onPressCancel) => {
    if (onPressCancel) {
        Alert.alert(
            title,
            subTitle,
            [
                {
                    text: 'Cancel',
                    onPress: () => onPressCancel(),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => onPressOK() },
            ],
            { cancelable: false }
        )
    } else {
        Alert.alert(
            title,
            subTitle,
            [
                { text: 'OK', onPress: () => onPressOK() },
            ],
            { cancelable: false }
        )
    }

}

export const toast = (type, title, subTitle) => {
    Toast.show({
        type: type,
        text1: title,
        text2: subTitle
    });
}


export const isObjEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};



export function debounce(func, timeout = 2000) {
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
        let regex = new RegExp(/[6-9]\d{6}/, 'i');
        return regex.test(otp)
    } catch (error) {
        return true
    }


}

export const GetPicklistValues = (arr, fieldName) => {
    try {
        if (!arr || !fieldName) {
            return {};
        }
        const data = arr?.find((value) => value.name === fieldName)?.picklistValues;
        console.log("hari>>>>>>>>>>>>>>>>>>>data", data);

        return data
    } catch (error) {
        console.log("error>>>>>", error)
        
    }


};
