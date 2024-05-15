import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { horizontalScale, verticalScale } from '../../utils/matrcis'
import { colors } from '../../colors'
import customTheme from '../../colors/theme'
import { Image } from 'react-native'
import Button from '../../components/Button'
import { getRaiseTicketsListScreen, getRaiseTicketsScreenCategory } from '../../services/ApiUtils'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const RaiseTicket = ({ navigation }) => {
    const getCateogoryData = getRaiseTicketsScreenCategory()
    const getTicketListData = getRaiseTicketsListScreen()
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])
    console.log('selectedIndex---', selectedIndex)
    useEffect(() => {
        getCateogoryData?.mutate()
        getTicketListData?.mutate()
    }, [])

    useEffect(() => {
        if (getCateogoryData.data) {
            setIsLoading(false)
            setData(getCateogoryData.data)
        }
    }, [getCateogoryData.data])

    useEffect(() => {
        if (getTicketListData.data) {
            setIsLoading(false)
            setData2(getTicketListData.data)
        }
    }, [getTicketListData.data])

    useEffect(() => {
        if (getCateogoryData.error) {
            alert(getCateogoryData.error)
        }
    }, [getCateogoryData.error])

    useEffect(() => {
        if (getTicketListData.error) {
            alert(getTicketListData.error)
        }
    }, [getTicketListData.error])

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={item.key}
            style={[styles.servicesCards, { backgroundColor: index == 0 ? "#EFF8FA" : index == 1 ? "#FFEFE0" : "#F2F5FF" }]}
            onPress={() => { setSelectedCategory(index), setSelectedIndex(null) }}
        >
            <Image style={[styles.serviceImage, { tintColor: index == 0 ? colors.SeaGreen : index == 1 ? "#F2A31C" : "#4165B8" }]} source={item.image} />
            <Text style={[styles.serviceText, { color: index == 0 ? colors.SeaGreen : index == 1 ? "#F2A31C" : "#4165B8", }]}>{item.title}</Text>
        </TouchableOpacity>
    );



    return (
        <View style={{ flex: 1 }}>
            {
                isLoading ? (<View style={styles.ActivityStyle}>
                    <ActivityIndicator size="large" color={colors.coreBlue} />
                </View>) :
                    <><ScrollView>
                        <View style={{ marginHorizontal: horizontalScale(10) }}>
                            <Header
                                titleStyle={{ marginRight: horizontalScale(10) }}
                                onPressLeft={() => navigation.goBack()}
                                colour={colors.transparent}
                                rightStyle={{ width: 32, height: 32 }}
                                right={require('../../../assets/images/ChatsCircle.png')}
                                left={require('../../../assets/images/Back.png')}
                                leftStyle={{ width: 30, height: 30 }} title="Raise Tickets"
                                onPressRight={() => alert("Faq")} />
                        </View>
                        <View>
                            <Text style={styles.choose}>
                                Choose the category under which your compaint falls
                            </Text>
                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.key}
                                contentContainerStyle={styles.ourSericesCards} />

                            {selectedCategory !== null && (
                                <View style={styles.selectedItem}>
                                    <FlatList
                                        data={data2[selectedCategory].options}
                                        renderItem={({ item, index }) => (
                                            <TouchableOpacity onPress={() => { setSelectedIndex(index) }} style={[styles.optionItem, { flexDirection: 'row' }]}>
                                                <Image
                                                    style={styles.radio}
                                                    source={index === selectedIndex
                                                        ? require('../../../assets/images/filledRadio.png')
                                                        : require('../../../assets/images/unfilledRadio.png')} />
                                                <Text style={styles.item}>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item, index) => index.toString()} />
                                </View>
                            )}
                        </View>
                        <View style={styles.buttonview}>
                            <Button
                                onPress={() => {
                                    if (selectedIndex !== null) {
                                        const selectedCategoryTitle = data[selectedCategory].title;
                                        const selectedItem = data2[selectedCategory].options[selectedIndex];
                                        navigation.navigate('RaiseTicketInput', { selectedCategoryTitle, selectedItem });
                                    }
                                }}
                                type="primary"
                                label="Next"
                                disable={selectedIndex == null ? true : false}
                                style={{ marginBottom: verticalScale(5), }}
                            />
                        </View>
                    </ScrollView>
                    </>
            }
        </View>
    )
}

export default RaiseTicket

const styles = StyleSheet.create({
    servicesCards: {
        width: 106.5,
        height: 106.5,
        borderRadius: 12,
        shadowColor: colors.black,
        marginBottom: 5,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        marginTop: verticalScale(25)
    },
    buttonview: {
        marginHorizontal: horizontalScale(20),
        marginTop: verticalScale(240)
    },
    radio: { width: 20, height: 20, resizeMode: 'contain' },
    item: { marginLeft: horizontalScale(16), fontSize: 16, fontWeight: '500', color: colors.Brown },
    choose: { marginLeft: horizontalScale(22), fontWeight: '500', fontSize: 16, maxWidth: '80%', color: '#342222', lineHeight: 28 },
    selectedItem: {
        marginHorizontal: horizontalScale(20),
        marginTop: verticalScale(20),
        marginBottom: verticalScale(20)
    },
    ActivityStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ourSericesCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: horizontalScale(12),

    },
    serviceImage: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: verticalScale(4)
    },
    serviceText: {

        fontSize: 16,
        fontWeight:'500',
        alignSelf: 'center',
        marginTop: verticalScale(4),
    },
    optionItem: {
        paddingVertical: 10,
        alignItems: 'center'
    },
});