import { StyleSheet, Text, View ,TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';

export default function CameraSection({onCameraPress,uri}) {
  return (
    <View style={{marginTop:10,height:'20%',width:'100%',justifyContent:'center',alignItems:'center'}}>
        
        <TouchableOpacity onPress={onCameraPress} style={{height:90,width:90,borderRadius:45,backgroundColor:'#2E52A1',justifyContent:'center',alignItems:'center'}}>
        <Icon name="camera" size={30} color="white" />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})