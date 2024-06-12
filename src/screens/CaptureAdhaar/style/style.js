import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../colors';
import customTheme from '../../../colors/theme';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  buttonStyle:{
    width: "48%",
},
buttonInner:{ height: 60, borderRadius: 30, justifyContent: 'center',backgroundColor: 'white', borderColor: 'black', borderWidth: 1  },
buttonText:{ color: colors.white, fontSize: 16, fontFamily: '500' },
buttonTextSecond: { color: "blue",fontSize:16,fontFamily:'500' },
buttonInnerSecond:{ height: 60, borderRadius: 30, justifyContent: 'center' }
 
});
