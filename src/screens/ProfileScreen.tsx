import {Button, View, Image, Text, Avatar, Card, Colors} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";

const ProfileScreen = ({navigation}) => {
    return (
        <View flex>
            {/* Flex view for body content */}
            <View flex row centerV marginL-25>
                <Avatar source={{uri: "https://images.unsplash.com/photo-1541823709867-1b206113eafd"}} label={"IT"}
                        size={60}/>
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
                    <Text text40 $textDefault>
                        Lunges
                    </Text>
                    <Text text70 $textDefault>
                        Add Button
                    </Text>
                </View>
                <View padding-20 row spread centerV>
                    <Text text40 $textDefault>
                        Leg Curls
                    </Text>
                    <Text text70 $textDefault>
                        Add Button
                    </Text>
                </View>
                <View padding-20 row spread centerV>
                    <Text text40 $textDefault>
                        Leg Press
                    </Text>
                    <Text text70 $textDefault>
                        Add Button
                    </Text>
                </View>
                <View padding-20 row spread centerV>
                    <Text text40 $textDefault>
                        Calf Raises
                    </Text>
                    <Text text70 $textDefault>
                        Add Button
                    </Text>
                </View>

            </Card>
            <NavigationBar navigation={navigation}/>
        </View>
    );
};

export default ProfileScreen;