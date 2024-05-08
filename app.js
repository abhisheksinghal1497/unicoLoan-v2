import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
    useTheme,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { oauth, net } from 'react-native-force';
import customTheme from './src/colors/theme';
import CustomButton from './src/components/Button';
import { alert, toast } from './src/utils/functions';
import { Provider as Reduxprovider } from 'react-redux';
import store from './src/store/redux';

import Dashboard from './src/Navigation/MainNavigation';
import NoInternet from './src/screens/NoInternet';

// import Dashboard from './src/Navigation/Dashboard';
import HomeScreen from "./src/screens/HomeScreen";
import ApplicationDetails from './src/screens/ApplicationDetails';


const ContactListScreen = () => {
    const [data, setData] = useState([
        "Header",
        "Card",
        "Modal",
        "Errors",
        "Buttons",
        "Alert",
        "Toast",
        "Bottom Popover",
        "small card grid",
        "Progress bar",
        "Loading",
        "Stepper Component"
    ]);
    const { colors } = useTheme();

    useEffect(() => {
        oauth.getAuthCredentials(
            () => fetchData(), // already logged in
            () => {
                oauth.authenticate(
                    () => fetchData(),
                    (error) => console.log('Failed to authenticate:' + error)
                );
            });
    }, [])

    function fetchData() {
        net.query('SELECT Id, Name FROM Contact LIMIT 100',
            (response) => { }
        );
    }



    return (

        <View style={styles.container}>
            <CustomButton
                type="primary"
                label="Press Me"
                onPress={() => { alert('Validation', 'Invalid phone number entered.', () => { }) }} />
            <CustomButton
                type="secondery"
                label="Press Me"
                onPress={() => { toast('Invalid phone number entered.') }} />
            <FlatList
                data={data}
                renderItem={({ item }) => <Text style={[styles.item, { color: colors.primary }]}>{item}</Text>}
                keyExtractor={(item, index) => 'key_' + index}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        fontFamily: "Nunito-ExtraBoldItalic"
    }
});

export const App = function () {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <PaperProvider theme={customTheme}>
            <Reduxprovider store={store}>
                {isConnected ? <Dashboard /> : <NoInternet />}
                {/* <HomeScreen/> */}
                {/* <ApplicationDetails /> */}
            </Reduxprovider>
        </PaperProvider>
    );
}