import { StyleSheet, Dimensions, Text, View } from 'react-native';
import React from 'react';
import IconAI from 'react-native-vector-icons/MaterialCommunityIcons';


const screenWidth = Dimensions.get('screen').width;

export default function AiText({message}) {
    const aiIcon = <IconAI name="robot" size={15} color="black" style={styles.iconStyle}/>;
    // const userIcon = <IconUser name="user" size={15} color="black" style={styles.iconStyle}/>;
    const [aiMessage , setAiMessage] = React.useState<string>('');

    React.useEffect(()=>{
        setAiMessage(message);
    }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.chatContainer}>
                <Text style={styles.iconStyle}>{aiIcon}</Text>
                <Text style={styles.aiText}>{aiMessage}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    backgroundColor: '#3a86ff',
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    margin: 13,
    maxWidth: screenWidth * (3 / 4),
    height:'auto',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexGrow:1,
    paddingVertical:6,
},
aiText: {
    color: 'black',
    fontFamily: 'monospace',
    fontSize: 15,
    maxWidth: '80%', // Adjust as needed
    height: 'auto', // Allows for dynamic height
},
iconStyle: {
    alignSelf: 'flex-start',
    marginRight: 2,
    paddingHorizontal: 8,
    paddingTop:3
},
chatContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 7,
}
})
