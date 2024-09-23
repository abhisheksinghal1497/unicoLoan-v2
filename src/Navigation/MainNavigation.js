import React, { useEffect, lazy } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { makeMetadataApiCall } from "../services/sfDataServices/salesforceApiService";
import { screens } from "../constants/screens";
import { routes } from "../constants/routes";
import { withSuspend } from "../components/WithSuspanse";

const Stack = createStackNavigator();

const createRoutes = (_routes) => {
  return _routes.map((route) => (
    <Stack.Screen
      key={route.name}
      name={route.name}
      component={withSuspend(lazy(route.component))}
      options={route.options || {}}
    />
  ));
};

const Dashboard = () => {
  const getData = makeMetadataApiCall();
  useEffect(() => {
    getData.mutate();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={screens.HomeScreen}
      >
        {createRoutes(routes)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Dashboard;
