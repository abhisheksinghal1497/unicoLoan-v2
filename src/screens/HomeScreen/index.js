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
import { oauth } from "react-native-force";
import { brandDetails } from "../../constants/stringConstants";
import useGetProgressPercentage, {
  getCurrentScreenNameForResume,
} from "../../utils/useGetProgressPercentage";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import { useResetRoutes } from "../../utils/functions";
import { get } from "react-hook-form";
import LocalStorage from "../../services/LocalStorage";
const screenWidth = Dimensions.get("window").width;
const HomeScreen = ({ navigation }) => {
  const flatListRef = useRef(null);

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

  const ResumeLoanJourney = ({ item }) => {
   
    const progress = useGetProgressPercentage(item);
    const screenName = getCurrentScreenNameForResume(item);

    const textStyle = (size, color = colors.coreBlue) => ({
      color,
      fontSize: verticalScale(size),
    });

    const ResumeButton = () => {
      return (
        <View
          style={{
            backgroundColor: colors.coreBlue,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingVertical: verticalScale(8)
          }}
        >
          <TouchableOpacity
            style={styles.seeDetailsresumeJourneyButton}
            onPress={() => {
              navigation?.navigate(screenName, { loanData: item });
            }}
          >
            <Text style={styles.seeDetailsresumeJourneyText}>
              Resume Journey
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    const CardHeader = () => {
      return (
        <View style={{}}>
          <Text style={[textStyle(9),{alignSelf:'flex-end'}]}>{brandDetails.name}</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Text style={textStyle(15)}>{item?.applicationDetails?.Product__c}</Text>
            
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Text style={textStyle(14)}>LAN: {item?.loanId}</Text>
          </View>
        </View>
      );
    };

    const CardBody = () => {
      const ProgressBardSection = () => {
        return (
          <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <CircularProgress
                imageStyle={{ width: 40, height: 40 }}
                ImageData={require("../../assets/Home2.png")}
                size={110}
                strokeWidth={12}
                progressPercent={progress}
                bgColor={colors.progressBg}
                pgColor={colors.coreBlue}
              />
            </View>
            <View style={{ marginLeft: verticalScale(10), alignSelf: 'flex-end' }}>
              {/* <Text style={[textStyle(13), { marginBottom: verticalScale(5) }]}>Next Payment</Text> */}
              <Text style={[textStyle(15), { marginBottom: verticalScale(16) }]}>{screenName}</Text>
              {/* <Text style={textStyle(10, colors.greylight)}>
                29th April 2024
              </Text> */}
            </View>
          </View>
          </View>
        );
      };

      const LoanDetailsSection = () => {
        return (
          <View>
            <Text style={textStyle(12.5)}>Loan Amount</Text>
            <Text style={styles.loanAmountText}>₹ {item?.applicationDetails?.ReqLoanAmt__c}</Text>
            <View style={styles.blueLine} />
            {/* <Text style={textStyle(12.5)}>ROI</Text>
            <Text style={styles.loanAmountText}>9.25%</Text>
            <View style={styles.blueLine} />
            <Text style={textStyle(12.5)}>Tenure</Text>
            <Text style={styles.loanAmountText}>18/100</Text> */}
          </View>
        );
      };

      return (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ProgressBardSection />
          <LoanDetailsSection />
        </View>
      );
    };

    return (
      <View style={{}}>
        <View style={styles.cardBodyHeaderContainer}>
          <CardHeader />
          <View style={{ marginVertical: 16 }}>
            <CardBody />
          </View>
        </View>
        <ResumeButton />
      </View>
    );
  };

  const renderItems = ({ item, index }) => {
    return (
      <>
        {!item?.loanId ?

          <ApplyNewLoan />
          :
          <View style={[styles.card,]}>

            <ResumeLoanJourney item={item} />
          </View>
        }
      </>
    );
  };

  const ApplyNewLoan = () => {
    return (


      <View style={{
        width: screenWidth - 40,
        margin: 10
      }}>

        <ImageBackground
          resizeMode="stretch"
          style={styles.imgBackground}
          source={require("../../assets/loanapply.png")}
        >

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.applyforloan}>Apply For Loan</Text>
          </TouchableOpacity>


        </ImageBackground>


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
      {isLoading && <ActivityIndicatorComponent />}
      <PincodeModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />


      <ScrollView contentContainerStyle={{ flexGrow: 1, marginBottom: 50 }}>
        <View style={{ justifyContent: 'space-around', flex: 1 }}>

          <View style={{ backgroundColor: colors.coreCream, flex: 1 }}>
            <TouchableOpacity
              style={styles.profileImageView}
              onPress={() => navigation.navigate(screens.Profile)}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("../../assets/profileIcon.png")}
                  style={styles.profileIcon}
                />
                <Text style={styles.profileName}>{LocalStorage?.getUserData()?.FirstName} {LocalStorage?.getUserData()?.LastName}</Text>
              </View>

              <TouchableOpacity onPress={() => oauth.logout()}>
                <Text>Logout</Text>
              </TouchableOpacity>
            </TouchableOpacity>

          </View>

          <View style={{ flex: 1 }}>
            <CardComponent />
          </View>


          <View style={{ flex: 1 }}>
            <Text style={styles.yourLoan}>Your Loans</Text>



            <View style={styles.secondcards}>
              <FlatList

                ref={flatListRef}
                data={data?.length > 0 ? [...data, { loanId: null }] : [{ loanId: null }]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItems}
                horizontal
                showsHorizontalScrollIndicator={false}

                onScroll={handleScroll}
                scrollEventThrottle={16}
              />
            </View>
            <View style={styles.dotsContainer}>
              {[...data, {}].map((_, index) => (
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


          </View>
          <View style={{ flex: 1 }}>
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
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardBodyHeaderContainer: { paddingHorizontal: horizontalScale(16), paddingVertical: verticalScale(14) },
  blueLine: {
    height: verticalScale(1),
    backgroundColor: colors.coreBlue,
    width: "100%",
    marginBottom: verticalScale(5),
  },
  loanAmountText: {
    fontSize: verticalScale(16),
    color: colors.coreBlue,
    fontWeight: "bold",
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
  profileImageView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(10),
    marginTop: verticalScale(40),
    paddingHorizontal: horizontalScale(20),
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
  secondcards: {
    justifyContent: "center",
    alignItems: "center",

  },
  applyforloan: {
    alignSelf: 'center',
    color: colors.white,
    fontWeight: customTheme.fonts.labelLarge.fontWeight,
    letterSpacing: 1.5,
    fontSize: 18,
    backgroundColor: colors.bgDark,
    borderRadius: 10,
    padding: 10,

    marginBottom: verticalScale(20)
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 4,
    backgroundColor: "rgba(210, 177, 172, 1)",
  },
  imgBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    minHeight: 200,

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
    // marginRight: horizontalScale(14),
    width: screenWidth - 40,
    margin: 10

    // marginLeft: verticalScale(-5),
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

  seeDetailsresumeJourneyText: {
    fontSize: verticalScale(12),
    color: colors.coreCream,
  },
});

export default HomeScreen;
