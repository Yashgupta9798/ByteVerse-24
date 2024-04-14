import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('screen').width;

import {ScrollView, StatusBar, useColorScheme, Dimensions} from 'react-native';

// dummy messages:
const clientMessage = [
  'How are you ?',
  'What are you doing?',
  'what can you do',
];
const aiMessage = [
  'I am fine',
  'I am AI chatbot I can answer your questions only',
  ' nothing',
];
const improvedVersion = [
  'How are you?',
  'What are you doing?',
  'what can you do',
];

import AiText from '../components/AiText';
import UserText from '../components/UserText';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

//for the data we are accepting from there that is of product id
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

//type safety
type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export default function Details({route}: DetailsProps) {
  //!here we are mentioning the type

  const {productId} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.smallcolor}>Details:{productId}</Text>
  //     <Button
  //     title="go to home"
  //     onPress={()=> navigation.navigate("Home")}
  //     // onPress={()=> navigation.goBack()}
  //     />

  //     <Button
  //     title="go to first screen"

  //     // onPress={()=> navigation.pop(2)}
  //     onPress={()=>navigation.popToTop()}
  //     />

  //   </View>
  // )

  const colorScheme = useColorScheme();
  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
        backgroundColor={colorScheme === 'light' ? '#ffffff' : '#000000'}
      />

      <View style={styles.headingContainer}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Coversation</Text>
        </View>
      </View>

      <View>
        {aiMessage.map((ele, ind) => {
          return (
            <>
              <UserText
                clientMessage={clientMessage[ind]}
                improvedMessage={improvedVersion[ind]}
              />
              <AiText message={aiMessage[ind]} />
            </>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container:{
  //     flex:1,
  //     alignItems:"center",
  //     justifyContent:"center",
  // },
  // smallcolor:{
  //     color:"#000000"
  // }

  heading: {
    width: screenWidth * (19 / 20),
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 12,
    justifyContent: 'center', // Centers children horizontally
    alignItems: 'center', // Centers children vertically
    marginVertical: 22,
  },

  headingText: {
    color: 'white',
    width: 'auto',
    height: 'auto',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  headingContainer: {
    height: 'auto',
    width: screenWidth,
    alignItems: 'center', // Centers children horizontally
    justifyContent: 'center', // Centers children vertically
  },

  container: {
    // backgroundColor:'cyan',
  },
});
