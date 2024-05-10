import { Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RNFetchBlob from "rn-fetch-blob";
import customTheme from "../colors/theme";
import Card from "./Card";

const DownladDoc = () => {
  const [isComplete, setIsComplete] = useState(false);
  const pdfUrl = "http://www.clickdimensions.com/links/TestPDFfile.pdf";
  //   const pdfUrl =
  // "https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf";
  //   const pdfUrl =
  //     "https://www.brainchecker.in/assets/front/images/psychometrictest.jpg";

  const downloadPDF = async () => {
    setTimeout(() => {
      setIsComplete(true);
    }, 1000);
    return;

    let dirs = RNFetchBlob.fs.dirs;
    console.log("Stated download");
    // console.log("dirs:", JSON.stringify(dirs, null, 2));
    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      //   path: dirs.DownloadDir + "/Letter.pdf",
      path: dirs.DownloadDir + "/In-Principle-Sanction-Letter.pdf",
      fileCache: true,
      appendExt: "pdf",
    })
      .fetch("GET", pdfUrl, {
        //some headers ..
      })
      .progress((received, total) => console.log(`${received}/${total}`))
      .then((res) => {
        setIsComplete(true);
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
  };

  return (
    <View>
      <Text>DownladDoc</Text>

      <Card>
        <Text>DownladDoc</Text>
      </Card>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text>Generation Date & time</Text>
          <View style={styles.row}>
            <Text>22/04/20202</Text>
            <Text> 15:50PM</Text>
          </View>
        </View>
        <View style={styles.docDetailsView}>
          <View style={styles.docDetails}>
            <Image
              source={require("../images/file.png")}
              style={styles.fileImage}
            />
            <View>
              <Text style={styles.fileName}>{dummyfileData.name}</Text>
              <Text style={styles.fileSize}>{dummyfileData.size}</Text>
            </View>
          </View>
          {isComplete ? (
            <Image
              source={require("../images/tick.png")}
              style={styles.checkImage}
            />
          ) : null}
        </View>
        <Button
          title="Download"
          onPress={async () => {
            await downloadPDF();
          }}
        />
      </View>
    </View>
  );
};

export default DownladDoc;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
  },
  docDetailsView: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  docDetails: {
    flexDirection: "row",
    // alignItems: "center",
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
});
