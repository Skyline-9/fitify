import NavigationBar from "../components/NavigationBar";
import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, TextInput, ScrollView, Keyboard, RefreshControl} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import firebase from "react-native-firebase";
import { query, where } from "firebase/firestore";
import {DBContext} from "../provider/DBProvider";
import {getFirestore, collection, getDocs, serverTimestamp, Firestore} from "firebase/firestore";
import { Colors, Button, View, Card, Text, TouchableOpacity } from "react-native-ui-lib";

import _ from "lodash";

const SearchScreen = ({navigation, route}) => {

    var urlList = []
    const [input, setInput] = useState("");
    const [urlL, seturlL] = useState("");
    
    const dbContext = useContext(DBContext);
    const db = dbContext.db;

    const search = async () => {
        console.log(input)
        const q = query(collection(db, "posts"), where('keywords', "array-contains-any", [input]));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            urlList.push(doc.data());
            // console.log(urlList)
        });
        seturlL(urlList)

        console.log(urlList)
    }

    type Post = {
        body: string,
        title: string,
        timestamp: string,
        description: string,
        likes: number,
        verified: boolean
    }

    const renderCards = () => {
        
        search()
        // urlList = [{"body": "ok plz work", "content_file_urls": ["https://firebasestorage.googleapis.com/v0/b/first-app-cd134.appspot.com/o/301DEE60-66B9-4A1F-A39B-470535DEDE95.jpg?alt=media&token=328dd414-c9ef-480a-9f9e-a68d34b3523a"], "createdAt": [Object], "keywords": ["bench press"], "likes": 472, "owner_uid": "j7R0JCRToGUC9MwhV3CmjMKJijl2", "title": "test2"}, {"body": "omg", "content_file_urls": ["https://firebasestorage.googleapis.com/v0/b/first-app-cd134.appspot.com/o/5E991E98-004F-48D3-A9E2-A533C8576A30.jpg?alt=media&token=4fb3f7bf-ad6d-4148-986d-0f50f00bfafa"], "createdAt": [Object], "keywords": ["bench press", "biceps"], "likes": 472, "owner_uid": "j7R0JCRToGUC9MwhV3CmjMKJijl2", "title": "plz work"}]
        
        return _.map(urlL, (post: Post, i) => {
            return ( 
                <Card
                key={i}
                style={{marginBottom: 15}}
                onPress={() => console.log("card rendered")}>

                <Card.Section
                    imageSource={{uri: post["content_file_urls"][0]}}
                    imageStyle={{height: 160}}
                />

                <View padding-20>
                    <Text text40 $textDefault>
                        {post["title"]}
                    </Text>
                    {/* <View row>
                        <Text text90 color={ Colors.$textMajor}>
                            {post["createdAt"].toString()}
                        </Text>
                        <Text text90 $textDefault>{post["createdAt"].toString()}</Text>
                    </View> */}

                    <Text text70 $textDefault>
                        {post["body"]}
                    </Text>

                    <View>
                        <Text text90 $textDisabled>
                            {post["likes"]} Likes
                        </Text>
                        <View row right>
                            <Button
                                style={{marginRight: 10}}
                                text90
                                link
                                // iconSource={featureIcon}
                                label="Feature"
                            />
                            <Button text90 link /* iconSource={shareIcon} */ label="Share"/>
                        </View>
                    </View>
                </View>
            </Card>
            );
        });
    };
    
    // console.log(urlList)

    return (
        <View flex>
            <View
            style = {{
                margin: 15, 
            }}
            >
                <View
                    style = {{
                        padding: 10,
                        flexDirection: "row",
                        width: '95%',
                        backgroundColor: '#d9dbda', 
                        borderRadius: 10, 
                        alignItems: "center"
                    }}
                >
                <Feather 
                    name = "search"
                    size = {20}
                    color="black"
                    style = {{marginLeft: 1, marginRight: 4}}
                />
                <TextInput value = {input} onChangeText = {(text) => setInput(text)} style = {{fontSize: 15}} placeholder="Search"
                />
                </View>
            </View> 

            {/* <View style={{marginLeft: "10%", paddingTop: "10%", width: "80%"}}>   
                <Button
                    label="Enter"
                    labelStyle={{fontWeight: "600"}}
                    style={{marginBottom: 20, marginTop: -100, width: "30%", marginLeft: "78%"}}
                    enableShadow
                    onPress={() => renderCards()}
                />
                <View style={{height: 150}}/>
            </View> */}
                    
            <ScrollView showsVerticalScrollIndicator={false}
                        style={{marginLeft: "10%", paddingTop: "10%", width: "80%"}}>
                {renderCards()}
                <View style={{height: 150}}/>
            </ScrollView>

            <NavigationBar navigation={navigation}/>
        </View>);
};

export default SearchScreen;
