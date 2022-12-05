import * as ImagePicker from "expo-image-picker";
import {getAuth} from "firebase/auth";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import _ from "lodash";
import React, {useContext, useState} from "react";
import {KeyboardAvoidingView} from "react-native";
import {ScrollView} from "react-native-gesture-handler";
import {Button, Colors, Incubator, PanningProvider, Picker, Text, View} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";
import {DBContext} from "../provider/DBProvider";

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
        {label: "calf", value: "calf"},
        {label: "cardio", value: "cardio"},
        {label: "core", value: "core"},
        {label: "quads", value: "quads"},
        {label: "triceps", value: "triceps"},
        {label: "lats", value: "lats"},
        {label: "home", value: "home"},
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
                showSearch
                containerStyle={{backgroundColor: Colors.$backgroundDefault}}
                direction={PanningProvider.Directions.DOWN}
                headerProps={{title: "Select Keywords"}}
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
            <Text text60M center style={{marginTop: 40}}> Create Post</Text>
            <Text center grey20 style={{width: "80%", marginLeft: "10%"}}>Pick an image, select the keywords for your
                post
                (e.g. calf, bicep), write the title and
                description, then post!</Text>
            <Button
                backgroundColor={Colors.blue40}
                label="Pick image"
                labelStyle={{fontWeight: "600"}}
                style={{marginBottom: 20, marginTop: 30, width: "50%", marginLeft: "25%"}}
                enableShadow
                onPress={pickImage}
            />

            <View center>
                <Text center>Keywords</Text>
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
                <Text center>Enter post title</Text>
                <TextField
                    marginT-15
                    placeholder="post title"
                    value={title}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    useGestureHandlerInput
                    onChangeText={(text) => setTitle(text)}
                    enableErrors
                    fieldStyle={{
                        borderBottomWidth: 1,
                        borderColor: Colors.grey40,
                        paddingBottom: 4,
                        width: "60%"
                    }}
                />
                <Text center>Enter Post Description</Text>
                <TextField
                    marginT-15
                    placeholder="post description"
                    value={description}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                    useGestureHandlerInput
                    onChangeText={(text) => setDescription(text)}
                    enableErrors
                    fieldStyle={{
                        borderBottomWidth: 1,
                        borderColor: Colors.grey40,
                        paddingBottom: 4,
                        width: "60%"
                    }}
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