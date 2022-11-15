// import {getDownloadURL, getStorage, listAll, ref, uploadBytesResumable} from "firebase/storage";
import {collection, getDocs} from "firebase/firestore";

import _ from "lodash";
import {useContext, useEffect} from "react";
import {ScrollView} from "react-native";
import {Button, Card, Colors, Text, View} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";
import posts from "../data/posts";
import {DBContext} from "../provider/DBProvider";

const HomeScreen = ({navigation}) => {

    // TODO: I don't think we need this since we are coding the URL directly into the Firestore
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


    // TODO: Use this to populate data
    useEffect(() => {
        const getAllPosts = async () => {
            console.log("Starting firebase connection...");
            const querySnapshot = await getDocs(collection(db, "posts"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
            console.log("End firebase connection");
        };

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