import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native";
import Image from 'react-native-fast-image'

const Rating = ({ rating = 0, numberOfStart = 5 }) => {
  const [stars, setStarts] = useState(rating);
  return (
    <View style={style.rowContainer}>
      {Array(numberOfStart)
        .fill(null)
        ?.map((e, i) => {
          const currentIndex = i+1
          return (
            <TouchableOpacity key={i.toString()} onPress={() => setStarts(currentIndex)}>
              <Image
                source={
                  stars >= currentIndex
                    ? require("../../assets/filled_star.png")
                    : require("../../assets/empty_star.png")
                }
                style={style.starImage}
              />
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const style = StyleSheet.create({
    starImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginRight: 3
      },
      rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
})

export default Rating;
