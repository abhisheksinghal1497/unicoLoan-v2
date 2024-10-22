import {
  ScrollView,

  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import { horizontalScale, verticalScale } from "../../utils/matrcis";

import Header from "../../components/Header";
import { assets } from "../../assets/assets";
import { Text } from "react-native-paper";


import DimensionUtils from "../../utils/DimensionUtils";

import { useRoute } from "@react-navigation/native";

import Container from "../../components/Container";

import Card from "../../components/Card";
import { colors } from "../../colors";

export default function ApplicationDetails(props) {
  const route = useRoute();
  const { loanData = {} } = route?.params || {};
 
  console.log(">>>>", loanData?.applicationDetails?.Name)

  //item?.applicationDetails?.Name



  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: "#fff" }}>

        <View
          style={{
            paddingHorizontal: horizontalScale(15),
            marginTop: verticalScale(10),
          }}
        >
          <Header
            title="Loan Details"
            left={assets.back}

            leftStyle={{ height: verticalScale(15), width: verticalScale(15) }}
            leftImageProps={{ resizeMode: "contain" }}
            rightStyle={{
              height: verticalScale(23),
              width: verticalScale(23),
              marginHorizontal: 10,
            }}
            rightImageProps={{ resizeMode: "contain" }}
            titleStyle={{ fontSize: verticalScale(18) }}

            onPressLeft={() => {
              props?.navigation?.goBack();
            }}

          />
        </View>
        <ScrollView >
          {/* <View style={style.container}>
            <ApplicationCard navigation={props?.navigation} />
          </View> */}

          <View
            style={{ margin: DimensionUtils.pixelSizeHorizontal(16),  }}
          >

            <Text variant="labelLarge" style={{ color: colors.black, fontSize: 16, textAlign:'center' }}>This loan is assigned to the Unico System.</Text>

            <View style ={{marginVertical:16}}>
            <Card>
              <View style ={{padding:8}}>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text variant="labelLarge" style={{ color: colors.black, fontSize: 16, textAlign: 'center' }}>Product</Text>
                    <Text variant="labelLarge" style={{ color: colors.black, fontSize: 14, textAlign: 'center' }}>{loanData?.applicationDetails?.Product__c}</Text>

                </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text variant="labelLarge" style={{ color: colors.black, fontSize: 16, textAlign: 'center' }}>Loan No.</Text>
                    <Text variant="labelLarge" style={{ color: colors.black, fontSize: 14, textAlign: 'center' }}>{loanData?.applicationDetails?.Name}</Text>

                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text variant="labelLarge" style={{ color: colors.black, fontSize: 16, textAlign: 'center' }}>Loan Amount</Text>
                    <Text variant="labelLarge" style={{ color: colors.black, fontSize: 14, textAlign: 'center' }}>{loanData?.applicationDetails?.ReqLoanAmt__c}</Text>

                  </View>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text variant="labelLarge" style={{ color: colors.black, fontSize: 16, textAlign: 'center' }}>Loan Tenure</Text>
                    <Text variant="labelLarge" style={{ color: colors.black, fontSize: 14, textAlign: 'center' }}>{loanData?.applicationDetails?.ReqTenInMonths__c}</Text>

                  </View>


              </View>

            </Card>
            </View>


          </View>


        </ScrollView>
      </View>
    </Container>
  );
}
