import {useEffect, useState} from "react";
import {Alert, ScrollView} from "react-native";
import {Button, View, Image, TouchableOpacity, Text, Colors, Card} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";
import {getDownloadURL, getStorage, listAll, ref, uploadBytesResumable} from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

const HomeScreen = ({navigation}) => {

    let [imageList, setImageList] = useState(["https://firebasestorage.googleapis.com/v0/b/first-app-cd134.appspot.com/o/PERFECT-SERIES_LUNGE-HORIZONTAL_GRAIN.webp?alt=media&token=1a4a7dcc-1556-484c-87a4-220a4288cdb9",
                                                "https://firebasestorage.googleapis.com/v0/b/first-app-cd134.appspot.com/o/pLaRi5jXSHDKu6WRydetBo-1200-80.jpg?alt=media&token=e473072f-7ca8-40d8-908a-33fb7461bd61"])


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
            
            <ScrollView pagingEnabled showsHorizontalScrollIndicator={false} width='80%' style={{marginLeft: '10%', marginTop: '30%'}}>
            <Card
                key={0}
                style={{marginBottom: 15}}
                onPress={() => console.log("press on a card")}
            >
                {imageList.map(url => (
                    <View>
                        <Card.Section
                    imageSource={{uri: url}}
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
                    </View>
                    
                ))}
            </Card>
                {/* <TouchableOpacity activeOpacity={1} style={{marginBottom: 30, marginLeft: 20}}>
                    {imageList.map(url => (
                        <View key={url} style={{
                            marginTop: 10,
                            padding: 15,
                            backgroundColor: "#eee"
                        }}>{console.log("URL", url)}
                            <Image
                                imageSource={{
                                    "uri": url,
                                }}/>
                        </View>
                    ))}
                </TouchableOpacity> */}
            </ScrollView>
            <NavigationBar navigation={navigation}/>
        </View>
    );
};

export default HomeScreen;