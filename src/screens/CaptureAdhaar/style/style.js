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
buttonInner:{ justifyContent: 'center',backgroundColor: colors.white, borderColor: colors.black, borderWidth: 1 ,
  height: 55,
  borderRadius: 50,
  shadowColor: colors.shadowColor,
  shadowOffset: {
    width: 0,
    height: 4
  },
  elevation:6,
  shadowRadius: 10,
  shadowOpacity: 1,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: colors.BLUE_BORDER_COLOR
 },
buttonText:{ color: colors.white, fontSize: 16, fontFamily: '500' },
buttonTextSecond: { color: "blue",fontSize:16,fontFamily:'500' },
buttonInnerSecond:{ height: 60, borderRadius: 30, justifyContent: 'center' ,
  borderRadius: 50,
  backgroundColor: colors.coreBlue,
  shadowColor: colors.shadowColor,
  elevation:6,
  shadowOffset: {
    width: 0,
    height: 4
  },
  shadowRadius: 10,
  shadowOpacity: 1
}
 
});
