import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Platform,
  PermissionsAndroid,
  Alert,
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { useTheme } from "react-native-paper";
import { screens } from "../../constants/screens";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import HrProgress from "../../components/HrProgress";
import { assets } from "../../assets/assets";
import Card from "../../components/Card";
import customTheme from "../../colors/theme";
import Header from "../../components/Header";
import CustomShadow from "../../components/FormComponents/CustomShadow";
import CustomButton from "../../components/Button";
import { useRoute } from "@react-navigation/native";
import { Linking } from 'react-native'

const { width: devicWidth } = Dimensions.get("window");
import { getSanctionLetterQuery, getSanctionPdf } from "../../services/ApiUtils";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";

const Sanction = (props) => {
  const { colors, fonts } = useTheme();
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const applicationId = loanData?.Applicant__c;
  const [{data, isPending, isError}] = getSanctionLetterQuery(applicationId);

  console.log('DATA HERE', data);

  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const pdfUrl = "https://pdfobject.com/pdf/sample.pdf";

  const getData = getSanctionPdf(loanData);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  useEffect(() => {
    getData?.mutate();
  }, []);

  async function hasAndroidPermission() {
    if (Number(Platform.Version) >= 33) {
      return true;
    }
  
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  
    const hasPermission = await PermissionsAndroid.check(permission);
    console.log({hasPermission})
    if (hasPermission) {
      return true;
    }
  
    const status = await PermissionsAndroid.request(permission);
    console.log({status})
    return status === 'granted';
  }

  const downloadPDF = async () => {

    try {
      const granted = await hasAndroidPermission();
      console.log({granted})
      if (!granted) {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file', [{
          text: 'Give permission',
          onPress: () => Linking.openSettings()
        }]);
        return
      }
    } catch (err) {
      console.warn(err);
      return
    } 
    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      path: dirs.DownloadDir + "/In-Principle-Sanction-Letter.pdf",
      fileCache: true,
      // appendExt: "pdf",
      addAndroidDownloads: {
        useDownloadManager: true,
        mime: "application/pdf",
        notification: true,
        path: dirs.DownloadDir + "/Letter.pdf",
        //   description: "An image file.",
      },
    })
      .fetch("GET", pdfUrl, {})
      .progress((received, total) => {
        console.log(`${received / total}`);

        let progg = parseFloat(received / total).toFixed(2);
        setProgress(progg);
      })
      .then((res) => {
        setIsComplete(true);
        setTimeout(() => {
          setProgress(0);
        }, 200);
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        console.log("The file saved to ", res.path());

        if (Platform.OS == "android") {
          RNFetchBlob.android.actionViewIntent(res.path(), "application/pdf");
        }
      })
      .catch((errorMessage, statusCode) => {
        // error handling
        console.log("Error: ", errorMessage, statusCode);
      });
  };

  const dummyfileData = {
    name: "In-Principle Sanction Letter.pdf",
    size: "800KB",
    updatedDate: "22/04/20202",
    updatedTime: "15:50PM",
  };
  const handleRightIconPress = (index) => {
    if (index === 0) {
      props.navigation.navigate(screens.FAQ);
    } else if (index === 1) {
      toggleHelpModal();
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title="IN-Principle Sanction"
        left={require("../../images/back.png")}
        rightImages={[
          { source: assets.chat },
          { source: assets.questionRound },
        ]}
        leftStyle={{ height: verticalScale(15), width: verticalScale(15) }}
        leftImageProps={{ resizeMode: "contain" }}
        rightStyle={{
          height: verticalScale(23),
          width: verticalScale(23),
          marginHorizontal: 10,
        }}
        rightImageProps={{ resizeMode: "contain" }}
        titleStyle={{ fontSize: verticalScale(18) }}
        onPressRight={handleRightIconPress}
        onPressLeft={() => {
          props?.navigation.goBack();
        }}
        showHelpModal={showHelpModal}
        toggleHelpModal={toggleHelpModal}
      />

      <ActivityIndicatorComponent visible={getData?.isPending} />

      <Card cardStyle={styles.cardContainer}>
        <ImageBackground
          source={assets.Frame3}
          resizeMode="cover"
          style={styles.bgImage}
        >
          <View style={styles.cardInnView}>
            <Text style={styles.cardText1}>In Principle Sanction</Text>
            <Text style={styles.cardText2}>Document Generation</Text>
          </View>
        </ImageBackground>
      </Card>

      {/* Download DOC */}
      <CustomShadow
        containerStyle={{
          borderRadius: 10,
        }}
        shadowSyle={{
          borderRadius: 10,
        }}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={fonts.regularText}>Generation Date & time</Text>
            <View style={styles.row}>
              <Text style={fonts.regularText}>{dummyfileData.updatedDate}</Text>
              <Text style={[fonts.regularText, { marginLeft: 15 }]}>
                {dummyfileData.updatedTime}
              </Text>
            </View>
          </View>
          <View style={styles.docDetailsView}>
            <View style={styles.flex}>
              <View style={styles.docDetails}>
                <Image
                  source={require("../../images/file.png")}
                  style={styles.fileImage}
                />
                <View>
                  <Text style={styles.fileName}>{dummyfileData.name}</Text>
                  <Text style={styles.fileSize}>{dummyfileData.size}</Text>
                </View>
              </View>
              {isComplete ? (
                <Image
                  source={require("../../images/tick.png")}
                  style={styles.checkImage}
                />
              ) : null}
            </View>
            {progress > 0 ? (
              <View style={styles.progress}>
                <HrProgress
                  width={devicWidth - 120}
                  height={6}
                  fillColor={colors.success}
                  borderColor={colors.success}
                  progress={progress}
                />
                <Text>{progress * 100}%</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={async () => {
              await downloadPDF();
            }}
          >
            <Text style={styles.textStyle}>Download</Text>
          </TouchableOpacity>
        </View>
      </CustomShadow>

      <View style={{ marginVertical: 24 }} />

      <CustomButton
        type="primary"
        label="Continue"
        buttonContainer={styles.buttonContainer}
        // buttonContainer={{}}
        onPress={() => {
          props?.navigation?.navigate?.(screens.CongratulationScreen);
        }}
      />
    </View>
  );
};

export default Sanction;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  topCon: {
    marginHorizontal: 20,
  },
  bgImage: {
    borderRadius: 30,
    height: 200,
    padding: 20,
    justifyContent: "flex-end",
  },
  cardContainer: {
    padding: 0,
    paddingTop: 0,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
    margin: 15,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 0,
  },
  cardInnView: {
    // paddingHorizontal: 20,
    // paddingTop: 50,
    justifyContent: "flex-end",
  },
  cardText1: {
    ...customTheme.fonts.largeText,
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 32,
    textShadowColor: "#00000040",
    textShadowOffset: {
      height: 4,
      width: 0,
    },
    textShadowRadius: 7,
  },
  cardText2: {
    ...customTheme.fonts.regularText,
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  card: {
    borderWidth: 0.5,
    borderColor: "#C8C8C8",
    borderRadius: 10,
    padding: 10,
    // margin: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
  },
  flex: { flexDirection: "row", justifyContent: "space-between" },
  docDetailsView: {
    borderWidth: 1,
    borderColor: "#CACACA",
    borderRadius: 10,
    marginTop: 10,
    padding: 16,
    marginBottom: 10,
  },
  docDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fileImage: {
    width: 20,
    height: 20,
    margin: 5,
    marginRight: 15,
  },
  checkImage: {
    width: 20,
    height: 20,
    margin: 5,
  },
  fileName: {
    ...customTheme.fonts.mediumText,
    // fontSize: 14
  },
  fileSize: {
    ...customTheme.fonts.smallLightText,
  },
  progress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    marginTop: 15,
  },
  btnStyle: {
    borderWidth: 1,
    borderColor: "#2E52A1",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  textStyle: {
    ...customTheme.fonts.smallText,
    color: "#2E52A1",
  },
});
