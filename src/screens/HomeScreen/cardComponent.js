import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Dimensions, View, StyleSheet, Text, Image } from 'react-native';
import { colors } from '../../colors';
import { getHomeScreenCarousel } from '../../services/ApiUtils';

const CardComponent = () => {
  const flatListRef = useRef(null);
  const getCarouselCardData = getHomeScreenCarousel()
  const [data, setData] = useState([])

  // const data = [
  //   { uri: 'https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg' },
  //   { uri: 'https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg' },
  //   { uri: 'https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg' },
  // ];

  useEffect(()=>{
    getCarouselCardData?.mutate()
  },[])

  useEffect(()=>{
    if(getCarouselCardData.data){
      // alert('Top Cards Success')
      setData(getCarouselCardData.data)
    }
  },[getCarouselCardData.data])

  useEffect(()=>{
    if(getCarouselCardData.error){
      alert(getCarouselCardData.error)
    }
  },[getCarouselCardData.error])

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

  if (data.length === 0) {
    return (
      <View >
        <Text style={{fontSize:20,}}>No images available</Text>
      </View>
    );
  }
  
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
  noDataContainer: {
    flex: 1,
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
