import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Dimensions, View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
// import { NativeModules } from 'react-native';
import CardComponent from './cardComponent';
import { colors } from '../../colors';
import customTheme from '../../colors/theme';
import { horizontalScale, verticalScale } from '../../utils/matrcis';
import CircularProgress from '../../components/CircularProgress'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { screens } from "../../constants/screens";
import { getHomeScreenDetails, getHomeScreenOurServices } from '../../services/ApiUtils';
import CustomModal from '../../components/CustomModal';
// import VersionNumber  from 'react-native-version-number';

// const {AndroidVersionModule} = NativeModules;

const HomeScreen = ({navigation}) => {
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const getLoanCardData = getHomeScreenDetails()
  const getOurServicesCardData = getHomeScreenOurServices()
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDotIndex, setSelectedDotIndex] = useState(0); 
  const [showModal, setShowModal] = useState(false);

  const onPress = () => {
    AndroidVersionModule.createCalendarEvent('testName',  eventId => {
      console.log(`Created a new event with id ${eventId}`);
    },);
  };

  // useEffect(() => {
  //   const fetchAppVersion = async () => {
  //     try {
  //       const version = VersionNumber.appVersion;
  //       console.log("Version number fetched:", version);
  //       setAppVersion(version); 
  //     } catch (error) {
  //       console.error('Error fetching app version:', error);
  //     }
  //   };
  //   fetchAppVersion();
  // }, []);
  

  console.log('datatt', data)
  const [currentScreen, setCurrentScreen] = React.useState(false);

  // console.log('versionn--->',VersionNumber.appVersion)

  useEffect(()=>{
    getLoanCardData?.mutate()
    getOurServicesCardData?.mutate()
  },[])

  useEffect(()=>{
    if(getLoanCardData.data){
      setIsLoading(false)
      setData(getLoanCardData.data)
    }
  },[getLoanCardData.data])

  useEffect(()=>{
    if(getOurServicesCardData.data){
      setIsLoading(false)
      setData2(getOurServicesCardData.data)
    }
  },[getOurServicesCardData.data])

  useEffect(()=>{
    if(getLoanCardData.error){
      Alert.alert(getLoanCardData.error)
    }
  },[getLoanCardData.error])

  useEffect(()=>{
    if(getOurServicesCardData.error){
      Alert.alert(getOurServicesCardData.error)
    }
  },[getOurServicesCardData.error])

 
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
    navigation?.navigate(currentScreen)
  }

  const cardWidth = 350;
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.servicesCards}>
      <Image style={styles.serviceImage} source={item.image} />
      <Text style={styles.serviceText}>{item.title}</Text>
    </TouchableOpacity>
  );

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

          <CircularProgress  imageStyle={{ width: 40, height: 33 }} ImageData={require('../../../assets/images/Home2.png')} size ={90} strokeWidth={12}  progressPercent={item.ProgressBarPercent} bgColor ={colors.progressBg} pgColor={colors.coreBlue} />
          <View style={{ marginLeft: horizontalScale(11.5) }}>
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
        <View style={[ styles.cardBottomBar,{ marginTop: !item.tenure ? verticalScale(40) : verticalScale(2),} ] }>
        {item.nextPayment && item.paymentDate && item.NextPaymentText ? (
          <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: horizontalScale(105)}}>
            <TouchableOpacity onPress={()=> navigation.navigate(screens.ApplicantDetails,{
      ProgressBarPercent: item.ProgressBarPercent,
    })} style={styles.seeDetailsresumeJourneyButton}>
      <Text style={styles.seeDetailsresumeJourneyText}>See Details</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=> navigation.navigate(screens.PayNow)} style={styles.PayNowButton}>
      <Text style={styles.PayNowText}>Pay Now</Text>
    </TouchableOpacity>
            </View>
    
  ) : (
    <TouchableOpacity style={styles.seeDetailsresumeJourneyButton}   onPress={() => {
      const ProgressBarPercent = item.ProgressBarPercent || 0;
      navigation.navigate(screens.ApplicantDetails, { ProgressBarPercent });
    }}>
      <Text style={styles.seeDetailsresumeJourneyText}>Resume Journey</Text>
    </TouchableOpacity>
  )}
        </View>
      </View>
    );
  };

  const handleNavigation = (index) => {
   
    switch (index) {
      case 0:
        // setShowModal(true);
        navigation.navigate(screens.EmiCalculator)
        break;
      case 1:
        const ProgressBarPercent =  0;
        navigation.navigate(screens.ApplicantDetails, { ProgressBarPercent })
        break;
     case 2:
      navigation.navigate(screens.StatusCheck)
     break;
     case 3:
      navigation.navigate(screens.RaiseTicket)
     break;
     case 4:
      navigation.navigate(screens.MyTickets)
     break;
     case 5:
       navigation.navigate(screens.FAQ);
       break;
      default:
        break;
    }
  };

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
    setSelectedDotIndex(index);
  }

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / screenWidth);
    setSelectedDotIndex(index);
  };

  return (
    <View style={{ flex:1}}>
    <ScrollView>
    {/* <SafeAreaView style={styles.container}> */}
        {isLoading ? (
          <View style={styles.ActivityStyle}>
 <ActivityIndicator size="large" color={colors.coreBlue} />
          </View>
      ) : (
        <>
        {/* <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        // You can pass any necessary props to your modal component here
      >
 <TouchableOpacity style={{}} onPress={() => setShowModal(!showModal)}>
        <View style={[ { justifyContent:  "center",  }]}>
          <View>
            <Text style={styles.titleText}>EMI Calculator</Text>
           
             
              <TouchableOpacity onPress={() => setShowModal(!showModal)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            
          </View>
        </View>
      </TouchableOpacity>

      </CustomModal> */}
        <View style={{ backgroundColor: colors.coreCream, }}>
              {/* <View style={styles.profileImageView}> */}
                <TouchableOpacity
                
                style={styles.profileImageView} onPress={() => 
                  navigation.navigate(screens.Profile)
                  // onPress()
                }>
                  <Image source={require('../../../assets/images/profileIcon.png')} style={styles.profileIcon} />
              
                <Text style={styles.profileName}>Bhavesh Rao</Text>
                </TouchableOpacity>
              {/* </View> */}
              <View style={{marginBottom: verticalScale(-60) }}>
                <CardComponent />
              </View>
            </View><View style={{ marginTop: verticalScale(78) }}>
                <Text style={styles.yourLoan}>
                  Your Loans
                </Text>
                {data.length === 0 ? (
                  <TouchableOpacity  onPress={() => {
                    const ProgressBarPercent = item.ProgressBarPercent || 0;
                    navigation.navigate(screens.ApplicantDetails, { ProgressBarPercent });
                  }} style={styles.loanapplyview}>
                    <ImageBackground
                      style={styles.imgBackground}
                      source={require('../../../assets/images/loanapply.png')}
                    >
                      <Text style={styles.applyforloan}>Apply For Loan</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) :
                  <><View style={styles.secondcards}>
                    <FlatList
                      ref={flatListRef}
                      data={data}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={renderItems}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={{
                        paddingHorizontal: (screenWidth - cardWidth) / 2,
                        
            // scrollEventThrottle={16} 
                      }} 
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                      />
                  </View><View style={styles.dotsContainer}>
                      {data.map((_, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[styles.dot, selectedDotIndex === index && styles.selectedDot]}
                          onPress={() => scrollToIndex(index)} />
                      ))}
                    </View></>
                  }
              </View><View style={{ marginTop: verticalScale(20) }}>
                <Text style={styles.ourSerices}>
                  Our Services
                </Text>
                <View style={styles.ourSericesCards}>
                  {data2.map((item, index) => (
                    <TouchableOpacity
                      key={item.key}
                      style={styles.servicesCards}
                      onPress={() => handleNavigation(index)}
                    >
                      <Image style={styles.serviceImage} source={item.image} />
                      <Text style={styles.serviceText}>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              </>
      )}
    {/* </SafeAreaView> */}
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  cancelButton: {
    alignSelf: "center",
    marginTop: verticalScale(15),
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.coreBlue,
  },
  cancelButtonText: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(15),
    alignItems:'center'
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.grey,
    marginHorizontal: 5,
  },
  selectedDot: {
    backgroundColor: colors.coreBlue,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  ActivityStyle:{
    flex: 1,
    justifyContent: 'center',
    alignSelf:'center',
    marginTop: verticalScale(325)
  },

  loanView:{ marginTop: verticalScale(13), flexDirection: 'row', justifyContent: 'space-between', paddingLeft: horizontalScale(21), paddingRight: horizontalScale(14), alignItems: 'center' },
  loanTitle:{color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelMedium.fontWeight},
  uhfl:{ color: colors.coreBlue, fontSize: 8, fontWeight: customTheme.fonts.labelMedium.fontWeight },
  profileImageView:{ flexDirection: 'row', alignItems: 'center', left: horizontalScale(40), marginBottom: verticalScale(10), marginTop: verticalScale(21) },
  lanloanview:{ marginTop: verticalScale(6), flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 21, paddingRight: 14, alignItems: 'center' },
  lan:{
     color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelMedium.fontWeight 
  },
  loanAmountText: {
    color: colors.coreBlue, fontSize: 10, fontWeight: customTheme.fonts.labelMedium.fontWeight, paddingRight: 12
  },
  loanAmount: {
    alignSelf: 'flex-end', marginRight: horizontalScale(14), color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelLarge.fontWeight, marginBottom: 5
  },
  bottomLine: { borderBottomWidth: 1, borderColor: colors.coreBlue, width: '20%', alignSelf: 'flex-end', marginRight: horizontalScale(18) },
  roiText: {
    alignSelf: 'flex-end', color: colors.coreBlue, fontSize: 10, fontWeight: customTheme.fonts.labelMedium.fontWeight, paddingRight: horizontalScale(73.5), marginTop: 4
  },
  roi: {
    alignSelf: 'flex-end', marginRight: horizontalScale(50), color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelLarge.fontWeight, marginBottom: 5
  },
  tenure: {
    alignSelf: 'flex-end', marginRight: horizontalScale(44), color: colors.coreBlue, fontSize: 14, fontWeight: customTheme.fonts.labelLarge.fontWeight, marginBottom: 5
  },
  tenuretext: {
    alignSelf: 'flex-end', color: colors.coreBlue, fontSize: 10, fontWeight: customTheme.fonts.labelMedium.fontWeight, paddingRight: horizontalScale(58), marginTop: 4
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
    marginRight: 14,
    width: 350,
    marginBottom: 5,
    marginLeft: -5
  },

  ourSerices: {
    color: colors.black, fontSize: 18, lineHeight: 28, left: horizontalScale(28), bottom: 5
  },
  servicesCards: {
    width: 105.5, height: 104.5, backgroundColor: colors.white, borderRadius: 6, shadowColor: colors.black, marginBottom: verticalScale(10),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5, justifyContent: 'center', 
  },
  ourSericesCards:
    { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: horizontalScale(28), flexWrap: 'wrap', },
  serviceImage:
    { width: 39, height: 39, resizeMode: 'contain', alignSelf: 'center' },
  serviceText: { color: colors.coreBlue, fontSize: 12, fontWeight: customTheme.fonts.labelMedium.fontWeight, alignSelf: 'center', marginTop: verticalScale(9) },
  yourLoan: {

    color: colors.black, fontSize: 18, lineHeight: 28, bottom: verticalScale(5), marginLeft: verticalScale(18),
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

  PayNowButton: {
    justifyContent: 'center',
    alignSelf: 'center',
  
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor:colors.coreCream,
    borderRadius: 4,
  },

  seeDetailsresumeJourneyText: {
    fontSize: 10,
    color: colors.coreCream,
  },
  PayNowText: {
    fontSize: 10,
    color: colors.coreBlue,
  },

});

export default HomeScreen;