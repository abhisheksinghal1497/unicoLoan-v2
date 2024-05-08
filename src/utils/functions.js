import { Alert } from 'react-native';
import Toast from 'react-native-simple-toast';

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

export const toast = (title) => {
    Toast.showWithGravity(
        title,
        Toast.LONG,
        Toast.BOTTOM,
    );
}