import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import axios from 'axios';
import { Dimensions } from 'react-native';


const screenWidth = Dimensions.get('screen').width;


console.log("dimensions of screen: ",screenWidth)
//Navigation

import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import Toggle from './Toggle';

//type safety
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
//giving the type what we import and also the name of the screen that we are importing in here

//!defining the type
export default function Home({navigation}: HomeProps) {
  // for the three line
  const [isShowing, setIsShowing] = useState<boolean>(false);

  //for the voice to text and for text to voice
  const [started, setStarted] = useState('');
  const [ended, setEnded] = useState('');
  const [response, setResponse] = useState<string>('');
  const [results, setResults] = useState([]);
  const [isListening, setIsListening] = useState<boolean>(false);

  //for Animation part
  let [leftValue] = useState(new Animated.Value(0));
  const [opacity] = useState(new Animated.Value(0));

  //for Timer
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  

  //!FOR TEXT TO VOICE
  Tts.setDefaultLanguage('en-IE');
  Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
  Tts.setDefaultRate(0.4);
  Tts.setDefaultPitch(1);

  //! sending request to the backend

  const sendingRequestToBackend = async (prompt) => {
    try {
      prompt = "can we talk for a few moments";
      const body = {prompt};

     console.log("body: ",body)
      
      // const res = await responseFromModel({prompt: prompt, model: 'mistral'});

      // const res = await axios.post("http://192.168.208.216:3000/send",body,{
      //   headers:{
      //     "Content-Type":"application/json"
      //   }
      // })

      // const res = await axios.post("https://jsonplaceholder.typicode.com/posts",body,{
      //   headers:{
      //     "Content-Type":"application/json"
      //   }
      // })

      const res = await axios.get("https://192.168.208.216:3000/")
      // const res = await axios.get("https://192.168.208.216:3000/",body,{
      //   headers:{
      //         "Content-Type":"application/json"
      //       }
      // })

      console.log("response from the backend: ",res.data);

      // 192.168.208.216





      if (res.data.success) {
        setResponse(res.data.message);
        Tts.getInitStatus().then(() => {
          Tts.speak(res.data.message);
        });
      } else {
        setResponse('Some error occurred: ' + res.data.message);
        Tts.getInitStatus().then(() => {
          Tts.speak('Some Error Occurred');
        });
      }
    } catch (err) {
      console.error('Error(while sending the messages): ', err);
      Tts.getInitStatus().then(() => {
        Tts.speak('Some Error Occurred');
      });
      setResponse('Some error occurred: '+err.message);
    }
  };

  //! Response from the model
  // function responseFromModel(body) {
  //   return new Promise((res, rej) => {
  //     let respFromModel = '';

  //     axios
  //       .post('http://127.0.0.1:11434/api/generate', body, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         responseType: 'stream', // Set responseType to 'stream'
  //       })
  //       .then(response => {
  //         // Handle the stream
  //         response.data.on('data', chunk => {
  //           const lines = chunk.toString().split('\n');
  //           lines.forEach(line => {
  //             if (line) {
  //               // Ignore empty lines
  //               const json = JSON.parse(line);
  //               respFromModel += json.response;
  //               // console.log("respFromModel: ",respFromModel)
  //             }
  //           });
  //         });

  //         response.data.on('end', () => {
  //           console.log('Stream ended');
  //           // return respFromModel;
  //           res(respFromModel);
  //         });
  //       })
  //       .catch(err => {
  //         throw new Error(err.message);
  //       });
  //   });
  // }


  //!VOICE TO TEXT SECTION
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeachResults;
  }, []);

  const onSpeechStart = e => {
    console.log('from start: ', e);
    setStarted('✅');
  };

  const onSpeechEnd = e => {
    console.log('from end; ', e);
    setEnded('✅');
  };

  const onSpeachResults = e => {
    console.log('from results: ', e.value[0]);
    setResponse(e.value[0]);
    sendingRequestToBackend(e.value[0]);
  };

  const startRecognizing = async () => {
    try {
      setIsListening(!isListening);
      setResults([]);
      await Voice.start('en-US');
    } catch (error) {
      console.log(error);
    }
  };
  const stopRecognizing = async () => {
    try {
      setIsListening(!isListening);
      setResults([]);
      await Voice.stop();
      await Voice.destroy();
    } catch (error) {
      console.log(error);
    }

    // console.log(e.value[0])
  };

  //! Animation section
  function moveBall(decision) {
    if(decision){
      leftValue.setValue(0);
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.loop(
          
          Animated.timing(leftValue, {
            toValue: 380,
            duration: 5000,
            useNativeDriver: true,
          }),
        ),
      ]).start();
    }else{
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }

  }
  function fadeOutBall() {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  // Define color interpolation based on leftValue
  const ballColor = leftValue.interpolate({
    inputRange: [0, 380],
    outputRange: ['rgba(255, 0, 0, 1)', 'rgba(0, 0, 255, 1)'], // Red to blue
  });

  //! TIMER SECTION

  useEffect(() => {
    if (timerStarted) {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerStarted]);

  const handleStartTimer = () => {
    setTimerStarted(true);
  };

  const handleStopTimer = () => {
    setTimerStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.conversation}>

        {/* ***********************CONVERSATION SECTION SCREEN ********************** */}
        <Button
          title=""
          //   onPress={()=>navigation.navigate("Details",{productId:"86"})}
          onPress={() =>{
            navigation.push('Details', {
              productId: '86',
            })
            handleStopTimer()}
          }
          color="blue"
        />

        <View>
          <Text
            style={{
              color: 'white',
              position: 'absolute',
              bottom: 8,
              left: 14,
              fontStyle: 'italic',
            }}>
            CONVERSATION
          </Text>
        </View>
      </View>

      {/* ***********************PROGRESS SECTION SCREEN ********************** */}

      <View style={styles.ProgressContainer}>
        <View>
        </View>
        <Button
            title="PROGRESS"
            //   onPress={()=>navigation.navigate("Details",{productId:"86"})}
            onPress={() =>{
              navigation.push('ProgressScreen', {
                productId: '86',
              })
              handleStopTimer()}
            }
            color="blue"
          />
      </View>

        {/* <View>
          <Text
            style={{
              color: 'white',
              position: 'absolute',
              bottom: 8,
              left: 14,
              fontStyle: 'italic',
            }}>
            PROGRESS
          </Text>
        </View> */}

        

      {/* ************************* THREE LINE SECTION ******************************* */}
      <View style={styles.TopThreeLine}>
        <TouchableOpacity
          onPress={() => {
            setIsShowing(!isShowing);
          }}>
          <Image
            source={{
              uri: 'https://th.bing.com/th/id/OIP.PcJfrtbqP01UtsFpV6eNLAHaHa?w=151&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7https://th.bing.com/th/id/OIP.PcJfrtbqP01UtsFpV6eNLAHaHa?w=151&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
            }}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
        {isShowing && (
          <>
            <Toggle />
          </>
        )}
      </View>

      {/* ***************************************** ANIMATION SECTION ************************************************ */}
      <View style={styles.redBall}>
        <Animated.View
          style={[
            {
              width: 10,
              height: 10,
              borderRadius: 100 / 2,
              opacity,
              transform: [{translateX: leftValue}],
              backgroundColor: ballColor,
            },
          ]}
        />
        {/* <TouchableOpacity onPress={moveBall}>
          <Text>Move Me</Text>
        </TouchableOpacity> */}
      </View>

      {/* *****************************************TIMER SECTION ******************************************************* */}

      <View style={styles.Timer}>
      <Text style={styles.TimerText}>Duration: {seconds} Sec</Text>
      {/* <TouchableOpacity onPress={handleStartTimer}>
        <Text style={{position: 'absolute', top: 66}}>Click Me</Text>
      </TouchableOpacity> */}
      </View>

      <View>
        <Text style={{fontSize:18,color:'red '}}>
          {response}
        </Text>
      </View>

      {/* ***************************************MIC SECTION *************************************************************** */}

      <View style={styles.MicLogo}>
        <TouchableOpacity
          onPress={() => {
            // if (!isListening){ startRecognizing(); moveBall(true) ; handleStartTimer()}
            // else {stopRecognizing();moveBall(false)}
            console.log("I am sending the text to backend");
            sendingRequestToBackend("Axios Error");
          }}>
          <Image
            source={{
              uri: 'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/83-512.png',
            }}
            style={{width: 100, height: 100}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.MicText}>
        <Text>Tap here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  conversation: {
    width: 130,
    display: 'flex',
    top: 10,
    position: 'absolute',
    left: 240,
  },
  TopThreeLine: {
    margin: 2,
    padding: 2,
    width: 53,
    // backgroundColor:"red",
    height: 56,
  },

  MicText: {
    position: 'relative',
    top: 570,
    left: 170,
  },

  MicLogo: {
    position: 'relative',
    top: 410,
    left: 150,
    justifyContent: 'center',
    backgroundColor: 'pink',
    width: 110,
    borderRadius: 90,
    zIndex: 100,
  },

  redBall:{
    position:"absolute",
    top:580
  },

  Timer: {
    backgroundColor: 'blue',
    width: 290,
    height: 120,
    position: 'absolute',
    top: 300,
    left: 55,
    // borderRadius: 35,
    borderTopRightRadius:35,
    borderBottomLeftRadius:35,
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },

  TimerText: {
    position: 'absolute',
    left: 66,
    color: 'white',
    fontStyle: 'italic',
    fontSize:25
  },

  ProgressContainer:{
    width:120,
    height:74,
    position:"absolute",
    left:94,
    top:10,
    
  }
});
