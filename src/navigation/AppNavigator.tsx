import React, {useContext} from "react";
import {getApps, initializeApp} from "firebase/app";
import {initializeFirestore} from 'firebase/firestore';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContext} from "../provider/AuthProvider";

// Environmental variables
// @ts-ignore
import {API_KEY, APP_ID, AUTH_DOMAIN, DATABASE_URL, MESSAGING_SENDER_ID, PROJECT_ID, STORAGE_BUCKET} from "@env"

// Main
import Home from "../screens/Home";

// Auth screens
// import Login from "../screens/auth/Login";
// import Register from "../screens/auth/Register";
// import ForgetPassword from "../screens/auth/ForgetPassword";
//
// import Loading from "../screens/utils/Loading";
// import HomeScreen from "../screens/Home";
// import ProfileScreen from "../screens/ProfileScreen";

// Better put your these secret keys in .env file
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};
//
// if (getApps().length === 0) {
//     const app = initializeApp(firebaseConfig);
//     initializeFirestore(app, {experimentalForceLongPolling: true, merge: true})
// }
//
// const AuthStack = createNativeStackNavigator();
//
// const Auth = () => {
//     return (
//         <AuthStack.Navigator
//             screenOptions={{
//                 headerShown: false,
//             }}
//         >
//             <AuthStack.Screen name="Login" component={Login}/>
//             <AuthStack.Screen name="Register" component={Register}/>
//             <AuthStack.Screen name="ForgetPassword" component={ForgetPassword}/>
//         </AuthStack.Navigator>
//     );
// };
//
// const MainStack = createNativeStackNavigator();
//
// const Main = () => {
//     return (
//         <MainStack.Navigator
//             // screenOptions={{
//             //     headerShown: false,
//             // }}
//         >
//             <MainStack.Screen
//                 name="Home"
//                 component={HomeScreen}
//                 options={{title: 'Welcome'}}
//             />
//             <MainStack.Screen name="Profile" component={ProfileScreen}/>
//         </MainStack.Navigator>
//     );
// };
//
// export default () => {
//     const auth = useContext(AuthContext);
//     const user = auth.user;
//     return (
//         <NavigationContainer>
//             {user == null && <Loading/>}
//             {user == false && <Auth/>}
//             {user == true && <Main/>}
//         </NavigationContainer>
//     );
// };
