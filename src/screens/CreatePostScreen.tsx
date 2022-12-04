import {Text, View, FloatingButtonProps, PickerProps, Picker, Icon, Colors,
    PickerMethods, Button} from "react-native-ui-lib";
import NavigationBar from "../components/NavigationBar";
import * as ImagePicker from "expo-image-picker";
import {getDownloadURL, getStorage, listAll, ref, uploadBytesResumable} from "firebase/storage";
import {useEffect, useState} from "react";


const CreatePostScreen = ({navigation, route}) => {

    const storage = getStorage();
    const storageRef = ref(storage, "");
    const [image, setImage] = useState(false);
    const [uploading, setUploading] = useState(false);

    const filters = [
        {label: 'bench press', value: 0},
        {label: 'biceps', value: 1},
        {label: 'lunges', value: 2},
        {label: 'squats', value: 3}, 
      ];
    
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        // @ts-ignore
        const source = {"uri": result.uri};
        // @ts-ignore
        setImage(source);
    };

    const uploadImage = async () => {
        const fileName = image["uri"].substring(image["uri"].lastIndexOf("/") + 1);
        const storageRef = ref(getStorage(), fileName);
    
        const img = await fetch(image["uri"]);
        const blob = await img.blob();
        const uploadTask = uploadBytesResumable(storageRef, blob);
    };

    return (<View flex>
        <Button
            backgroundColor="#30B650"
            label="Pick image"
            labelStyle={{fontWeight: "600"}}
            style={{marginBottom: 20, marginTop: 100, width: "80%", marginLeft: "10%"}}
            enableShadow
            onPress={pickImage}
        />

        <Picker
            renderPicker={(_value?: any, label?: string) => {
                return (
                <View row>
                    <Icon
                    style={{marginRight: 135, height: 16, resizeMode: 'contain'}}
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

        <Button
            backgroundColor="#30B650"
            label="Upload image"
            labelStyle={{fontWeight: "600"}}
            style={{marginBottom: 20, marginTop: 20, width: "80%", marginLeft: "10%"}}
            enableShadow
            onPress={uploadImage}
        />
        <NavigationBar navigation={navigation}/>
        
    </View>);
};

export default CreatePostScreen;