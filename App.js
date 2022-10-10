import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Colors, LoaderScreen} from "react-native-ui-lib";
import {NativeScreenNavigationContainer} from "react-native-screens";

export default function App() {
  return (
      <NativeScreenNavigationContainer>

      </NativeScreenNavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
