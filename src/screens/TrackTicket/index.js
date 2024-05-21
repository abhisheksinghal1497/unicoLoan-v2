import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import DimensionUtils from "../../utils/DimensionUtils";
import QueryCard from "./component/QueryCard";
import { Text, useTheme } from "react-native-paper";
import BasicTimeline from "./component/StepperStatus/Stepper";
import Rating from "../../components/Rating/Rating";
import CustomButton from "../../components/Button";
import { getQueryDetailsById } from "../../services/ApiUtils";
import { formatDateDayMonthYear } from "../../utils/dateUtil";

const TrackTicket = (props) => {
  const { colors } = useTheme();
  const queryId = 1;
  const [{data, isError, isLoading}] = getQueryDetailsById(queryId);
  console.log({data})
  const styles = stylesFn(colors);

  if(isLoading){
    return <></>
  }

  if(isError){
    return <></>
  }

  const TicketHeader = () => {
    return (
      <View>
        <Header
          title={"Track Tickets"}
          left={require("../../images/back.png")}
          right={require("../../assets/chat_icon.png")}
          onPressLeft={() => {
            props?.navigation?.goBack();
          }}
          onPressRight={() => {}}
          rightStyle={styles.chatIcon}
        />
      </View>
    );
  };

  const ComplaintTime = () => {
    return (
      <View style={styles.complainTimeContainer}>
        <Text style={styles.complainStatusTimeText}>
          Complaint Resolved{" "}
          <Text style={styles.complainStatusTimeTextDescription}>
            on {formatDateDayMonthYear(data.status[data.status.length -1].createdAt)}
          </Text>
        </Text>
      </View>
    );
  };

  const ServiceRating = () => {
    return (
      <View
        style={styles.ratingContainer}
      >
        <Text
          style={styles.ratingText}
        >
          Rate the Service
        </Text>
        <Rating rating={data.rating} />
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrolledContainer}
    >
      <View style={styles.container}>
        <TicketHeader />
        <QueryCard />
        <ComplaintTime />
        <BasicTimeline data={data.status} />
        <ServiceRating />
      </View>
      <View>
        <CustomButton type="primary" label="Reopen Complaint" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};

const stylesFn = (colors) => StyleSheet.create({
  complainTimeContainer:{ paddingVertical: DimensionUtils.pixelSizeVertical(25) },
  container: {flex:1},
  scrolledContainer: {
    flexGrow: 1,
    backgroundColor: colors.textInputBackground,
    paddingHorizontal: DimensionUtils.pixelSizeHorizontal(12),
    paddingBottom: DimensionUtils.pixelSizeVertical(10)
  },
  chatIcon: {
    width: DimensionUtils.pixelSizeHorizontal(30),
    height: DimensionUtils.pixelSizeHorizontal(30),
    resizeMode: "contain",
  },
  complainStatusTimeTextDescription: {
    fontSize: DimensionUtils.fontPixel(16),
  },
  complainStatusTimeText: {
    fontSize: DimensionUtils.fontPixel(17),
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: DimensionUtils.pixelSizeVertical(18),
  },
  ratingText: { color: "#888888", fontSize: DimensionUtils.fontPixel(18) }
});

export default TrackTicket;
