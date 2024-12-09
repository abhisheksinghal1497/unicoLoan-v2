import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
import customTheme from "../../colors/theme";
import { getFAQDetails } from "../../services/ApiUtils";
import Header from "../../components/Header";
import { HeaderTexts } from "../../constants/stringConstants";

const FAQ = (props) => {
  const { navigation } = props;
  const [FAQData, setFAQData] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getFAQData = getFAQDetails();
  useEffect(() => {
    getFAQData?.mutate();
  }, []);

  useEffect(() => {
    if (getFAQData.data) {
      setFAQData(getFAQData.data);
      setIsLoading(false);
    }
  }, [getFAQData.data]);

  useEffect(() => {
    if (getFAQData.error) {
      Alert.alert("Error", getFAQData.error, [
        {
          text: "Ok",
          onPress: () => {
            navigation?.goBack();
          },
        },
      ]);
    }
  }, [getFAQData.error]);

  return (
    <View style={styles.container}>
      {/* <Header
        title={HeaderTexts.FAQ}
        titleStyle={styles.headerTitle}
        left={require("../../assets/Back.png")}
        leftImageProps={styles.backImg}
        onPressLeft={() => {
          navigation?.goBack();
        }}
        onPressRight={() => {}}
        colour="white"
      /> */}

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <List.AccordionGroup
          onAccordionPress={(data) => {
            if (data !== activeFaq) {
              setActiveFaq(data);
            } else {
              setActiveFaq(null);
            }
          }}
          expandedId={activeFaq}
        >
          {FAQData.map((faq) => {
            return (
              <View
                key={faq.id}
                style={[
                  styles.accordCard,
                  {
                    backgroundColor:
                      activeFaq === faq.id ? "#F2F2F2" : "#FEF9EB",
                  },
                ]}
              >
                <List.Accordion
                  title={faq.title}
                  id={faq.id}
                  titleNumberOfLines={3}
                  titleStyle={styles.accordTitle}
                  style={
                    activeFaq === faq.id
                      ? {
                          paddingBottom: 0,
                          backgroundColor: "#F2F2F2",
                        }
                      : { backgroundColor: "#FEF9EB" }
                  }
                >
                  <View style={styles.accordDetailsView}>
                    <Text style={styles.accordText}>{faq.value}</Text>
                  </View>
                </List.Accordion>
              </View>
            );
          })}
        </List.AccordionGroup>
      )}
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
  },
  backImg: {
    height: 30,
    borderWidth: 1,
    marginRight: 8,
  },
  headerTitle: {
    ...customTheme.fonts.titleMedium,
    fontWeight: "700",
  },
  accordTitle: {
    ...customTheme.fonts.accordianText,
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    paddingRight: 5,
    lineHeight: 20,
  },
  accordText: {
    ...customTheme.fonts.accordianText,
    fontSize: 13,
    fontWeight: "500",
  },
  accordCard: {
    margin: 5,
    borderRadius: 16,
    overflow: "hidden",
    // borderWidth: 1,
  },
  accordDetailsView: {
    padding: 15,
    paddingTop: 0,
  },
  loader: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
