import {
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  useColorScheme,
  Dimensions,
} from 'react-native';
import React from 'react';
import AiText from '../components/AiText';
import UserText from '../components/UserText';

const screenWidth = Dimensions.get('screen').width;

// dummy messages:

const clientMessage = ['How are you ?', 'What are you doing?', "what can you do"];
const aiMessage = [
  'I am fine',
  'I am AI chatbot I can answer your questions only', " nothing",
];
const improvedVersion = ['How are you?', 'What are you doing?',"what can you do"];

export default function Coversation() {
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
              <UserText clientMessage={clientMessage[ind]} improvedMessage={improvedVersion[ind]}/>
              <AiText message={aiMessage[ind]} />
            </>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    heading: {
        width: screenWidth*(19/20),
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 12,
        justifyContent: 'center', // Centers children horizontally
        alignItems: 'center', // Centers children vertically
        marginVertical:22,
        
       },
       
  headingText: {
    color: 'white',
    width: 'auto',
    height: 'auto',
    textAlign: 'center',
    textDecorationLine:'underline'
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
