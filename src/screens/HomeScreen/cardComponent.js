import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Dimensions, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../colors';
import { getHomeScreenCarousel } from '../../services/ApiUtils';
import { verticalScale } from '../../utils/matrcis';

const CardComponent = () => {
  const flatListRef = useRef(null);
  const getCarouselCardData = getHomeScreenCarousel()
  const [data, setData] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);



  const handlePaginationDotPress = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
  };

  const PaginationDot = ({ index }) => (
    <TouchableOpacity
      onPress={() => handlePaginationDotPress(index)}
      style={[
        styles.paginationDot,
        currentIndex === index && styles.activePaginationDot,
      ]}
    />
  );

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => (
        <PaginationDot key={index} index={index} />
      ))}
    </View>
  );


  useEffect(() => {
    getCarouselCardData?.mutate()
  }, [])

  useEffect(() => {
    if (getCarouselCardData.data) {
      // alert('Top Cards Success')
      setData(getCarouselCardData.data)
    }
  }, [getCarouselCardData.data])

  useEffect(() => {
    if (getCarouselCardData.error) {
      alert(getCarouselCardData.error)
    }
  }, [getCarouselCardData.error])

  const cardWidth = Dimensions.get('window').width - 150;
  const cardMarginHorizontal = 10;
  const padding = (Dimensions.get('window').width - cardWidth - 12 * cardMarginHorizontal) / 1.5;

  const renderItems = ({ item, index }) => {
    return (
      <View style={[styles.card2, { width: cardWidth, marginHorizontal: cardMarginHorizontal }]}>
        
        <Image
          style={styles.imageView}
          source={{ uri: item.uri } }
          resizeMode="contain"
        />
      </View>
    );
  };

  // if (data.length === 0) {
  //   return (
  //     <Image
  //         style={{width: 100, height: 100, alignSelf:'center', }}
  //         source={require('../../../assets/images/22.gif')}
  //         resizeMode="contain"
  //       />
  //   );
  // }

  return (

    <View style={styles.container}>
      { data && data?.length > 0 && <>
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
          onScroll={(event) => {
            const contentOffset = event.nativeEvent.contentOffset.x;
            const index = Math.round(contentOffset / (cardWidth + 4 * cardMarginHorizontal));
            setCurrentIndex(index);
          }}
        />
    {renderPaginationDots()}
      </>
}
    </View>

  );
};

const styles = StyleSheet.create({

  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,

  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activePaginationDot: {
    backgroundColor: colors.coreBlue,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: '100%', height: '100%', borderRadius: 35, elevation: 15, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  card2: {
    borderRadius: 35,
    marginTop: verticalScale(5),
    // width: Dimensions.get('window').width - 1000 , 
    height: verticalScale(140),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,


  },
});

export default CardComponent;
