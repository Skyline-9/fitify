import {Text, View} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";

const SearchScreen = ({navigation, route}) => {
    return (<View flex>
        <Text>This is search screen</Text>
        <NavigationBar navigation={navigation}/>
    </View>);
};

export default SearchScreen;