import React, {useState} from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {Button, Colors, Image, Text, Incubator, Typography, View} from "react-native-ui-lib";

const {TextField} = Incubator;

export default function ({navigation}) {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function register() {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password).catch(function (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
            setLoading(false);
            alert(errorMessage);
        });
    }

    return (<KeyboardAvoidingView behavior="height" enabled style={{flex: 1}}>
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
            }}
        >
            <View flex-1 center center-H bg-grey70>
                <Image
                    resizeMode="contain"
                    style={{
                        height: 220, width: 220,
                    }}
                    source={require("../../../assets/register.png")}
                />
            </View>
            <View flex-3 paddingH-20 paddingB-20 bg-grey70>
                <Text text60M center padding-30>Register</Text>
                <Text>Email</Text>
                <TextField
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
                <Text marginT-15>Password</Text>
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
                <Button
                    label={loading ? "Loading" : "Create an account"}
                    onPress={() => {
                        register();
                    }}
                    marginT-20
                    disabled={loading}
                    enableShadow={true}
                />

                <View row center centerH marginT-15>
                    <Text text80>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                    >
                        <Text text80M marginL-5 blue30>
                            Login here
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>);
}

const styles = StyleSheet.create({
    withUnderline: {
        borderBottomWidth: 1, borderColor: Colors.grey40, paddingBottom: 4
    }, withFrame: {
        borderWidth: 1, borderColor: Colors.$outlineDisabledHeavy, padding: 4, borderRadius: 2
    }
});