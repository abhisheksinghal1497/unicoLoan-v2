import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'

export default function AdhaarSection({AdhaarText,uri}) {
  return (
    <View style ={{marginTop:'10%',height:'40%',width:'100%',justifyContent:'center'}}>
        {uri ? (
  <>
        <View style={{height:'80%',width:'100%',justifyContent:'center',alignItems:'center',borderColor:'grey'}}>
          <Image
            source={{ uri }}
            style={{
              width: '100%',
              height: '100%',
              resizeMode:'stretch',
              borderRadius:15,borderWidth:1.5,borderColor:'#C8D0EF',
            }}
          />
        </View>
        </>
        ) : <View style={{height:'80%',borderRadius:15,borderWidth:1.5,borderColor:'#C8D0EF', width:'100%',justifyContent:'center',alignItems:'center'}}>
        <Text style={{ fontSize: 20,marginLeft:10,fontWeight:'300',color:'#7C7E8B'}}>{AdhaarText}</Text>
        </View>}
      
      
    </View>
  )
}

const styles = StyleSheet.create({
    leadImageWrapper:{
        height:'100%',
        width:'100%'
    }
})