// IMPORTANT DO NOT REMOVE (BREAKS FIRESTORE)
import {decode, encode} from "base-64";
import React from "react";
import {LogBox} from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import {AuthProvider} from "./src/provider/AuthProvider";
import {DBProvider} from "./src/provider/DBProvider";

if (!global.btoa) {
    global.btoa = encode;
}
if (!global.atob) {
    global.atob = decode;
}

export default function App(props) {
    // Ignore firebase v9 AsyncStorage warning
    React.useEffect(() => {
        LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",]);
    }, []);

    return (<DBProvider>
        <AuthProvider>
            <AppNavigator/>
        </AuthProvider>
    </DBProvider>);
}
