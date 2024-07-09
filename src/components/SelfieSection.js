import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function AdhaarSection({ AdhaarText, uri , childStyle}) {
  return (
    <View style={[styles.container ]}>
      {uri ? (
        <>
          {/* <View style={styles.section}>
            <Image
              source={{ uri }}
              style={styles.imageContainer}
            />
          </View> */}
          <View style={[styles.emptySection, childStyle && childStyle]}>
          <Image
              source={{ uri }}
              style={styles.imageContainer}
            />
         </View>
        </>
      ) :  <View style={styles.emptySection}>
      </View>}

     


    </View>
  )
}

const styles = StyleSheet.create({
  container: { marginTop: '10%',height:'40%',  width: '100%', justifyContent: 'center',alignItems:'center', },
  section: { height: '80%', width: '100%', justifyContent: 'center', alignItems: 'center', borderColor: 'grey' },
  imageContainer: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius:  150, borderWidth: 2, borderColor: '#C8D0EF',
  },
  emptySection: { height: 300, borderRadius: 150, borderWidth: 2, borderColor: '#C8D0EF', width: 300, justifyContent: 'center', alignItems: 'center' },
  textSection: { fontSize: 20, marginLeft: 10, fontWeight: '300', color: '#7C7E8B' }
})