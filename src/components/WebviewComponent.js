import React from "react";
import { ScrollView } from "react-native";
import WebView from "react-native-webview";

const WebviewComponent = ({ uri }) => {
  console.log("URI", { uri });
  return (
    <WebView
      scalesPageToFit
      source={{ uri}}
      style={{ flex: 1 }}
    />
  );
};

export default WebviewComponent;
