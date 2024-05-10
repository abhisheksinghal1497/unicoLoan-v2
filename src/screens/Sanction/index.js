import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { useTheme } from "react-native-paper";

import HrProgress from "../../components/HrProgress";
import { assets } from "../../assets/assets";
import Card from "../../components/Card";
import customTheme from "../../colors/theme";
import Header from "../../components/Header";
import CustomShadow from "../../components/FormComponents/CustomShadow";

const { width: devicWidth } = Dimensions.get("window");

const Sanction = (props) => {
  const { colors, fonts } = useTheme();
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const pdfUrl = "http://www.clickdimensions.com/links/TestPDFfile.pdf";

  const downloadPDF = async () => {
    // setTimeout(() => {
    //   setProgress(0.2);
    // }, 1000);
    // setTimeout(() => {
    //   let progg = parseFloat(0.39847810929723752).toFixed(2);
    //   setProgress(progg);
    // }, 1300);

    // setTimeout(() => {
    //   setProgress(0.5);
    // }, 2500);

    // setTimeout(() => {
    //   let progg = parseFloat(0.6899382107566177).toFixed(2);
    //   setProgress(progg);
    // }, 3500);
    // setTimeout(() => {
    //   setProgress(1);
    //   setIsComplete(true);
    //   setTimeout(() => {
    //     setProgress(0);
    //   }, 250);
    // }, 3800);
    // return;

    let dirs = RNFetchBlob.fs.dirs;
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      // path: dirs.DownloadDir + "/Letter.pdf",
      path: dirs.DownloadDir + "/In-Principle-Sanction-Letter.pdf",
      fileCache: true,
      appendExt: "pdf",
    })
      .fetch("GET", pdfUrl, {
        //some headers ..
      })
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

  return (
    <View style={styles.container}>
      <Header
        title="In-Principle Sanction"
        left={require("../../images/back.png")}
        onPressLeft={() => {
          props?.navigation.goBack();
        }}
        right={require("../../images/question.png")}
        onPressRight={() => {}}
      />

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
