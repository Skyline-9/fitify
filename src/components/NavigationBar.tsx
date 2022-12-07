import React from "react";
import {ActionBar, Colors, View} from "react-native-ui-lib";
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
                            iconSource: add,
                            iconStyle: {width: 30, height: 30},
                            color: Colors.blue40,
                            onPress: () => {
                                navigation.navigate("Add");
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
                        }
                    ]}
                />
            </View>
        );
    };
}
