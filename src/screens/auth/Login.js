import * as Device from "expo-device";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import React, {useContext, useState} from "react";
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {Button, Colors, Image, Incubator, Text, Typography, View} from "react-native-ui-lib";
import {DBContext} from "../../provider/DBProvider";

const {TextField} = Incubator;

export default function ({navigation}) {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const dbContext = useContext(DBContext);
    const db = dbContext.db;

    async function login() {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password).catch(function (
            error
        ) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
            setLoading(false);
            alert(errorMessage);
        });

        const response = await (await fetch("https://ipapi.co/json")).json();
        console.log(response);

        console.log(Platform.OS);
        const data = {
            os: Platform.OS,
            brand: Device.brand,
            deviceName: Device.deviceName,
            deviceYear: Device.deviceYearClass,
            deviceManufacturer: Device.manufacturer,
            deviceModelName: Device.modelName,
            timestamp: serverTimestamp(),
            ip_info: response
        };

        console.log(data);

        await (async () => {
            await addDoc(collection(db, "userAgents"), data);
        })();
    }

    return (
        <KeyboardAvoidingView behavior="height" enabled style={{flex: 1}}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
            >
                <View flex-1 center center-H bg-grey70>
                    <Image
                        resizeMode="contain"
                        style={{
                            height: 220,
                            width: 220,
                        }}
                        source={require("../../../assets/login.png")}
                    />
                </View>
                <View flex-3 paddingH-20 paddingB-20 bg-grey70>
                    <Text text60M center padding-30>Login</Text>
                    <Text>Email</Text>
                    <TextField
                        // containerStyle={{marginTop: 15}}
                        marginT-15
                        placeholder="Enter your email"
                        value={email}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        enableErrors
                        validationMessage={["Email is required", "Email is invalid"]}
                        validationMessageStyle={Typography.text90R}
                        validationMessagePosition={TextField.validationMessagePositions.BOTTOM}
                        validate={["required", "email"]}
                        validateOnChange
                        validateOnBlur
                        fieldStyle={styles.withUnderline}
                    />
                    <Text style={{marginTop: 15}}>Password</Text>
                    <TextField
                        // containerStyle={{marginTop: 15}}
                        marginT-15
                        placeholder="Enter your password"
                        value={password}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        validate="required"
                        validationMessage="Password is required"
                        fieldStyle={styles.withUnderline}
                    />
                    <Button marginT-20
                            label={loading ? "Loading" : "Continue"}
                            onPress={() => {
                                login();
                            }}
                            disabled={loading}
                            enableShadow={true}
                    />

                    <View row center centerH marginT-15>
                        <Text text80>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Register");
                            }}
                        >
                            <Text text80M blue30 marginL-5>Register here</Text>
                        </TouchableOpacity>
                    </View>
                    <View row center centerH marginT-10>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("ForgetPassword");
                            }}
                        >
                            <Text text80M red40>
                                Forget password
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    withUnderline: {
        borderBottomWidth: 1,
        borderColor: Colors.grey40,
        paddingBottom: 4
    },
    withFrame: {
        borderWidth: 1,
        borderColor: Colors.$outlineDisabledHeavy,
        padding: 4,
        borderRadius: 2
    }
});

