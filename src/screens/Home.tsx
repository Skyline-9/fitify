import {useEffect, useState} from "react";
import {Alert, ScrollView} from "react-native";
import {Button, View, Image, TouchableOpacity, Text, Colors, Card} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";
import {getDownloadURL, getStorage, listAll, ref, uploadBytesResumable} from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

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
            aspect: [4, 3],
            quality: 1,
        });

        // @ts-ignore
        const source = {uri: result.uri};
        // @ts-ignore
        setImage(source);
        console.log(image["uri"]);
    };


    // useEffect(() => {
    //     listAll(storageRef).then((response) => {
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 setImageList((prev) => [...prev, url]);
    //             });
    //         });
    //     });
    // });

    return (
        <View flex>
            <View width='80%' style={{marginLeft: '10%', marginTop: '30%'}}>
                {/* Reference https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx */}
                <Card
                    key={0}
                    style={{marginBottom: 15}}
                    onPress={() => console.log("press on a card")}
                >
                    <Card.Section
                        imageSource={{uri: "https://images.unsplash.com/photo-1541823709867-1b206113eafd"}}
                        imageStyle={{height: 160}}
                    />

                    <View padding-20>
                        <Text text40 $textDefault>
                            Amazing Desert
                        </Text>
                        <View row>
                            <Text text90 color={Colors.$textSuccess}>
                                Published
                            </Text>
                            <Text text90 $textDefault> | {"31 August 2016"}</Text>
                        </View>

                        <Text text70 $textDefault>
                            {"Reference this card when designing"}
                        </Text>

                        <View>
                            <Text text90 $textDisabled>
                                345 Likes
                            </Text>
                            <View row right>
                                <Button
                                    style={{marginRight: 10}}
                                    text90
                                    link
                                    label="Feature"
                                />
                                <Button text90 link label="Share"/>
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
            <Button
                backgroundColor="#30B650"
                label="Go to Jane's Profile"
                labelStyle={{fontWeight: "600"}}
                style={{marginBottom: 20, width: "80%", marginLeft: "10%"}}
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

