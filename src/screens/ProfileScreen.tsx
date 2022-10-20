import {Text, View} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";

const ProfileScreen = ({navigation, route}) => {
    return (<View flex>
        <Text>This is {route.params.name}'s profile</Text>
        <NavigationBar navigation={navigation}/>
    </View>);
};

export default ProfileScreen;