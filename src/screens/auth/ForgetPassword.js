import React, {useState} from "react";
import {KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {getAuth, sendPasswordResetEmail} from "firebase/auth";
import {Button, Image, Typography, Text, View, Incubator, Colors} from "react-native-ui-lib";

const {TextField} = Incubator;

export default function ({navigation}) {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function forget() {
        setLoading(true);
        await sendPasswordResetEmail(auth, email)
            .then(function () {
                setLoading(false);
                navigation.navigate("Login");
                alert("Your password reset has been sent to your email");
            })
            .catch(function (error) {
                setLoading(false);
                alert(error);
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
                    source={require("../../../assets/forget.png")}
                />
            </View>
            <View flex-3 paddingH-20 paddingB-20 bg-grey70>
                <Text text60M padding-30 center>Forget Password</Text>
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
                    validationMessage={['Email is required', 'Email is invalid']}
                    validationMessageStyle={Typography.text90R}
                    validationMessagePosition={TextField.validationMessagePositions.BOTTOM}
                    validate={['required', 'email']}
                    validateOnChange
                    validateOnBlur
                    marginB-s4
                    fieldStyle={styles.withUnderline}
                />
                <Button
                    label={loading ? "Loading" : "Send email"}
                    onPress={() => {
                        forget();
                    }}
                    disabled={loading}
                    enableShadow={true}
                    backgroundColor={Colors.red40}
                />
                <View center marginT-15 row centerH>
                    <Text size="md">Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("Login");
                        }}
                    >
                        <Text text80M blue40 marginL-5>Login here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>);
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