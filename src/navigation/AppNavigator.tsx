import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AuthContext} from "../provider/AuthProvider";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";

//Main
import Loading from "../screens/utils/Loading";
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import CreatePostScreen from "../screens/CreatePostScreen";

const AuthStack = createNativeStackNavigator();

const Auth = () => {
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen name="Login" component={Login}/>
            <AuthStack.Screen name="Register" component={Register}/>
            <AuthStack.Screen name="ForgetPassword" component={ForgetPassword}/>
        </AuthStack.Navigator>
    );
};

const MainStack = createNativeStackNavigator();

const Main = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerBackVisible: false
            }}
        >
            <MainStack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'Welcome'}}
            />
            <MainStack.Screen name="Profile" component={ProfileScreen}/>
            <MainStack.Screen name="Search" component={SearchScreen}/>
            <MainStack.Screen name="Add" component={CreatePostScreen}/>
        </MainStack.Navigator>
    );
};

export default () => {
    const auth = useContext(AuthContext);
    const user = auth.user;
    return (
        <NavigationContainer>
            {user == null && <Loading/>}
            {user == false && <Auth/>}
            {user == true && <Main/>}
        </NavigationContainer>
    );
};
