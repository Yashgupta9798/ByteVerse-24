
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//Navigation
import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"

//screens
import Home from './screens/Home';
import Details from './screens/Details';
import Progress from './screens/ProgressScreen'
import ProgressScreen from './screens/ProgressScreen';

export type RootStackParamList = {
  Home: undefined;
  Details: {productId: string};
  ProgressScreen: {productId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
        name='Home'
        component={Home}
        options={{
          title: "HOME"
        }}
        />
        <Stack.Screen
        name='Details'
        component={Details}
        options={{
          title: "Conversatation Details"
        }}
        />
        <Stack.Screen
        name='ProgressScreen'
        component={ProgressScreen}
        options={{
          title: "Progress Details"
        }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;