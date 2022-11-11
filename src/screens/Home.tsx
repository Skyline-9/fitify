import firebase from "firebase/compat";
import {useContext, useEffect, useState} from "react";
import {Alert, ScrollView} from "react-native";
import {Button, View, Image, TouchableOpacity, Text, Colors, Card} from "react-native-ui-lib";
import {DBContext} from "../provider/DBProvider";
import NavigationBar from "../components/NavigationBar";
// import {getDownloadURL, getStorage, listAll, ref, uploadBytesResumable} from "firebase/storage";
import {collection, getDocs} from "firebase/firestore";

import _ from "lodash";
import posts from "../data/posts";

const HomeScreen = ({navigation}) => {

    // useEffect(() => {
    //     listAll(storageRef).then((response) => {
    //         response.items.forEach((item) => {
    //             getDownloadURL(item).then((url) => {
    //                 setImageList((prev) => [...prev, url]);
    //             });
    //         });
    //     });
    // });

    //-------------- API Calls -------------------------
    const dbContext = useContext(DBContext);
    const db = dbContext.db;


    useEffect(() => {
        const getAllPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posts"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        };

        console.log("Starting firebase conection...");
        getAllPosts();
    });

    //-------------- UI Methods ------------------------
    /**
     * renderCards() reads data from posts in ../data/posts and then maps them to a list of cards
     */
    const renderCards = () => {
        return _.map(posts, (post, i) => {
            const statusColor = post.status === "Published" ? Colors.$textSuccess : Colors.$textMajor;

            return (
                <Card
                    key={i}
                    style={{marginBottom: 15}}
                    onPress={() => console.log("press on a card")}
                >
                    <Card.Section
                        imageSource={{uri: post.coverImage}}
                        imageStyle={{height: 160}}
                    />

                    <View padding-20>
                        <Text text40 $textDefault>
                            {post.title}
                        </Text>
                        <View row>
                            <Text text90 color={statusColor}>
                                {post.status}
                            </Text>
                            <Text text90 $textDefault> | {post.timestamp}</Text>
                        </View>

                        <Text text70 $textDefault>
                            {post.description}
                        </Text>

                        <View>
                            <Text text90 $textDisabled>
                                {post.likes} Likes
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

    return (
        <View flex>

            <ScrollView showsVerticalScrollIndicator={false}
                        style={{marginLeft: "10%", paddingTop: "10%", width: "80%"}}
            >
                {renderCards()}
                <View style={{height: 150}}/>
            </ScrollView>
            <NavigationBar navigation={navigation}/>
        </View>
    );
};

export default HomeScreen;