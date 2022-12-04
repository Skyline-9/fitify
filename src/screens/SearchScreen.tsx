import {Text, View, Picker, Icon, Colors, Card} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";

const SearchScreen = ({navigation, route}) => {

    const filters = [
        {label: 'bench press', value: 0},
        {label: 'biceps', value: 1},
        {label: 'lunges', value: 2},
        {label: 'squats', value: 3}, 
      ];

    return (
    
    <View flex>
        <Picker
            renderPicker={(_value?: any, label?: string) => {
                return (
                <View row>
                    <Icon
                    style={{marginRight: 135, marginTop: 150, height: 16, resizeMode: 'contain'}}
                    tintColor={Colors.$iconDefault}
                    />
                    <Text $textDefault text80>
                    {label} Pick Image Type
                    </Text>
                </View>
                );
            }}
            >
            {filters.map(filter => (
                <Picker.Item key={filter.value} value={filter} label={''}/>
            ))}
        </Picker>

        <Card>
        <Card.Section
                    imageSource={{uri: "https://firebasestorage.googleapis.com/v0/b/first-app-cd134.appspot.com/o/PERFECT-SERIES_LUNGE-HORIZONTAL_GRAIN.webp?alt=media&token=1a4a7dcc-1556-484c-87a4-220a4288cdb9"}}
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
        </Card>

        

        <NavigationBar navigation={navigation}/>
    </View>);
};

export default SearchScreen;