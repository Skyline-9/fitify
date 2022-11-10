import React from "react";
import {Alert} from "react-native";
import {ActionBar, Button, ButtonSize, Image, View, Colors} from "react-native-ui-lib";
import add from "../../assets/icons/add.png";
import bookmark from "../../assets/icons/bookmark.png";

// Icons
import home from "../../assets/icons/home.png";
import search from "../../assets/icons/search.png";
import user from "../../assets/icons/user.png";

export default class NavigationBar extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const navigation = this.props.navigation;

        return (
            <View flex>
                <ActionBar
                    centered useSafeArea
                    actions={[
                        {
                            iconSource: home,
                            iconStyle: {width: 30, height: 30},
                            color: Colors.blue40,
                            onPress: () => {
                                navigation.navigate("Home");
                            }
                        },
                        {
                            iconSource: bookmark,
                            iconStyle: {width: 30, height: 30},
                            color: Colors.blue40,
                            onPress: () => {
                                navigation.navigate("Home"); //TODO
                            }
                        },
                        {
                            iconSource: search,
                            iconStyle: {width: 30, height: 30},
                            color: Colors.blue40,
                            onPress: () => {
                                navigation.navigate("Search");
                            }
                        },
                        {
                            iconSource: user,
                            iconStyle: {width: 30, height: 30},
                            color: Colors.blue40,
                            onPress: () => {
                                navigation.navigate("Profile", {name: "John"});
                            }
                        },
                    ]}
                />
                <Button
                    iconSource={add}
                    outline enableShadow
                    color={Colors.blue1}
                    outlineColor={Colors.blue1}
                    marginT-100
                    style={{position: 'absolute', width: 60, height: 60, left: 190, right: 0, bottom: 60}}
                    round
                    onPress={() => navigation.navigate("Add")}
                >
                </Button>
            </View>
        );
    };
}
