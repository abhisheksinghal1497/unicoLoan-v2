import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../colors';
import customTheme from '../../../colors/theme';


const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
  },
  Nointernet: {
    fontSize: 18,
    fontWeight: customTheme.fonts.mediumText.fontWeight,
    color: colors.black,
    alignSelf: 'center',
    marginTop: 10
  },
  connection: {
    fontSize: 14,
    fontWeight: customTheme.fonts.regularText.fontWeight,
    color: colors.black,
    alignSelf: 'center',
    marginTop: 6,
    maxWidth: '70%',
    textAlign: 'center',
    lineHeight: 22
  }
});
