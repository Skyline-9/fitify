// Firebase
import {getAuth} from "firebase/auth";
import {collection, doc, getCountFromServer, getDoc, query, where} from "firebase/firestore";
import {useContext, useEffect, useState} from "react";
import {Avatar, Card, Colors, Icon, Text, View} from "react-native-ui-lib";
import add from "../../assets/icons/add.png";

// Assets
import verified from "../../assets/icons/verified.png";
import NavigationBar from "../components/NavigationBar";
import {DBContext} from "../provider/DBProvider";

const ProfileScreen = ({navigation}) => {

    // User Data
    const [photoURL, setPhotoURL] = useState("");
    const [isTrainer, setIsTrainer] = useState(false);

    //-------------- Analytics Data --------------------
    const [iOSCount, setiOSCount] = useState(0);
    const [androidCount, setAndroidCount] = useState(0);

    //-------------- API Calls -------------------------
    const dbContext = useContext(DBContext);
    const db = dbContext.db;

    useEffect(() => {
        const query_ios = query(collection(db, "userAgents"), where("os", "==", "ios"));
        const query_android = query(collection(db, "userAgents"), where("os", "==", "android"));

        const getAnalytics = async () => {
            const ios_snapshot = await getCountFromServer(query_ios);
            const android_snapshot = await getCountFromServer(query_android);

            setiOSCount(ios_snapshot.data().count);
            setAndroidCount(android_snapshot.data().count);
            console.log("Polling analytics");
        };

        getAnalytics();
        const getAnalyticsInterval = setInterval(getAnalytics, 30000);

        const uid = getAuth().currentUser.uid;
        (async () => {
            const {displayName, email, photoURL, isVerifiedTrainer} = await (await getDoc(doc(db, "user", uid))).data();
            setIsTrainer(isVerifiedTrainer);
            setPhotoURL(photoURL);
        })();

        return () => clearInterval(getAnalyticsInterval);
    }, []);

    return (
        <View flex>
            {/* Flex view for body content */}
            <View flex row centerV marginL-25>
                <Avatar source={{uri: photoURL}}
                        size={60}
                        badgeProps={isTrainer ? {
                            icon: verified,
                            size: 22,
                            borderWidth: 1.5,
                            borderColor: Colors.transparent,
                            iconStyle: {backgroundColor: Colors.transparent}
                        } : undefined}/>
                <View flex>
                    <Text marginL-20 text60 centerV>You</Text>
                    <Text marginL-20 text1 centerV grey40>8.8M Followers</Text>
                </View>
            </View>
            <Text marginT-10 text20BO marginL-25>Perfect Leg Day</Text>
            <Card
                key={0}
                margin-20
                style={{marginBottom: 15}}
                onPress={() => console.log("press on a card")}
            >
                <Card.Section
                    imageSource={{uri: "https://images.unsplash.com/photo-1584863495140-a320b13a11a8"}}
                    imageStyle={{height: 160}}
                />

                <View padding-20 row spread centerV>
                    <Text text50 $textDefault>
                        Lunges
                    </Text>
                    <Icon source={add} size={24} tintColor={Colors.green40}/>
                </View>
                <View padding-20 row spread centerV>
                    <Text text50 $textDefault>
                        Leg Curls
                    </Text>
                    <Icon source={add} size={24} tintColor={Colors.green40}/>
                </View>
                <View padding-20 row spread centerV>
                    <Text text50 $textDefault>
                        Leg Press
                    </Text>
                    <Icon source={add} size={24} tintColor={Colors.green40}/>
                </View>
                <View padding-20 row spread centerV>
                    <Text text50 $textDefault>
                        Calf Raises
                    </Text>
                    <Icon source={add} size={24} tintColor={Colors.green40}/>
                </View>
            </Card>
            {isTrainer && <Text center>Activity: iOS: {iOSCount} | Android: {androidCount}</Text>}
            <NavigationBar navigation={navigation}/>
        </View>
    );
};

export default ProfileScreen;
