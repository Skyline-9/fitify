import React from "react";
import {View} from "react-native";
import {Colors, LoaderScreen} from "react-native-ui-lib";

export default function () {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <LoaderScreen colors={Colors.grey40}/>
        </View>
    );
}
