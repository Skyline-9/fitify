import {Button} from "react-native-ui-lib";

const HomeScreen = ({navigation}) => {
    return (
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
    );
};

export default HomeScreen;