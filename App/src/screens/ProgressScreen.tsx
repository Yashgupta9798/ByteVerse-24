import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('screen').width;

import {ScrollView, StatusBar, useColorScheme, Dimensions} from 'react-native';

import {LineChart} from 'react-native-chart-kit';

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
type ProgressScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ProgressScreen'
>;

export default function ProgressScreen({route}: ProgressScreenProps) {
  //!here we are mentioning the type

  const {productId} = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const colorScheme = useColorScheme();
  const dayProgress = 67;
  const weekProgress = 86;
  const currentProgress = 99;

  const [report, setReport] = React.useState<string>('Remarks Here');
  const remarks = {
    20: ['Try to improve it 😇', 'It should be better'],
    40: [
      'Nice to see that you are improving but still you should work hard 💪',
      'Try to analyse where you lack 📈',
      'Practice more you can do it 🗣️',
    ],
    70: [
      'You are almost there 😎!!! ',
      'Success is just ahead of you Grab it 🚀!!!',
    ],
    100: ['Hurrah! You did it 🏆'],
  };

  const currentReport = 44;

  const remarkProvider = currentProgress => {
    if (currentProgress <= 20) {
      const index = Math.floor(Math.random() * remarks[20].length);
      setReport(remarks[20][index]);
      return;
    } else if (currentProgress <= 40) {
      const index = Math.floor(Math.random() * remarks[40].length);
      setReport(remarks[40][index]);
      return;
    } else if (currentProgress <= 70) {
      const index = Math.floor(Math.random() * remarks[70].length);
      setReport(remarks[70][index]);
      return;
    } else {
      const index = Math.floor(Math.random() * remarks[100].length);
      setReport(remarks[100][index]);
      return;
    }
  };

  const chartConfig = {
    backgroundColor: '#3a86ff',
    backgroundGradientFrom: '#3a86ff',
    backgroundGradientTo: '#3a86ff',
    decimalPlaces: 2, //
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    stroke: '#ffa726',
  };
  const data = {
    labels: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    datasets: [
      {
        data: [20, 39, 28, 80, 190, 43, 40], // week correction score
        color: (opacity = 1) => `rgba(255, 239, 39 , ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Week Progress'], // optional
  };

  React.useEffect(() => {
    remarkProvider(70);
  }, []);

  return (
    <ScrollView>
      {/* *********not working********* */}
      {/* <StatusBar
      barStyle={"dark-content"}
      backgroundColor={"#ffffff"}
      /> */}
      <View style={styles.headingContainer}>
        <View style={styles.heading}>
          <Text style={styles.headingText}>Progress Tracking</Text>
        </View>
      </View>

      <View>
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>

      <View style={styles.btnContainer}>
        <View style={styles.progressBtnContainer}>
          <Text style={styles.progressBtnText}>
            Day Progress: {dayProgress}
          </Text>
        </View>
        <View style={styles.progressBtnContainer}>
          <Text style={styles.progressBtnText}>
            Week Progress: {weekProgress}
          </Text>
        </View>
      </View>

      <View style={{width: screenWidth, alignItems: 'center'}}>
        <View style={styles.progressBtnContainer}>
          <Text style={styles.progressBtnText}>
            Current Progress:{''}
            {currentProgress}
          </Text>
        </View>
      </View>

      <View style={{width: screenWidth, alignItems: 'center'}}>
        <View style={styles.progressBtnContainer}>
          <Text style={styles.progressBtnText}>Remarks</Text>
        </View>
      </View>

      <View style={styles.remarkContainer}>
        <Text style={{color: 'white', fontSize: 18}}>{report}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  progressBtnContainer: {
    width: 150,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 12,
    justifyContent: 'center', // Centers children horizontally
    alignItems: 'center', // Centers children vertically
    marginVertical: 22,
  },
  progressBtnText: {
    color: 'white',
    width: 'auto',
    height: 'auto',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  remarkContainer: {
    backgroundColor: '#4895ef',
    alignContent: 'center',
    alignSelf: 'center',
    padding: 12,
    borderRadius: 12,
  },
});








// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   StatusBar,
//   View,
//   useColorScheme,
//   Dimensions,
// } from 'react-native';
// import React from 'react'
// import {
//   LineChart,
// } from "react-native-chart-kit";

// const screenWidth = Dimensions.get('screen').width;

// // class

// export default function ProgressScreen() {
//   const colorScheme = useColorScheme();
//   const dayProgress = 67;
//   const weekProgress = 86;
//   const currentProgress = 99;

//   const [report , setReport] = React.useState<string>('Remarks Here');
//   const remarks = {
//     20:["Try to improve it 😇", "It should be better"],
//     40:["Nice to see that you are improving but still you should work hard 💪", "Try to analyse where you lack 📈","Practice more you can do it 🗣️"],
//     70:["You are almost there 😎!!! " , "Success is just ahead of you Grab it 🚀!!!"],
//     100:["Hurrah! You did it 🏆"]
//   }

//   const currentReport = 44;

//   const remarkProvider = (currentProgress)=>{

//     if(currentProgress <= 20){
//       const index=Math.floor(Math.random()* remarks[20].length);
//         setReport(remarks[20][index]);
//         return;
//     } else if(currentProgress <= 40){
//       const index=Math.floor(Math.random()* remarks[40].length);
//       setReport(remarks[40][index]);
//       return;
//     } else if(currentProgress <= 70){
//       const index=Math.floor(Math.random()* remarks[70].length);
//       setReport(remarks[70][index]);
//       return;
//     } else {
//       const index=Math.floor(Math.random()* remarks[100].length);
//       setReport(remarks[100][index]);
//       return;
//     }
//   }

//     const chartConfig = {
//       backgroundColor: "#3a86ff",
//       backgroundGradientFrom: "#3a86ff",
//       backgroundGradientTo: "#3a86ff",
//       decimalPlaces: 2, //
//       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//       labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//       style: {
//         borderRadius: 16
//       },
//         stroke: "#ffa726"
//       }
//       const data = {
//         labels: ["M", "T", "W", "Th", "F", "Sa", "Su"],
//         datasets: [
//           {
//             data: [20, 39, 28, 80, 190, 43,40], // week correction score
//             color: (opacity = 1) => `rgba(255, 239, 39 , ${opacity})`, // optional
//             strokeWidth: 2 // optional
//           }
//         ],
//         legend: ["Week Progress"] // optional
//       };

//       // React.useEffect(()=>{
//       //   remarkProvider(70);
//       // },[])

//   return (
//     <ScrollView>
//       {/* *********not working********* */}
//       {/* <StatusBar
//       barStyle={"dark-content"}
//       backgroundColor={"#ffffff"}
//       /> */}
//       <View style={styles.headingContainer}>
//         <View style={styles.heading}>
//           <Text style={styles.headingText}>Progress Tracking</Text>
//         </View>
//       </View>

//       <View>
//         <LineChart
//           data={data}
//           width={screenWidth}
//           height={220}
//           chartConfig={chartConfig}
//           bezier
//         />
//       </View>

//      <View style={styles.btnContainer}>
//      <View style={styles.progressBtnContainer}>
//           <Text style={styles.progressBtnText}>Day Progress: {dayProgress}</Text>
//       </View>
//       <View style={styles.progressBtnContainer}>
//           <Text style={styles.progressBtnText}>Week Progress: {weekProgress}</Text>
//       </View>
//      </View>

//      <View style={{ width:screenWidth, alignItems:'center'}}>
//    <View style={styles.progressBtnContainer}>
//           <Text style={styles.progressBtnText}>Current Progress:{''}{currentProgress}</Text>
//       </View>
//    </View>

//    <View style={{ width:screenWidth, alignItems:'center'}}>
//    <View style={styles.progressBtnContainer}>
//           <Text style={styles.progressBtnText}>Remarks</Text>
//       </View>
//    </View>

//    <View style={styles.remarkContainer}>
//     <Text style={{color:'white', fontSize:18}}>{report}</Text>
//    </View>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   heading: {
//     width: screenWidth*(19/20),
//     height: 50,
//     backgroundColor: 'blue',
//     borderRadius: 12,
//     justifyContent: 'center', // Centers children horizontally
//     alignItems: 'center', // Centers children vertically
//     marginVertical:22,

//    },

// headingText: {
// color: 'white',
// width: 'auto',
// height: 'auto',
// textAlign: 'center',
// textDecorationLine:'underline'
// },
// headingContainer: {
// height: 'auto',
// width: screenWidth,
// alignItems: 'center', // Centers children horizontally
// justifyContent: 'center', // Centers children vertically
// },
// progressBtnContainer:{
//   width: 150,
//   height: 50,
//   backgroundColor: 'blue',
//   borderRadius: 12,
//   justifyContent: 'center', // Centers children horizontally
//   alignItems: 'center', // Centers children vertically
//   marginVertical:22,
// },
// progressBtnText:{
//   color: 'white',
//   width: 'auto',
//   height: 'auto',
//   textAlign: 'center',
//   textDecorationLine:'underline'
// },
// btnContainer:{
//   flexDirection:'row',
//   justifyContent:'space-evenly'
// },
// remarkContainer:{
//   backgroundColor:'#4895ef',
//   alignContent:'center',
//  alignSelf:'center',
//  padding:12,
//  borderRadius:12
// }
// })
