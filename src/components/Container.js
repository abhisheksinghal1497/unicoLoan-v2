import React from "react";
import { View, StatusBar, SafeAreaView } from "react-native";
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { colors } from "../colors";

const Container = props => {

    const insets = useSafeAreaInsets();
    return (

        <View style={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            backgroundColor: props.color ? props.color : colors.WHITE_COLOR,


        }}>
            <StatusBar backgroundColor={colors.WHITE_COLOR} barStyle='dark-content' />
            {props.children}
        </View>


    )
}


export default Container;
