import React, { useRef } from 'react';
import { FlatList, Dimensions, View, StyleSheet, Text, Image } from 'react-native';
import { colors } from '../../colors';

const CardComponent = () => {
  const flatListRef = useRef(null);

  const data = [
    { uri: 'https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg' },
    { uri: 'https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg' },
    { uri: 'https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg' },
  ];
  const cardWidth = Dimensions.get('window').width - 100; 
  const cardMarginHorizontal = 12; 
  const padding = (Dimensions.get('window').width - cardWidth - 2 * cardMarginHorizontal) / 2;

  const renderItems = ({ item, index }) => {
    return (
        <View style={[styles.card2, { width: cardWidth, marginHorizontal: cardMarginHorizontal }]}>
        <Image
          style={styles.imageView}
          source={{ uri: item.uri }}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
   
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
        contentContainerStyle={[styles.flatListContainer, { paddingLeft: padding, paddingRight: padding }]}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToInterval={cardWidth + 4 * cardMarginHorizontal}
        decelerationRate="fast"
        snapToAlignment="center"
      />
  
  );
};

const styles = StyleSheet.create({
  
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView:{ width: '100%', height: '100%', borderRadius: 35,  },

  card2: {
    borderRadius: 35,
    marginBottom: 10,
    marginTop: 10,
    width: Dimensions.get('window').width - 100, 
    height: 200,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CardComponent;
