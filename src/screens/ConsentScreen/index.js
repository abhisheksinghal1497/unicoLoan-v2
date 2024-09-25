import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import ActivityIndicatorComponent from "../../components/ActivityIndicator";
import {
  getConsentUrl,
  checkIfUserHasGivenConsent,
} from "../../services/ApiUtils";
import { horizontalScale, verticalScale } from "../../utils/matrcis";
import { assets } from "../../assets/assets";
import Header from "../../components/Header";
import { useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";
import CustomButton from "../../components/Button";
import { screens } from "../../constants/screens";
import { useResetRoutes } from "../../utils/functions";
import Toast from "react-native-toast-message";
import ErrorConstants from "../../constants/ErrorConstants";

const ConsentScreen = (props) => {
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
  const applicationId = loanData?.Applicant__c;
  const postConsentMutate = checkIfUserHasGivenConsent(applicationId);
  const [{ data, isError, isLoading }] = getConsentUrl(applicationId);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const resetRoute = useResetRoutes();
  console.log({ data });
  const toggleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
  };

  const handleRightIconPress = (index) => {
    if (index === 0) {
      props.navigation.navigate(screens.FAQ);
    } else if (index === 1) {
      toggleHelpModal();
    }
  };

  const onPressContinue = async () => {
    try {
      const response = await postConsentMutate.mutateAsync();
      const isConsentGiven =
        response?.records[0]?.Consent_Status__c === "Verified";
      if (isConsentGiven) {
        resetRoute(screens.PanDetails, {
          loanData: loanData,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Please give consent before proceeding.",
        });
      }
    } catch (error) {
      Toast.show({ type: "error", text1: ErrorConstants.SOMETHING_WENT_WRONG });
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        title="Consent"
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
          props?.navigation?.reset({
            index: 0,
            routes: [
              {
                name: screens.HomeScreen,
              },
            ],
          });
        }}
        showHelpModal={showHelpModal}
        toggleHelpModal={toggleHelpModal}
      />
      {(isLoading || postConsentMutate?.isPending) && <ActivityIndicatorComponent

      />}

      {isError || data?.error ? (
        <Text>Something went wrong</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <WebView
            source={{ uri: data?.message }}
            startInLoadingState={true}
            renderLoading={ActivityIndicatorComponent}
            style={{ flex: 1 }}
          />
        </View>
      )}
      <View
        style={{
          marginVertical: verticalScale(10),
          marginHorizontal: horizontalScale(15),
        }}
      >
        <CustomButton
          label="Continue"
          type="primary"
          onPress={onPressContinue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ConsentScreen;
