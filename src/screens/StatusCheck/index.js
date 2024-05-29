import { StyleSheet, Text, View, ScrollView, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header';
import { colors } from '../../colors';
import { horizontalScale, verticalScale } from '../../utils/matrcis';

const data = [
  { id: '1', title: 'Applicant Details', imagePathActive: require('../../../assets/images/MapPinLineGreen.png'), imagePathUnActive: require('../../../assets/images/MapPinLineGrey.png') },
  { id: '2', title: 'PAN and KYC Verified', imagePathActive: require('../../../assets/images/MapPinLineGreen.png'), imagePathUnActive: require('../../../assets/images/MapPinLineGrey.png') },
  { id: '3', title: 'Loan Details', imagePathActive: require('../../../assets/images/MapPinLineGreen.png'), imagePathUnActive: require('../../../assets/images/MapPinLineGrey.png') },
  { id: '4', title: 'Eligibility', imagePathActive: require('../../../assets/images/MapPinLineGreen.png'), imagePathUnActive: require('../../../assets/images/MapPinLineGrey.png') },
  { id: '5', title: 'In-Principle Sanction', imagePathActive: require('../../../assets/images/MapPinLineGreen.png'), imagePathUnActive: require('../../../assets/images/MapPinLineGrey.png') },
  { id: '6', title: '', imagePathActive: require('../../../assets/images/loandone.png'), }
];

const StatusCheck = () => {

  const renderItem = ({ item, index }) => {
    const isLeft = index % 2 === 0;
    const itemStyle = isLeft ? styles.itemLeft : styles.itemRight;
    const itemContainerStyle = isLeft ? styles.itemContainerLeft : styles.itemContainerRight;

    return (
      <View style={[styles.itemContainer, itemContainerStyle, { marginHorizontal: horizontalScale(index == 0 ? 36 : index == 1 ? 10 : index == 2 ? 60 : index == 3 ? 82 : index == 4 ? 15 : 75), }]}>
        {
          index == 0 || index == 2 || index == 4 ?
            <View style={[styles.item, itemStyle, { flexDirection: 'row' }]}>
              <Text style={{ fontSize: 12, fontWeight: '500', color: colors.black, marginTop: verticalScale(18), right: horizontalScale(8) }}>{item.title}</Text>
              <Image
                style={{ width: 25, height: 25, resizeMode: 'contain' }}
                source={item.imagePathActive}
              />
            </View> :
            <View style={[styles.item, itemStyle, { flexDirection: 'row', }]}>
              <Image
                style={{ width: index == 5 ? 50 : 25, height: index == 5 ? 53 : 25, resizeMode: 'contain', marginHorizontal: horizontalScale(index == 5 && 20) }}
                source={item.imagePathActive}
              />
              <Text style={{ fontSize: 12, fontWeight: '500', color: colors.black, marginTop: verticalScale(18), left: horizontalScale(8) }}>{item.title}</Text>
            </View>}

      </View>
    );
  };

  return (
    <ScrollView style={{ backgroundColor: colors.white }} >
      <View style={styles.container}>
        <View style={{ marginHorizontal: horizontalScale(-10), alignItems: 'center' }}>
          <Header
            onPressLeft={() => navigation.navigate('KYCDocuments')}
            colour={colors.transparent}
            left={require('../../../assets/images/Back.png')}
            leftStyle={{ width: 27, height: 27, marginRight: horizontalScale(0) }}
            title="Loan Status Check"
          />
        </View>
        <View style={styles.card}>
          <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
            <Text style={styles.uhfl}>
              UNICO HOUSING FINANCE LIMITED
            </Text>
          </View>
          < View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Image
                style={styles.loanimage}
                source={require('../../../assets/images/statuscheckk.png')}
              />
            </View>
            <View style={{ marginLeft: horizontalScale(8) }}>
              <Text style={styles.loantext}>
                Home Loan
              </Text>
              <Text style={styles.loantext}>
                LAN: H402HHL0622560
              </Text>
            </View>
          </View>
        </View>

{/* case 1 = 10 */}
{/* case 2 = 90 */}
{/* case 3 = 171 */}
{/* case 4 = 251 */}
{/* case 5 = 333 */}
{/* case 6 = 420 */}

        <Text style={styles.header}>Apply for loan</Text>
        <View style={{ marginTop: verticalScale(0) }}>
          <View style={styles.line}>
            <Image source={require('../../../assets/images/homekey.png')}
             style={[styles.key,{marginTop: verticalScale(10)}]} />
            <View style={styles.line2}>
              <View style={styles.dash1} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              <View style={styles.dash} />
              {/* Add more dashes as needed */}
            </View>

          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>

      </View>
    </ScrollView>
  )
}

export default StatusCheck

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white
  },
  uhfl:{
    fontWeight: '500', fontSize: 9, color: "#2E52A1", lineHeight: 9.75
  },
  loanimage:{
    width: 55, height: 55, resizeMode: 'contain', borderRadius: 5
  },
  key:{
    width: 40, height: 42,
    resizeMode: 'contain', alignSelf: 'center',
  },
  loantext:{
    fontWeight: '500', fontSize: 15, color: '#2E52A1'
  },
  card: {
    width: '97.5%',
    height: 85,
    backgroundColor: colors.coreCream,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: horizontalScale(6),
    paddingVertical: verticalScale(10.5)
  },
  header: {
    fontSize: 12,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: verticalScale(15),
    color: colors.black
  },
  line: {
    position: 'absolute',
    height: 500,
    width: 20,
    backgroundColor: colors.black,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    marginTop: verticalScale(12),
    borderRadius: 16
  },
  line2: {
    position: 'absolute',
    height: 450,
    width: 3,
    backgroundColor: 'transparent',
    marginHorizontal: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(20),

  },
  dash: {
    width: '100%',
    height: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: verticalScale(10),
  },
  dash1: {
    width: '100%',
    height: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10)
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginVertical: 5,
    padding: 10,
  },
  itemContainerLeft: {
    justifyContent: 'flex-start',
    marginRight: 10,
  },
  itemContainerRight: {
    justifyContent: 'flex-end',
    marginLeft: 10,
  },
  itemLeft: {
    alignSelf: 'flex-start',
  },
  itemRight: {
    alignSelf: 'flex-end',
  },
})