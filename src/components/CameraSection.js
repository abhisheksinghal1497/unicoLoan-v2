import { StyleSheet, View, TouchableOpacity ,Image} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default function CameraSection({ onCameraPress,onCameraCross,onCameraReload,cross,reload }) {
  return (
    <View style={cross  ? styles.container : styles.containerSecond}>
       {cross &&(
          <TouchableOpacity onPress={onCameraCross} style={styles.crossButton}>
          <Image source={require('../../assets/images/cross.png')} style={styles.crossImage} />
        </TouchableOpacity>
        )}
      
      <TouchableOpacity onPress={onCameraPress} style={styles.cameraButton}>
        <Icon name="camera" size={30} color="white" />
      </TouchableOpacity>
      {reload &&(
        <TouchableOpacity onPress={onCameraReload} style={styles.reloadButton}>
        {/* <AntDesignIcon name="reload1" size={30} color="#2E52A1" /> */}
        <Image source={require('../../assets/images/retry.png')} style={styles.crossImage} />
      </TouchableOpacity>
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginTop: 50, height: '20%', width: '100%', justifyContent: 'space-between', alignItems: 'center',flexDirection:'row' },
  containerSecond: { marginTop: 10, height: '20%', width: '100%', justifyContent: 'center', alignItems: 'center' },
  cameraButton: { height: 90, width: 90, borderRadius: 45, backgroundColor: '#2E52A1', justifyContent: 'center', alignItems: 'center' },
  crossButton:{height: 90, width: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center'},
  crossImage:{height:40,width:40, resizeMode: 'contain',},
  reloadButton:{height: 90, width: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center'}
})