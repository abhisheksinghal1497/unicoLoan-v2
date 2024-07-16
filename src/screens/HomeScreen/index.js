import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  FlatList,
  Dimensions,
  View,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import CardComponent from "./cardComponent";
import { colors } from "../../colors";
import customTheme from "../../colors/theme";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import CircularProgress from "../../components/CircularProgress";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screens } from "../../constants/screens";
import {
  getPinCodes,
  getHomeScreenDetails,
  getHomeScreenOurServices,
  logoutApi,
} from "../../services/ApiUtils";
import CustomModal from "../../components/CustomModal";
import Button from "../../components/Button";
import PincodeModal from "../../components/PincodeModal";
import {oauth} from 'react-native-force'

const HomeScreen = ({ navigation }) => {
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const getLoanCardData = getHomeScreenDetails(true);
  const getOurServicesCardData = getHomeScreenOurServices();
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDotIndex, setSelectedDotIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(false);

  useEffect(() => {
    getLoanCardData?.mutate();
    getOurServicesCardData?.mutate();
  }, []);

  useEffect(() => {
    if (getLoanCardData.data) {
      setIsLoading(false);
      setData(getLoanCardData.data);
    }
  }, [getLoanCardData.data]);

  useEffect(() => {
    if (getOurServicesCardData.data) {
      setIsLoading(false);
      setData2(getOurServicesCardData.data);
    }
  }, [getOurServicesCardData.data]);

  useEffect(() => {
    if (getLoanCardData.error) {
      Alert.alert(getLoanCardData.error);
    }
  }, [getLoanCardData.error]);

  useEffect(() => {
    if (getOurServicesCardData.error) {
      Alert.alert(getOurServicesCardData.error);
    }
  }, [getOurServicesCardData.error]);

  useEffect(() => {
    async function fetchData() {
      const savedData = await AsyncStorage.getItem("CurrentScreen");
      const currentData = JSON.parse(savedData);
      setCurrentScreen(currentData);
    }
    fetchData();
  }, []);

  const cardWidth = 350;

  const handleNavigation = (index) => {
    switch (index) {
      case 0:
        navigation.navigate(screens.EmiCalculator);
        break;
      case 1:
        const ProgressBarPercent = 0;
        setModalVisible(true);
        break;
      case 2:
        navigation.navigate(screens.StatusCheck);
        break;
      case 3:
        navigation.navigate(screens.RaiseTicket);
        break;
      case 4:
        navigation.navigate(screens.MyTickets);
        break;
      case 5:
        navigation.navigate(screens.FAQ);
        break;
      case 6:
        navigation.navigate(screens.Services);
        break;
      default:
        break;
    }
  };

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
    setSelectedDotIndex(index);
  };

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.round(contentOffset.x / screenWidth);
    setSelectedDotIndex(index);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const renderItems = ({ item, index }) => {
    return (
      <View style={[styles.card]}>
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
          <CircularProgress
            imageStyle={{ width: 40, height: 33 }}
            ImageData={require("../../../assets/images/Home2.png")}
            size={90}
            strokeWidth={12}
            progressPercent={item.ProgressBarPercent}
            bgColor={colors.progressBg}
            pgColor={colors.coreBlue}
          />
          <View style={{ marginLeft: horizontalScale(11.5) }}>
            {item.nextPayment && item.paymentDate && item.NextPaymentText && (
              <>
                <Text style={styles.naxtPaymentKyc}>
                  {item.NextPaymentText}
                </Text>
                <Text style={styles.naxtPaymentKyc2}>{item.nextPayment}</Text>
                <Text style={styles.paymentDate}>{item.paymentDate}</Text>
              </>
            )}
            {item.kyc_Pan && (
              <Text style={styles.naxtPaymentKyc}>{item.kyc_Pan}</Text>
            )}
          </View>
        </View>
        <View
          style={[
            styles.cardBottomBar,
            { marginTop: !item.tenure ? verticalScale(40) : verticalScale(2) },
          ]}
        >
          {item.nextPayment && item.paymentDate && item.NextPaymentText ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: horizontalScale(105),
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(screens.ApplicantDetails, {
                    ProgressBarPercent: item.ProgressBarPercent,
                  })
                }
                style={styles.seeDetailsresumeJourneyButton}
              >
                <Text style={styles.seeDetailsresumeJourneyText}>
                  See Details
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate(screens.PayNow)}
                style={styles.PayNowButton}
              >
                <Text style={styles.PayNowText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.seeDetailsresumeJourneyButton}
              onPress={() => {
                navigation?.navigation?.navigate(currentScreen);
              }}
            >
              <Text style={styles.seeDetailsresumeJourneyText}>
                Resume Journey
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };



  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.coreCream}
      />
      <ScrollView>
        {isLoading ? (
          <View style={styles.ActivityStyle}>
            <ActivityIndicator size="large" color={colors.coreBlue} />
          </View>
        ) : (
          <>
            <View style={{ backgroundColor: colors.coreCream }}>
              <TouchableOpacity
                style={styles.profileImageView}
                onPress={() => navigation.navigate(screens.Profile)}
              >
                <View style={{flexDirection:'row'}}>
                <Image
                  source={require("../../../assets/images/profileIcon.png")}
                  style={styles.profileIcon}
                />
                <Text style={styles.profileName}>Bhavesh Rao</Text>
                </View>

                <TouchableOpacity onPress={() => oauth.logout()}>
                  <Text>Logout</Text>
                </TouchableOpacity>

              </TouchableOpacity>
              <View style={{ marginBottom: verticalScale(-60) }}>
                <CardComponent />
              </View>
            </View>

            <PincodeModal
              setModalVisible={setModalVisible}
              modalVisible={modalVisible}
            />

            <View style={{ marginTop: verticalScale(78) }}>
              <Text style={styles.yourLoan}>Your Loans</Text>
              {data.length === 0 ? (
                <View style = {{marginHorizontal:16}}>
                <TouchableOpacity onPress={openModal}>
                  <ImageBackground
                    style={styles.imgBackground}
                    source={require("../../../assets/images/loanapply.png")}
                  >
                    <Text style={styles.applyforloan}>Apply For Loan</Text>
                  </ImageBackground>
                </TouchableOpacity>
                </View>
              ) : (
                <>
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
                      onScroll={handleScroll}
                      scrollEventThrottle={16}
                    />
                  </View>
                  <View style={styles.dotsContainer}>
                    {data.map((_, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.dot,
                          selectedDotIndex === index && styles.selectedDot,
                        ]}
                        onPress={() => scrollToIndex(index)}
                      />
                    ))}
                  </View>
                </>
              )}
            </View>
            <View style={{ marginTop: verticalScale(20) }}>
              <Text style={styles.yourLoan}>Our Services</Text>
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
    padding: verticalScale(10),
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
    marginBottom: verticalScale(10),
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: verticalScale(15),
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.grey,
    marginHorizontal: horizontalScale(5),
  },
  selectedDot: {
    backgroundColor: colors.coreBlue,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  ActivityStyle: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: verticalScale(325),
  },

  loanView: {
    marginTop: verticalScale(13),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: horizontalScale(21),
    paddingRight: horizontalScale(14),
    alignItems: "center",
  },
  loanTitle: {
    color: colors.coreBlue,
    fontSize: 14,
    fontWeight: customTheme.fonts.labelMedium.fontWeight,
  },
  uhfl: {
    color: colors.coreBlue,
    fontSize: 8,
    fontWeight: customTheme.fonts.labelMedium.fontWeight,
  },
  profileImageView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between',
    left: horizontalScale(25),
    marginBottom: verticalScale(10),
    marginTop: verticalScale(40),
  },
  lanloanview: {
    marginTop: verticalScale(6),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: horizontalScale(15),
    paddingRight: horizontalScale(14),
    alignItems: "center",
  },
  lan: {
    color: colors.coreBlue,
    fontSize: 14,
    fontWeight: customTheme.fonts.labelMedium.fontWeight,
  },
  loanAmountText: {
    color: colors.coreBlue,
    fontSize: 10,
    fontWeight: customTheme.fonts.labelMedium.fontWeight,
    paddingRight: horizontalScale(12),
  },
  loanAmount: {
    alignSelf: "flex-end",
    marginRight: horizontalScale(14),
    color: colors.coreBlue,
    fontSize: 14,
    fontWeight: customTheme.fonts.labelLarge.fontWeight,
    marginBottom: verticalScale(5),
  },
  bottomLine: {
    borderBottomWidth: 1,
    borderColor: colors.coreBlue,
    width: "20%",
    alignSelf: "flex-end",
    marginRight: horizontalScale(18),
  },
  roiText: {
    alignSelf: "flex-end",
    color: colors.coreBlue,
    fontSize: 10,
    fontWeight: customTheme.fonts.labelMedium.fontWeight,
    paddingRight: horizontalScale(73.5),
    marginTop: verticalScale(4),
  },
  roi: {
    alignSelf: "flex-end",
    marginRight: horizontalScale(50),
    color: colors.coreBlue,
    fontSize: 14,
    fontWeight: customTheme.fonts.labelLarge.fontWeight,
    marginBottom: verticalScale(5),
  },
  tenure: {
    alignSelf: "flex-end",
    marginRight: horizontalScale(44),
    color: colors.coreBlue,
    fontSize: 14,
    fontWeight: customTheme.fonts.labelLarge.fontWeight,
    marginBottom: verticalScale(5),
  },
  tenuretext: {
    alignSelf: "flex-end",
    color: colors.coreBlue,
    fontSize: 10,
    fontWeight: customTheme.fonts.labelMedium.fontWeight,
    paddingRight: horizontalScale(58),
    marginTop: verticalScale(4),
  },
  belowCardView: {
    position: "absolute",
    top: 75,
    left: 20.5,
    flexDirection: "row",
    alignItems: "center",
  },
  cardBottomBar: {
    height: 35,
    backgroundColor: colors.coreBlue,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
  },
  paymentDate: {
    color: colors.greylight,
    fontWeight: customTheme.fonts.labelMedium.fontWeight,
    fontSize: 10,
  },
  naxtPaymentKyc: {
    color: colors.coreBlue,
    fontSize: 14,
    fontWeight: customTheme.fonts.labelLarge.fontWeight,
    marginBottom: 2,
  },
  naxtPaymentKyc2: {
    color: colors.coreBlue,
    fontSize: 14,
    fontWeight: customTheme.fonts.labelMedium.fontWeight,
    marginBottom: 2,
  },
  loanapplyview: {
    width: "80%",
    height: 168,
    borderRadius: 30,
    alignSelf: "center",
  },
  secondcards: {
    justifyContent: "center",
    alignItems: "center",
  },
  applyforloan: {
    alignSelf: "center",
    top: 50,
    color: colors.white,
    fontWeight: customTheme.fonts.labelLarge.fontWeight,
    letterSpacing: 1.5,
    fontSize: 18,
    backgroundColor: colors.bgDark,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(15),
    borderRadius:10
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 4,
    backgroundColor: "rgba(210, 177, 172, 1)",
  },
  imgBackground: {
    resizeMode: "cover",
    justifyContent: "center",
    height: verticalScale(180)
  },
  ProgressCardImage: {
    width: 87,
    height: 87,
  },
  profileName: {
    marginTop: 4,
    textAlign: "center",
    ...customTheme.fonts.titleMedium,
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
    marginRight: horizontalScale(14),
    width: 350,
    marginBottom: verticalScale(5),
    marginLeft: verticalScale(-5),
  },

  ourSerices: {
    color: colors.black,
    fontSize: 18,
    lineHeight: 28,
    left: horizontalScale(28),
    bottom: 5,
  },
  servicesCards: {
    width: 105.5,
    height: 104.5,
    backgroundColor: colors.white,
    borderRadius: 6,
    shadowColor: colors.black,
    marginBottom: verticalScale(10),
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
  },
  ourSericesCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(28),
    flexWrap: "wrap",
  },
  serviceImage: {
    width: 39,
    height: 39,
    resizeMode: "contain",
    alignSelf: "center",
  },
  serviceText: {
    alignSelf: "center",
    marginTop: verticalScale(9),
    ...customTheme.fonts.TextMon,
  },
  yourLoan: {
    color: colors.black,
    lineHeight: 28,
    bottom: verticalScale(5),
    marginBottom: verticalScale(5),
    marginLeft: verticalScale(18),
    ...customTheme.fonts.subHeader,
  },
  seeDetailsresumeJourneyButton: {
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderColor: colors.coreCream,
    borderRadius: 4,
  },

  PayNowButton: {
    justifyContent: "center",
    alignSelf: "center",

    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.coreCream,
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
  modal: {
    width: "95%",
    height: "55%",
    alignSelf: "center",
  },

  close: {
    size: verticalScale(2),
    color: "#828282",
  },
});

export default HomeScreen;
