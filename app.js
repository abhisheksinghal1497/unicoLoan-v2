/*
 * Copyright (c) 2017-present, salesforce.com, inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided
 * that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the
 * following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, StatusBar, Platform, NativeModules } from "react-native";
import {
    MD3LightTheme as DefaultTheme,
    PaperProvider,
    useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { oauth, net } from "react-native-force";
import customTheme from "./src/colors/theme";
import CustomButton from "./src/components/Button";
import { alert, toast } from "./src/utils/functions";
import { Provider as Reduxprovider } from "react-redux";
import store from "./src/store/redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./src/Navigation/MainNavigation";
import NoInternet from "./src/screens/NoInternet";
import Toast from 'react-native-toast-message';
import ErrorBoundary from 'react-native-error-boundary'
import { onlineManager } from "@tanstack/react-query/build/legacy";
// import Dashboard from './src/Navigation/Dashboard';
import HomeScreen from "./src/screens/HomeScreen";
import ApplicationDetails from "./src/screens/ApplicationDetails";
import ErrorScreen from "./src/screens/ErrorScreen";
const queryClient = new QueryClient();

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
        "Stepper Component",
    ]);
    const { colors } = useTheme();

    useEffect(() => {
        oauth.getAuthCredentials(
            () => fetchData(), // already logged in
            () => {
                oauth.authenticate(
                    () => fetchData(),
                    (error) => console.log("Failed to authenticate:" + error)
                );
            }
        );
    }, []);

    function fetchData() {
       // net.query("SELECT Id, Name FROM Contact LIMIT 100", (response) => { });
    }

    return (
        <View style={styles.container}>
            <CustomButton
                type="primary"
                label="Press Me"
                onPress={() => {
                    alert("Validation", "Invalid phone number entered.", () => { });
                }}
            />
            <CustomButton
                type="secondery"
                label="Press Me"
                onPress={() => {
                    toast("error", "Invalid phone number entered.");
                }}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Text style={[styles.item, { color: colors.primary }]}>{item}</Text>
                )}
                keyExtractor={(item, index) => "key_" + index}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: "white",
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        fontFamily: "Nunito-ExtraBoldItalic",
    },
});

export const App = function () {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 0, //no retry 
                networkMode: 'online', // always execute in online
            },
        },
    })
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
            try {
                onlineManager.setEventListener(setOnline => {
                    setOnline(state.isConnected)
                })

            } catch (error) {

            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <PaperProvider theme={customTheme}>
            <StatusBar
                barStyle="dark-content"
                hidden={false}
                backgroundColor="#FFFFFF"
            />
            <ErrorBoundary FallbackComponent={ErrorScreen}>
                <QueryClientProvider client={queryClient}>
                    <Reduxprovider store={store}>
                        {isConnected ? <Dashboard /> : <NoInternet />}
                        <Toast
                            position='bottom'
                            bottomOffset={20}
                        />
                    </Reduxprovider>
                </QueryClientProvider>
            </ErrorBoundary>
        </PaperProvider>
    );
}
