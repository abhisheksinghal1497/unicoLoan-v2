import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import customTheme from '../colors/theme';
import { colors } from '../colors';

const Card = ({cardStyle={}, children}) => {
  return (
    <View style={[styles.containerStyle,cardStyle]}>
      {children}
    </View>
  )
}

export default Card;

const styles=StyleSheet.create({
    containerStyle:{
        backgroundColor:colors.white,
        borderRadius:15,
        borderWidth:1,
        borderColor:colors.gray250,
        paddingTop:20,
        paddingHorizontal:20,
        elevation:5,
        shadowColor:colors.black,
        shadowOpacity:.4,
        shadowOffset:{
            x:4,y:4
        }
    }

})