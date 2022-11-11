import {useEffect, useState} from "react";
import {Alert, ScrollView} from "react-native";
import {Button, View, Image, TouchableOpacity, Text, Colors, Card} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";
import {getDownloadURL, getStorage, listAll, ref, uploadBytesResumable} from "firebase/storage";

let image = []
const storage = getStorage();
const storageRef = ref(storage, "");

listAll(storageRef).then((response) => {
    response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          image.push(url); 
    });
  });
  });

  console.log("##", image)

const HomeScreen = ({navigation}) => {

    let [imageList, setImageList] = useState(image);
    console.log(":) ", imageList)

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



{/* <View width='80%' style={{marginLeft: '10%', marginTop: '30%'}}>
                {/* Reference https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/CardsScreen.tsx */}
            //     <Card
            //         key={0}
            //         style={{marginBottom: 15}}
            //         onPress={() => console.log("press on a card")}
            //     >
            //         <Card.Section
            //             imageSource={{uri: "https://images.unsplash.com/photo-1541823709867-1b206113eafd"}}
            //             imageStyle={{height: 160}}
            //         />

            //         <View padding-20>
            //             <Text text40 $textDefault>
            //                 Amazing Desert
            //             </Text>
            //             <View row>
            //                 <Text text90 color={Colors.$textSuccess}>
            //                     Published
            //                 </Text>
            //                 <Text text90 $textDefault> | {"31 August 2016"}</Text>
            //             </View>

            //             <Text text70 $textDefault>
            //                 {"Reference this card when designing"}
            //             </Text>

            //             <View>
            //                 <Text text90 $textDisabled>
            //                     345 Likes
            //                 </Text>
            //                 <View row right>
            //                     <Button
            //                         style={{marginRight: 10}}
            //                         text90
            //                         link
            //                         label="Feature"
            //                     />
            //                     <Button text90 link label="Share"/>
            //                 </View>
            //             </View>
            //         </View>
            //     </Card>
            // </View> 

