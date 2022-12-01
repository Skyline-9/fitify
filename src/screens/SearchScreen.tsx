import {Text, View} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";

const SearchScreen = ({navigation, route}) => {
    return (<View flex>
        <View flex center>
            <Text>This is search screen</Text>
        </View>
        <NavigationBar navigation={navigation}/>
    </View>);
};

export default SearchScreen;