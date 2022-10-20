import {ActionBar, Button, View} from "react-native-ui-lib";
import cameraSelected from "../../assets/icons/cameraSelected.png";
import {Alert} from 'react-native';

// Icons
import home from "../../assets/icons/home.png";
import search from "../../assets/icons/search.png";
import user from "../../assets/icons/user.png";

const HomeScreen = ({navigation}) => {
    return (
        <View flex>
            <Button
                backgroundColor="#30B650"
                label="Go to Jane's Profile"
                labelStyle={{fontWeight: '600'}}
                style={{marginBottom: 20, marginTop: 200, width: '80%', marginLeft: '10%'}}
                enableShadow
                onPress={() =>
                    navigation.navigate('Profile', {name: 'Jane'})
                }
            />
            <ActionBar
                centered useSafeArea
                actions={[
                    {iconSource: home, iconStyle: {width: 25, height: 25}, onPress: () => {Alert.alert('camera')}},
                    {iconSource: search, iconStyle: {width: 25, height: 25}, onPress: () => {Alert.alert('search')}},
                    {iconSource: user, iconStyle: {width: 25, height: 25}, onPress: () => {navigation.navigate('Profile', {name: 'John'})}},
                ]}
            />
        </View>
    );
};

export default HomeScreen;

