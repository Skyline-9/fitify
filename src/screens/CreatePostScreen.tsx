import {ScrollView} from "react-native-gesture-handler";
import {
    Text, View, FloatingButtonProps, PickerProps, Picker, Icon, Colors,
    PickerMethods, Button, Incubator, PanningProvider, Typography
} from "react-native-ui-lib";
import {DBContext} from "../provider/DBProvider";
import NavigationBar from "../components/NavigationBar";
import * as ImagePicker from "expo-image-picker";
import {getDownloadURL, getStorage, listAll, ref, uploadBytesResumable} from "firebase/storage";
import {getFirestore, collection, addDoc, serverTimestamp} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import React, {useContext, useEffect, useState} from "react";
import _ from "lodash";
import {KeyboardAvoidingView} from "react-native";

const {TextField} = Incubator;

const CreatePostScreen = ({navigation, route}) => {

    // Image stuff
    const storage = getStorage();
    const storageRef = ref(storage, "");
    const [image, setImage] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Keywords stuff
    const options = [
        {label: "bench press", value: "bench press"},
        {label: "biceps", value: "biceps"},
    ];
    const [selectedKeywords, setSelectedKeywords] = useState<any>([]);

    // Post description stuff
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // @ts-ignore
        const source = {"uri": result.uri};
        // @ts-ignore
        setImage(source);
    };

    const dbContext = useContext(DBContext);
    const db = dbContext.db;

    const uid = getAuth().currentUser.uid;

    const uploadImage = async () => {
        const fileName = image["uri"].substring(image["uri"].lastIndexOf("/") + 1);
        const storageRef = ref(getStorage(), fileName);

        const img = await fetch(image["uri"]);
        const blob = await img.blob();
        await uploadBytesResumable(storageRef, blob);

        const uploadedURI = await getDownloadURL(storageRef);
        const data = {
            keywords: selectedKeywords,
            likes: 472,
            owner_uid: uid,
            title: title,
            body: description,
            createdAt: serverTimestamp(),
            content_file_urls: [uploadedURI]
        };
        await addDoc(collection(db, "posts"), data);

        navigation.navigate("Home");

    };

    const renderDialog = modalProps => {
        const {visible, children, toggleModal, onDone} = modalProps;

        return (
            <Incubator.Dialog
                visible={visible}
                onDismiss={() => {
                    onDone();
                    toggleModal(false);
                }}
                width="100%"
                height="45%"
                bottom
                // useSafeArea
                containerStyle={{backgroundColor: Colors.$backgroundDefault}}
                direction={PanningProvider.Directions.DOWN}
                headerProps={{title: "Custom modal"}}
            >
                <ScrollView>{children}</ScrollView>
            </Incubator.Dialog>
        );
    };

    return (<KeyboardAvoidingView behavior="height" enabled style={{flex: 1}}>
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
            }}
            scrollEnabled={false}
        >
            <Button
                backgroundColor={Colors.blue40}
                label="Pick image"
                labelStyle={{fontWeight: "600"}}
                style={{marginBottom: 20, marginTop: 100, width: "80%", marginLeft: "10%"}}
                enableShadow
                onPress={pickImage}
            />

            <View center>
                {/*
            // @ts-ignore */}
                <Picker
                    placeholder="Select Keywords"
                    onChange={items => {
                        const temp = [];
                        items.forEach(item => temp.push(item.value));
                        setSelectedKeywords(temp);
                    }}
                    mode={Picker.modes.MULTI}
                    selectionLimit={10}
                    migrateTextField
                    renderCustomModal={renderDialog}
                >
                    {_.map(options, option => <Picker.Item key={option.value} value={option} label={""}/>)}
                </Picker>
                {_.map(selectedKeywords, keyword => <Text>{keyword}</Text>)}
                <TextField
                    marginT-15
                    placeholder="Enter post title"
                    value={title}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    useGestureHandlerInput
                    onChangeText={(text) => setTitle(text)}
                    enableErrors
                />
                <TextField
                    marginT-15
                    placeholder="Enter post description"
                    value={description}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    useGestureHandlerInput
                    onChangeText={(text) => setDescription(text)}
                    enableErrors
                />
            </View>
            <Button
                backgroundColor="#30B650"
                label="Post"
                labelStyle={{fontWeight: "600"}}
                style={{marginBottom: 20, marginTop: 20, width: "80%", marginLeft: "10%"}}
                enableShadow
                onPress={uploadImage}
            />
            <NavigationBar navigation={navigation}/>
        </ScrollView>
    </KeyboardAvoidingView>);
};

export default CreatePostScreen;