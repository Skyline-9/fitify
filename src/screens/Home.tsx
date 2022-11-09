import {useEffect, useState} from "react";
import {ScrollView} from "react-native";
import {Button, View, Image, TouchableOpacity} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";
import {getDownloadURL, getStorage, listAll, ref, uploadBytesResumable} from "firebase/storage";

import * as ImagePicker from 'expo-image-picker';

const HomeScreen = ({navigation}) => {

    const [image, setImage] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [imageList, setImageList] = useState([]);
    const storage = getStorage();
    const storageRef = ref(storage, "");

    const uniqueURL = Array.from(new Set(imageList));

    const uploadImage = async () => {
        const fileName = image["uri"].substring(image["uri"].lastIndexOf("/") + 1);
        const storageRef = ref(getStorage(), fileName);

        const img = await fetch(image["uri"]);
        const blob = await img.blob();

        const uploadTask = uploadBytesResumable(storageRef, blob);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        });

        // @ts-ignore
        const source = {uri: result.uri};
        // @ts-ignore
        setImage(source);
        console.log(image["uri"]);
    }


    useEffect(() => {
        listAll(storageRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url]);
                });
            });
        });
    });

    return (
        <View flex>
            <Button
                backgroundColor="#30B650"
                label="Go to Jane's Profile"
                labelStyle={{fontWeight: "600"}}
                style={{marginBottom: 20, marginTop: 200, width: "80%", marginLeft: "10%"}}
                enableShadow
                onPress={() =>
                    navigation.navigate("Profile", {name: "Jane"})
                }
            />

            <Button
                backgroundColor="#30B650"
                label="Pick image"
                labelStyle={{fontWeight: "600"}}
                style={{marginBottom: 20, marginTop: 20, width: "80%", marginLeft: "10%"}}
                enableShadow
                onPress={pickImage}
            />
            <Button
                backgroundColor="#30B650"
                label="Upload image"
                labelStyle={{fontWeight: "600"}}
                style={{marginBottom: 20, marginTop: 20, width: "80%", marginLeft: "10%"}}
                enableShadow
                onPress={uploadImage}
            />

            <ScrollView pagingEnabled showsHorizontalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={1} style={{marginBottom: 30, marginLeft: 20}}>
                    {uniqueURL.map(url => (

                        <View key={url} style={{
                            marginTop: 10,
                            padding: 15,
                            backgroundColor: "#eee"
                        }}>
                            <Image
                                source={{
                                    uri: url,
                                }}/>

                        </View>
                    ))}
                </TouchableOpacity>
            </ScrollView>


            <NavigationBar navigation={navigation}/>
        </View>
    );
};

export default HomeScreen;

