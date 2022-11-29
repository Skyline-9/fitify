import {collection, getDocs} from "firebase/firestore";

import _ from "lodash";
import {useContext, useState} from "react";
import {ScrollView} from "react-native";
import {Button, Card, Colors, Text, View} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";
import {DBContext} from "../provider/DBProvider";

const HomeScreen = ({navigation}) => {

    //-------------- Type Definitions -------------------
    type Post = {
        coverImage: string,
        title: string,
        timestamp: string,
        description: string,
        likes: number,
        verified: boolean
    }

    //-------------- API Calls -------------------------
    const dbContext = useContext(DBContext);
    const db = dbContext.db;

    const [posts, setPosts] = useState<Post[]>();

    // I also tried useEffect still DDOS
    const getAllPosts = async () => {
        console.log("Starting firebase connection...");
        const querySnapshot = await getDocs(collection(db, "posts"));

        const newPosts = [];

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            const {body, comments, content_file_urls, createdAt, keywords, likes, title} = doc.data();
            newPosts.push({
                coverImage: content_file_urls[0],
                title: title,
                timestamp: new Date(createdAt.seconds * 1000).toLocaleString(),
                description: body,
                likes: likes,
                verified: true
            });
        });
        console.log("End firebase connection");

        console.log(newPosts);
        setPosts(newPosts);
    };

    getAllPosts();

    //-------------- UI Methods ------------------------
    /**
     * renderCards() reads data from posts and then maps them to a list of cards
     */
    const renderCards = () => {
        return _.map(posts, (post: Post, i) => {
            const statusColor = post.verified ? Colors.$textSuccess : Colors.$textMajor;

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
                                {post["createdAt"]}
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