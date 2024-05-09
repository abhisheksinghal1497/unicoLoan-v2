import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../colors';
import customTheme from '../../../colors/theme';


export const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, paddingTop: 50 },
  buttonStyle:{
    width: "48%",
},
buttonInner:{ height: 60, borderRadius: 30, justifyContent: 'center' },
buttonText:{ color: colors.white, fontSize: 16, fontFamily: '500' }
 
});
