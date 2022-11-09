import React from "react";
import {Alert} from "react-native";
import {ActionBar} from "react-native-ui-lib";

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

        return (<ActionBar
                centered useSafeArea
                actions={[
                    {
                        iconSource: home, iconStyle: {width: 25, height: 25}, onPress: () => {
                            navigation.navigate("Home")
                        }
                    },
                    {
                        iconSource: search, iconStyle: {width: 25, height: 25}, onPress: () => {
                            navigation.navigate("Search");
                        }
                    },
                    {
                        iconSource: user, iconStyle: {width: 25, height: 25}, onPress: () => {
                            navigation.navigate("Profile", {name: "John"});
                        }
                    },
                ]}
            />
        );
    };
}
