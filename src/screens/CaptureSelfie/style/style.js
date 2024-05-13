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
buttonInner:{ height: 60, borderRadius: 30, justifyContent: 'center' },
buttonText:{ color: colors.white, fontSize: 16, fontFamily: '500' },
noteContainer: {
    height:'5%',
    backgroundColor: 'rgba(239, 244, 253, 1)',
    padding: 10,
    width: '100%',
    paddingHorizontal: 20,
    paddingLeft: 40,
    marginTop: 20,
    borderRadius: 10,
  },
  bulbImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    position: 'absolute',
    top: -15,
    left: 8
  },
 
});
