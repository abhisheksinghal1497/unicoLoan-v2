import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import { colors } from "../../colors";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { brandDetails } from "../../constants/stringConstants";
import { getHomeScreenDetails } from "../../services/ApiUtils";
import {
  component,
  FormControl,
} from "../../components/FormComponents/FormControl";
import { validations } from "../../constants/validations";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/Button";
import { useResetRoutes } from "../../utils/functions";
import PincodeModal from "../../components/PincodeModal";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";

const data = [
  {
    id: "1",
    title: "Applicant Details",
    imagePathActive: require("../../assets/MapPinLineGreen.png"),
    imagePathUnActive: require("../../assets/MapPinLineGrey.png"),
  },
  {
    id: "2",
    title: "PAN and KYC Verified",
    imagePathActive: require("../../assets/MapPinLineGreen.png"),
    imagePathUnActive: require("../../assets/MapPinLineGrey.png"),
  },
  {
    id: "3",
    title: "Loan Details",
    imagePathActive: require("../../assets/MapPinLineGreen.png"),
    imagePathUnActive: require("../../assets/MapPinLineGrey.png"),
  },
  {
    id: "4",
    title: "Eligibility",
    imagePathActive: require("../../assets/MapPinLineGreen.png"),
    imagePathUnActive: require("../../assets/MapPinLineGrey.png"),
  },
  {
    id: "5",
    title: "In-Principle Sanction",
    imagePathActive: require("../../assets/MapPinLineGreen.png"),
    imagePathUnActive: require("../../assets/MapPinLineGrey.png"),
  },
  {
    id: "6",
    title: "",
    imagePathUnActive: require("../../assets/loandone.png"),
    imagePathActive: require("../../assets/loandone.png"),
  },
];

const RenderLoanDropdown = ({ loanData = [], setSelectedLoan = () => { } }) => {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  const applicationNumber = watch("applicationNumber");

  useEffect(() => {
    const loan = loanData.find((el) => el.loanId === applicationNumber);
    if (loan) {
      console.log(">>>>",loan.Name)
      setSelectedLoan(loan);
    }

  }, [applicationNumber]);

  const data = [
    {
      id: "applicationNumber",
      label: "Loan Application Number",
      type: component.dropdown,
      placeHolder: "Loan Application Number",
      value: "",
      validations: validations.text,
      data: loanData.map((el) => ({
        id: el.loanId,
        label: el.applicationDetails?.Name,
        value: el.loanId,
      })),
    },
  ];

  return data.map((comp) => {
    return (
      <View style={{ marginBottom: verticalScale(10) }}>
        <FormControl
          compType={comp.type}
          control={control}
          validations={comp.validations}
          name={comp.id}
          label={comp.label}
          errors={errors[comp.id]}
          isRequired={comp.isRequired}
          placeholder={comp.placeHolder}
          data={comp.data}
          key={comp.id}

          setValue={setValue}
          showRightComp={true}
          isMultiline={comp.isMultiline}
          maxLength={comp.maxLength}
          isDisabled={comp.isDisabled}
        //   value={comp.value}
        />
      </View>
    );
  });
};

const RoadMap = ({
  isTablet,
  orientation,
  loanData = [],
  setSelectedLoan,
  selectedLoan,
  dashes,
}) => {

  const renderItems = ({ item, index }) => {
    const isLeft = index % 2 === 0;
    var isFinished = getFieldOsCompletedOrNot(index)
    var getCurrentScreen = false
    console.log("getCurrentScreenIndex>>>>>", getCurrentScreenIndex())
    if (index == getCurrentScreenIndex()) {
      getCurrentScreen = true
    }
    return (
      <View style={{ flexDirection: 'row', }}>
        <View style={{ width: "45%", justifyContent: 'flex-end', alignItems: 'flex-start' }} >
          {isLeft &&
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{ width: 25, height: 25, resizeMode: "contain" }}
                source={isFinished ? item.imagePathActive : item.imagePathUnActive}
              />
              <Text
                style={{

                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: "500",
                  color: colors.black,
                  marginLeft: 8

                }}
              >
                {item.title}
              </Text>
            </View>
          }
        </View>
        <View style={{ width: "5%", height: 70, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'space-around' }}>
          <View style={{ width: "30%", height: 13, backgroundColor: "white", }} />
          <View style={{ width: "30%", height: 13, backgroundColor: "white", marginVertical: 4 }} />
          {!getCurrentScreen &&
            <View style={{ width: "30%", height: 13, backgroundColor: "white", }} />
          }
          {getCurrentScreen &&
            <Image
              source={require("../../assets/homekey.png")}
              style={[styles.key]}
            />
          }


        </View>
        <View style={{ width: "45%", justifyContent: 'flex-end', alignItems: 'flex-start' }}>


          {!isLeft &&
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 8 }}>


              <Image
                style={{ width: 25, height: 25, resizeMode: "contain" }}
                source={isFinished ? item.imagePathActive : item.imagePathUnActive}
              />
              <Text
                style={{

                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: "500",
                  color: colors.black,
                  marginLeft: 8

                }}
              >
                {item.title}
              </Text>
            </View>
          }
        </View>
      </View>
    )
  }
  // const renderItem = ({ item, index }) => {
  //   const isLeft = index % 2 === 0;
  //   const itemStyle = isLeft ? styles.itemLeft : styles.itemRight;
  //   const itemContainerStyle = isLeft
  //     ? styles.itemContainerLeft
  //     : styles.itemContainerRight;

  //   const marginHorizontalPortrait =
  //     index === 0
  //       ? 36
  //       : index === 1
  //         ? 10
  //         : index === 2
  //           ? 60
  //           : index === 3
  //             ? 82
  //             : index === 4
  //               ? 15
  //               : 75;

  //   const marginHorizontalLandscape = isTablet
  //     ? index === 0
  //       ? 230
  //       : index === 1
  //         ? 205
  //         : index === 2
  //           ? 254
  //           : index === 3
  //             ? 272
  //             : index === 4
  //               ? 210
  //               : 267.5
  //     : marginHorizontalPortrait;

  //   const marginHorizontal =
  //     orientation === "portrait"
  //       ? marginHorizontalPortrait
  //       : marginHorizontalLandscape;

  //   return (
  //     <View
  //       style={[styles.itemContainer, itemContainerStyle, { marginHorizontal }]}
  //     >
  //       {index == 0 || index == 2 || index == 4 ? (
  //         <View style={[styles.item, itemStyle, { flexDirection: "row" }]}>
  // <Text
  //   style={{
  //     fontSize: 12,
  //     fontWeight: "500",
  //     color: colors.black,
  //     marginTop: verticalScale(18),
  //     right: horizontalScale(6),
  //   }}
  // >
  //   {item.title}
  // </Text>
  // <Image
  //   style={{ width: 25, height: 25, resizeMode: "contain" }}
  //   source={item.imagePathActive}
  // />
  //         </View>
  //       ) : (
  //         <View style={[styles.item, itemStyle, { flexDirection: "row" }]}>
  //           <Image
  //             style={{
  //               width: index == 5 ? 50 : 25,
  //               height: index == 5 ? 53 : 25,
  //               resizeMode: "contain",
  //               marginHorizontal: horizontalScale(index == 5 && 20),
  //             }}
  //             source={item.imagePathActive}
  //           />
  //           <Text
  //             style={{
  //               fontSize: 12,
  //               fontWeight: "500",
  //               color: colors.black,
  //               marginTop: verticalScale(18),
  //               left: horizontalScale(6),
  //             }}
  //           >
  //             {item.title}
  //           </Text>
  //         </View>
  //       )}
  //     </View>
  //   );
  // };

  const getFieldOsCompletedOrNot = (index) => {
    if (index === 0 && (!selectedLoan || !selectedLoan?.applicationDetails)) {
      return false;
    } else if (index === 1 && !selectedLoan.adhaarDetails) {
      return false;
    } else if (index === 2 && !selectedLoan.loanDetails) {
      return false;
    } else if (index === 3 && !selectedLoan.eligibilityDetails) {
      return false;
    } else if (index === 4 && !selectedLoan.sanctionDetails) {
      return false;
    } else if (index === 5 && !selectedLoan.isLoanActive) {
      return false;
    }

    else {
      return true;
    }
  }

  const getCurrentScreenIndex = () => {
    if ((!selectedLoan || !selectedLoan?.applicationDetails)) {
      return 0;
    } else if (!selectedLoan.adhaarDetails) {
      return 1;
    } else if (!selectedLoan.loanDetails) {
      return 2;
    } else if (!selectedLoan.eligibilityDetails) {
      return 3;
    } else if (!selectedLoan.sanctionDetails) {
      return 4;
    } else if (!selectedLoan.isLoanActive) {
      return 5;
    }

    else {
      return 6;
    }
  }

  const getKeyPosition = useMemo(() => {
    if (!selectedLoan || !selectedLoan?.applicationDetails) {
      return verticalScale(10);
    } else if (!selectedLoan.adhaarDetails) {
      return verticalScale(95);
    } else if (!selectedLoan.loanDetails) {
      return verticalScale(171);
    } else if (!selectedLoan.eligibilityDetails) {
      return verticalScale(245);
    } else {
      return verticalScale(400);
    }
  }, [selectedLoan]);


  return (
    <View >
      {(
        <RenderLoanDropdown
          loanData={loanData}
          setSelectedLoan={setSelectedLoan}

        />
      )}
      {/* <View style={styles.card}>
        <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
          <Text style={styles.uhfl}>{brandDetails.name}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Image
              style={styles.loanimage}
              source={require("../../assets/statuscheckk.png")}
            />
          </View>
          <View style={{ marginLeft: horizontalScale(8), flexWrap: "wrap" }}>
            <Text style={styles.loantext}>Home Loan</Text>
            <Text style={[styles.loantext, { maxWidth: "95%" }]}>
              LAN: {selectedLoan?.loanId}
            </Text>
          </View>
        </View>
      </View> */}
      {selectedLoan &&
        <Text style={styles.header}>Apply for loan</Text>}
      <View style={{ marginTop: verticalScale(0) }}>
        {/* <View style={[styles.line, { height: 500 }]}>
          <Image
            source={require("../../assets/homekey.png")}
            style={[styles.key, { marginTop: getKeyPosition }]}
          />
          <View style={styles.line2}>
            <View style={styles.dash1} />
            {dashes}
          </View>
        </View> */}
        {selectedLoan &&
          <FlatList
            style={{ marginVertical: 16 }}
            scrollEnable={true}
            data={data}
            renderItem={renderItems}
            keyExtractor={(item) => item.id}
          />
        }
      </View>
    </View>
  );
};

const ApplyForLoan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <PincodeModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
      <CustomButton
        type="primary"
        label="Apply for loan"
        buttonContainer={styles.buttonContainer}
        onPress={() => setModalVisible(true)}
      />
      <Text>You don't have any active loan. Start new loan journey.</Text>
    </View>
  );
};

const StatusCheck = ({ navigation }) => {
  const [orientation, setOrientation] = useState("portrait");
  const { width, height } = useWindowDimensions();
  const getLoanCardData = getHomeScreenDetails(true);
  const { data: loanData = [], isPending = false } = getLoanCardData;
  const [selectedLoan, setSelectedLoan] = useState();

  const numberOfDashes = 17;
  const dashes = [];

  for (let i = 0; i < numberOfDashes; i++) {
    dashes.push(<View key={i} style={styles.dash} />);
  }

  useEffect(() => {
    const isPortrait = height > width;
    setOrientation(isPortrait ? "portrait" : "landscape");
  }, [width, height]);

  useEffect(() => {
    getLoanCardData.mutate();
  }, []);

  // useEffect(() => {
  //   if (loanData.length === 1) {
  //     setSelectedLoan(loanData[0]);
  //   }
  // }, [loanData]);

  const isTablet = width >= 600;

  return (
    <ScrollView
      style={{ backgroundColor: colors.white }}
      contentContainerStyle={{ flex: 1, flexGrow: 1 }}
    >
      <View style={styles.container}>
        <View
          style={{


            flex: 1,
          }}
        >
          <ActivityIndicatorComponent visible={isPending} />
          <Header
            onPressLeft={() => navigation.goBack()}
            colour={colors.transparent}
            left={require("../../assets/Back.png")}
            leftStyle={{
              width: 27,
              height: 27,
              marginLeft: isTablet ? horizontalScale(10) : 0,
            }}
            title="Loan Status"
          />
          {loanData?.length ? (
            <RoadMap
              orientation={orientation}
              isTablet={isTablet}
              loanData={loanData}
              setSelectedLoan={setSelectedLoan}
              selectedLoan={selectedLoan}
              dashes={dashes}
            />
          ) :
            <>
              {!isPending &&
                <ApplyForLoan />}
            </>
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default StatusCheck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  uhfl: {
    fontWeight: "500",
    fontSize: 9,
    color: "#2E52A1",
    lineHeight: 9.75,
  },
  loanimage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    borderRadius: 5,
  },
  key: {
    width: 40,
    height: 42,
    resizeMode: "contain",
    alignSelf: "center",
    zIndex: 999,
  },
  loantext: {
    fontWeight: "500",
    fontSize: 15,

    color: "#2E52A1",
  },
  card: {
    width: "97.5%",
    height: 85,
    backgroundColor: colors.coreCream,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: horizontalScale(6),
    paddingVertical: verticalScale(10.5),
  },
  header: {
    fontSize: 12,
    fontWeight: "500",
    alignSelf: "center",
    marginTop: verticalScale(15),
    color: colors.black,
  },
  line: {
    position: "absolute",
    // height: 500,
    width: 20,
    backgroundColor: colors.black,
    marginHorizontal: "auto",
    alignSelf: "center",
    marginTop: verticalScale(12),
    borderRadius: 16,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  line2: {
    position: "absolute",
    height: 450,
    width: 3,
    backgroundColor: "transparent",
    marginHorizontal: "auto",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: verticalScale(20),
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: verticalScale(20),
    paddingHorizontal: horizontalScale(15),
  },
  dash: {
    width: "100%",
    height: 15,
    backgroundColor: "#FFFFFF",
    marginBottom: verticalScale(10),
  },
  dash1: {
    width: "100%",
    height: 10,
    backgroundColor: "#FFFFFF",
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    marginVertical: 5,
    padding: 10,
  },
  itemContainerLeft: {
    justifyContent: "flex-start",
    marginRight: 10,
  },
  itemContainerRight: {
    justifyContent: "flex-end",
    marginLeft: 10,
  },
  itemLeft: {
    alignSelf: "flex-start",
  },
  itemRight: {
    alignSelf: "flex-end",
  },
});
