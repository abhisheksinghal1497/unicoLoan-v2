import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

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