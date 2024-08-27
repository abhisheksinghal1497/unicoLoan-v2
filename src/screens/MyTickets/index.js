import { Dimensions, Image, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '../../colors'
import { useTheme } from 'react-native-paper'
import Header from '../../components/Header'
import { screens } from '../../constants/screens'
import CustomButton from '../../components/Button'
import moment from 'moment'
import { getListOfTickets } from '../../services/ApiUtils'
import Container from '../../components/Container'

const WIDTH = Dimensions.get('window').width;
const screenName = "My Tickets"

const MyTickets = (props) => {
  const { fonts } = useTheme();
  const getTicketsData = getListOfTickets();
  const [data, setData] = useState([]);

  useEffect(() => {

    getTicketsData?.mutate()
  }, [])

  useEffect(() => {
    if (getTicketsData?.data) {

      setData(getTicketsData?.data)
    }
  }, [getTicketsData?.data])

  const Card = ({ item, index }) => {
    const [rating, setRating] = useState(item?.rating - 1 || 0);

    return (
      <View key={index.toString()} style={[styles.cardContainer, { marginTop: index !== 0 ? 10 : 0 }]}>

        <View style={styles.rowContainer}>
          <View style={[styles.circleContainer, {
            backgroundColor: item.status === 0 ? '#2012F9' : '#1EC239',
            shadowColor: item.status === 0 ? '#2012F9' : '#1EC239'
          }]} />
          <View style={styles.statusContainer}>
            <Text style={[fonts.bodyRegular, {
              color: item.status === 0 ? '#000000' : '#1EC239'
            }]}>{item.status === 0 ? 'In Progress' : 'Resolved'}</Text>
            {item.status === 1 &&
              <Text style={[fonts.regularLightText, { fontSize: 8 }]}>
                On {moment(item?.resolvedAt).format("ddd, Do MMM")}
              </Text>}
          </View>
          <View>
            <Text style={fonts.smallLightText}>Ticket no. #{item.ticket_no}</Text>
          </View>
        </View>
        <View style={styles.cardBodyContainer}>
          <Image source={{ uri: item.image_url }} style={styles.queryImage} />
          <View style={styles.statusContainer}>
            <Text style={[fonts.bodyRegular, { marginTop: -3 }]}>{item.title}</Text>
            <Text style={[fonts.regularLightText, { fontSize: 10, marginTop: 5 }]}>{item.description}</Text>
          </View>
        </View>
        {item.status === 1 && <View style={{ marginTop: 15, flexDirection: 'row' }}>
          <View style={styles.smallDotContainer} />
          <Text style={[fonts.regularLightText, { fontSize: 10, color: '#C8C8C8' }]}>Your complaint was successfully resolved by {item.resolvedBy} on
            {' '}{moment(item?.resolvedAt).format("Do MMM at hh:mm A").replace('pmt', 'at')}</Text>
        </View>}
        {item.status === 0 ? <View style={[styles.rowContainer, styles.buttonMainContainer]}>
          <CustomButton
            type="secondery"
            label="WITHDRAW"
            buttonContainer={styles.buttonContainer}
            labelStyle={[fonts.smallText, styles.buttonLabel]}
            onPress={() => { }} />
          <CustomButton
            type="secondery"
            label="TRACK"
            buttonContainer={styles.buttonContainer}
            labelStyle={[fonts.smallText, styles.buttonLabel]}
            onPress={() => { props?.navigation?.navigate(screens.TrackTicket) }} />
        </View> :
          <CustomButton
            type="secondery"
            label="REOPEN COMPLAINT"
            buttonContainer={[styles.buttonContainer, { width: '100%', marginTop: 10 }]}
            labelStyle={[fonts.smallText, styles.buttonLabel]}
            onPress={() => { }} />}
        {item.status === 1 && <>
          <View style={styles.divider} />
          <View style={[styles.rowContainer, styles.buttonMainContainer]}>
            <Text style={[fonts.bodyBold, { color: '#888888' }]}>Rate the Service</Text>
            <View style={styles.rowContainer}>
              {Array(5).fill(null)?.map((e, i) => {
                return (
                  <TouchableOpacity key={i.toString()} onPress={() => setRating(i)}>
                    <Image source={rating >= i ?
                      require('../../assets/filled_star.png') :
                      require('../../assets/empty_star.png')} style={styles.starImage} />
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </>}

      </View>
    )
  }

  const renderItem = ({ item, index }) => (
    <Card item={item} index={index} />
  );

  return (

    <Container>



      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Container>
  )
}

export default MyTickets

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  chatIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  cardContainer: {
    backgroundColor: '#FEF9EB',
    padding: 15,
    borderRadius: 10,
    marginBottom:10
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleContainer: {
    width: 10,
    height: 10,
    borderRadius: 20,
    marginRight: 20,
    elevation: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  smallDotContainer: {
    width: 6,
    height: 6,
    borderRadius: 20,
    backgroundColor: '#C8C8C8',
    marginRight: 10,
    marginTop: 5,
  },
  queryImage: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  statusContainer: {
    flexGrow: 1
  },
  cardBodyContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonMainContainer: {
    justifyContent: 'space-between',
    marginTop: 10
  },
  buttonContainer: {
    paddingVertical: 3,
    width: '46%',
    backgroundColor: '#FEF9EB',
    borderRadius: 10,
  },
  buttonLabel: {
    letterSpacing: 1,
    color: '#2E52A1'
  },
  divider: {
    width: '110%',
    height: 1,
    backgroundColor: '#D2D2D2',
    marginTop: 15,
    marginLeft: -15
  },
  starImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 3
  }
})