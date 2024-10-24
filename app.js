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
import { oauth } from "react-native-force";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  Platform,
  NativeModules,
  LogBox,
} from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  useTheme,
} from "react-native-paper";

import NetInfo from "@react-native-community/netinfo";

import customTheme from "./src/colors/theme";

import { Provider as Reduxprovider } from "react-redux";
import store from "./src/store/redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./src/Navigation/MainNavigation";
import NoInternet from "./src/screens/NoInternet";
import Toast from "react-native-toast-message";
import ErrorBoundary from "react-native-error-boundary";
import { onlineManager } from "@tanstack/react-query/build/legacy";
// import Dashboard from './src/Navigation/Dashboard';

import ErrorScreen from "./src/screens/ErrorScreen";
import { getUserData } from "./src/services/sfDataServices/netService";
import Loader from "./src/components/Loader";

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
        networkMode: "online", // always execute in online
      },
    },
  });
  const [authLoader, setAuthLoader] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  const getUserLoggedData = async (data) => {
    try {
      await getUserData(data);
    } catch (error) {
    } finally {
      setAuthLoader(false);
    }
  };

  useEffect(() => {
    LogBox.ignoreAllLogs();

    try {
      oauth.getAuthCredentials(
        (data) => {
          getUserLoggedData(data?.userId);
        },
        () => {
          setAuthLoader(false);
        }
      );
    } catch (error) {
      setAuthLoader(false);
    }
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      try {
        onlineManager.setEventListener((setOnline) => {
          setOnline(state.isConnected);
        });
      } catch (error) {}
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (authLoader) {
    return <Loader />;
  }
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
            <Toast position="bottom" bottomOffset={20} />
          </Reduxprovider>
        </QueryClientProvider>
      </ErrorBoundary>
    </PaperProvider>
  );
};
