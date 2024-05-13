import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Dimensions, View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView } from 'react-native';
import CardComponent from './cardComponent';
import { colors } from '../../colors';
import customTheme from '../../colors/theme';
import  CircularProgress  from "../../components/CircularProgress";
import { screens } from '../../constants/screens';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = (props) => {
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const [currentScreen, setCurrentScreen] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      const savedData = await AsyncStorage.getItem('CurrentScreen');
      const currentData = JSON.parse(savedData);
      console.log(currentData,'current Screen');
      setCurrentScreen(currentData)
      

    }
    fetchData();
  }, []);

  const onResume = () =>{
    console.log(currentScreen)
    props?.navigation?.navigate(currentScreen)
  }

  const data = [
    {
      loanTitle: 'Home Loan',
      lan: 'H402HHL0622560',
      loanAmount: '₹ 2,836,000',
      roi: '9.25%',
      tenure: '18/100',
      nextPayment: '₹ 2,836',
      paymentDate: '29th April 2024',
      NextPaymentText: 'Next Payment'
    },
    {
      loanTitle: 'Home Loan',
      lan: 'H402HHL0622560',
      loanAmount: '₹ 2,836,000',
      roi: '9.25%',
      tenure: '18/100',
      nextPayment: '₹ 2,836',
      paymentDate: '29th April 2024',
      NextPaymentText: 'Next Payment'
    },
    {
      loanTitle: 'Home Loan',
      lan: 'H402HHL0622560',
      loanAmount: '₹ 2,836,000',
      roi: '9.25%',
      kyc_Pan: 'PAN and KYC',
    },
  ];

  const cardWidth = 350;

  const renderItems = ({ item, index }) => {
    return (
      <View style={[styles.card,]}>
        <View style={styles.loanView}>
          <Text style={styles.loanTitle}>{item.loanTitle}</Text>
          <Text style={styles.uhfl}>UNICO HOUSING FINANCE LIMITED</Text>
        </View>
        <View style={styles.lanloanview}>
          <Text style={styles.lan}>LAN: {item.lan}</Text>
          <Text style={styles.loanAmountText}>Loan Amount</Text>
        </View>
        <View>
          <Text style={styles.loanAmount}>{item.loanAmount}</Text>
          <View style={styles.bottomLine}></View>
          <Text style={styles.roiText}>ROI</Text>
          <Text style={styles.roi}>{item.roi}</Text>
          <View style={styles.bottomLine}></View>
          {item.tenure && (
            <>
              <Text style={styles.tenuretext}>Tenure</Text>
              <Text style={styles.tenure}>{item.tenure}</Text>
            </>
          )}

        </View>
        <View style={styles.belowCardView}>

          <CircularProgress size ={90} strokeWidth={15}  progressPercent={10} bgColor ={'#F2F2F2'} pgColor={'#2E52A1'} />
          <View style={{ marginLeft: 11.5 }}>
            {item.nextPayment && item.paymentDate && item.NextPaymentText && (
              <><Text style={styles.naxtPaymentKyc}>{item.NextPaymentText}</Text><Text style={styles.naxtPaymentKyc2}>{item.nextPayment}</Text><Text style={styles.paymentDate}>{item.paymentDate}</Text></>
            )}
            {
              item.kyc_Pan && (
                <Text style={styles.naxtPaymentKyc}>{item.kyc_Pan}</Text>
              )
            }
          </View>
        </View>
        <View style={[styles.cardBottomBar, { marginTop: !item.tenure ? 45 : 2, }]}>
          {item.nextPayment && item.paymentDate && item.NextPaymentText ? (
            <TouchableOpacity style={styles.seeDetailsresumeJourneyButton}>
              <Text style={styles.seeDetailsresumeJourneyText}>See Details</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.seeDetailsresumeJourneyButton} onPress={() => onResume()}>
              <Text style={styles.seeDetailsresumeJourneyText}>Resume Journey</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: colors.coreCream, height: '27.5%' }}>
        <View style={styles.profileImageView}>
          <Image source={require('../../../assets/images/profileIcon.png')} style={styles.profileIcon} />
          <Text style={styles.profileName}>Bhavesh Rao</Text>
        </View>
        <View style={{ position: 'absolute', top: 70 }}>
          <CardComponent />
        </View>
      </View>
      <View style={{ marginTop: 21, top: 65 }}>
        <Text style={styles.yourLoan}>
          Your Loans
        </Text>
        {data.length === 0 ? (
          <View style={styles.loanapplyview}>
            <ImageBackground
              style={styles.imgBackground}
              source={require('../../../assets/images/loanapply.png')}
            >
              <Text style={styles.applyforloan} >Apply For Loan</Text>
            </ImageBackground>
          </View>
        ) :
          <View style={styles.secondcards}>
            <FlatList
              ref={flatListRef}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: (screenWidth - cardWidth) / 2,
              }}
            />
          </View>
        }

      </View>

      <View style={{ marginTop: 85 }}>
        <Text style={styles.ourSerices}>
          Our Services
        </Text>
        <View style={styles.ourSericesCards}>
          <TouchableOpacity style={styles.servicesCards}>
            <Image
              style={styles.serviceImage}
              source={require('../../../assets/images/Calculators.png')}
            />
            <Text style={styles.serviceText}>
              Calulators
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.servicesCards} onPress={() => {
            props?.navigation?.navigate(screens.ApplicantDetails)
          }}>
            <Image
              style={styles.serviceImage}
              source={require('../../../assets/images/applyForLoan.png')}
            />
            <Text style={styles.serviceText}>
              Apply For Loan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.servicesCards}>
            <Image
              style={styles.serviceImage}
              source={require('../../../assets/images/StatusCheck.png')}
            />
            <Text style={styles.serviceText}>
              Status Check
            </Text>
          </TouchableOpacity>

        </View>
      </View>

    </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loanView: { marginTop: 13, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 21, paddingRight: 14, alignItems: 'center' },
  loanTitle: { color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelMedium.fontWeight },
  uhfl: { color: colors.coreBlue, fontSize: 8, fontWeight: customTheme.fonts.labelMedium.fontWeight },
  profileImageView: { flexDirection: 'row', alignItems: 'center', left: 40, marginBottom: 10, marginTop: 21 },
  lanloanview: { marginTop: 6, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 21, paddingRight: 14, alignItems: 'center' },
  lan: {
    color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelMedium.fontWeight
  },
  loanAmountText: {
    color: colors.coreBlue, fontSize: 10, fontWeight: customTheme.fonts.labelMedium.fontWeight, paddingRight: 12
  },
  loanAmount: {
    alignSelf: 'flex-end', marginRight: 14, color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelLarge.fontWeight, marginBottom: 5
  },
  bottomLine: { borderBottomWidth: 1, borderColor: colors.coreBlue, width: '20%', alignSelf: 'flex-end', marginRight: 18 },
  roiText: {
    alignSelf: 'flex-end', color: colors.coreBlue, fontSize: 10, fontWeight: customTheme.fonts.labelMedium.fontWeight, paddingRight: 72, marginTop: 4
  },
  roi: {
    alignSelf: 'flex-end', marginRight: 50, color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelLarge.fontWeight, marginBottom: 5
  },
  tenure: {
    alignSelf: 'flex-end', marginRight: 45, color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelLarge.fontWeight, marginBottom: 5
  },
  tenuretext: {
    alignSelf: 'flex-end', color: colors.coreBlue, fontSize: 10, fontWeight: customTheme.fonts.labelMedium.fontWeight, paddingRight: 58, marginTop: 4
  },
  belowCardView: {
    position: 'absolute', top: 75, left: 20.5, flexDirection: 'row', alignItems: 'center'
  },
  cardBottomBar: {
    height: 35, backgroundColor: colors.coreBlue, borderBottomRightRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', width: '100%', alignSelf: 'center'
  },
  paymentDate: {
    color: colors.greylight, fontWeight: customTheme.fonts.labelMedium.fontWeight, fontSize: 10
  },
  naxtPaymentKyc: {
    color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelLarge.fontWeight, marginBottom: 2
  },
  naxtPaymentKyc2: {
    color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelMedium.fontWeight, marginBottom: 2
  },
  loanapplyview: {
    width: '80%', height: 168, borderRadius: 30, alignSelf: 'center',
  },
  secondcards: {
    justifyContent: 'center', alignItems: 'center'
  },
  applyforloan: {
    alignSelf: 'center', top: 50, color: colors.white, fontWeight: customTheme.fonts.labelLarge.fontWeight, letterSpacing: 1.5, fontSize: 18
  },
  profileIcon: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 4,
  },
  imgBackground: {
    width: '100%', height: '100%', resizeMode: 'cover', justifyContent: 'center'
  },
  ProgressCardImage: {
    width: 87,
    height: 87,
  },
  profileName: {
    fontSize: 20,
    fontWeight: customTheme.fonts.labelLarge.fontWeight,
    lineHeight: 28,
    color: colors.black
  },

  card: {
    padding: 0,
    borderRadius: 10,
    backgroundColor: colors.coreCream,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 206,
    marginRight: 10,
    width: 350,
    marginBottom: 5
  },

  ourSerices: {
    color: colors.black, fontSize: 18, lineHeight: 28, left: 30, bottom: 5
  },
  servicesCards: {
    width: 105.5, height: 104.5, backgroundColor: colors.white, borderRadius: 6, shadowColor: colors.black, marginBottom: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5, justifyContent: 'center'
  },
  ourSericesCards:
    { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, flexWrap: 'wrap', },
  serviceImage:
    { width: 39, height: 39, resizeMode: 'contain', alignSelf: 'center' },
  serviceText: { color: colors.coreBlue, fontSize: 12, fontWeight: customTheme.fonts.labelMedium.fontWeight, alignSelf: 'center', marginTop: 9 },
  yourLoan: {

    color: colors.black, fontSize: 18, lineHeight: 28, left: 30, bottom: 5
  },
  seeDetailsresumeJourneyButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderColor: colors.coreCream,
    borderRadius: 4,
  },
  seeDetailsresumeJourneyText: {
    fontSize: 10,
    color: colors.coreCream,
  },

});

export default HomeScreen;


