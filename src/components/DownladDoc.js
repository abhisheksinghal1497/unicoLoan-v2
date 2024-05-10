import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import RNFetchBlob from "rn-fetch-blob";

const DownladDoc = () => {
  const pdfUrl = "http://www.clickdimensions.com/links/TestPDFfile.pdf";
  //   const pdfUrl =
  // "https://file-examples.com/wp-content/storage/2017/10/file-sample_150kB.pdf";
  //   const pdfUrl =
  //     "https://www.brainchecker.in/assets/front/images/psychometrictest.jpg";

  const downloadPDF = async () => {
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
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        console.log("The file saved to ", res.path());
      })
      .catch((errorMessage, statusCode) => {
        // error handling
        console.log("Error: ", errorMessage, statusCode);
      });
  };

  return (
    <View>
      <Text>DownladDoc</Text>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text>Generation Date & time</Text>
          <View style={styles.row}>
            <Text>22/04/20202</Text>
            <Text> 15:50PM</Text>
          </View>
        </View>
        <View style={styles.docDetails}></View>
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
  docDetails: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,

    height: 100,
    marginBottom: 10,
  },
});
