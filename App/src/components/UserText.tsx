import { StyleSheet, Dimensions, Text, View } from 'react-native';
import React from 'react';
import IconAI from 'react-native-vector-icons/Ionicons';
import IconUser from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('screen').width;

export default function AiText({improvedMessage , clientMessage}) {
    const sparkleIcon = <IconAI name="sparkles" size={15} color="black" style={styles.iconStyle}/>;
    const userIcon = <IconUser name="user" size={15} color="black" style={styles.iconStyle}/>;
    const [userMessage , setUserMessage] = React.useState<string>('');
    const [ImprovedMessage , setImprovedMessage] = React.useState<string>('')

    React.useEffect(()=>{
        setUserMessage(clientMessage);
        setImprovedMessage(improvedMessage);
    }, [])
    
    return (
        <View style={styles.container}>
            <View style={styles.chatContainer}>
                <Text style={styles.iconStyle}>{userIcon}</Text>
                <Text style={styles.aiText}>{userMessage}</Text>
            </View>
            <View style={styles.chatContainer}>
                <Text style={styles.iconStyle}>{sparkleIcon}</Text>
                <Text style={styles.aiText}>{ImprovedMessage}</Text>
            </View>            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-end',
        backgroundColor: '#ced4da',
        borderRadius: 12,
        borderBottomRightRadius: 0,
        margin: 13,
        maxWidth: screenWidth * (3 / 4),
        height:'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexGrow:1,
        paddingVertical:6,
    },
    aiText: {
        color: 'black',
        fontFamily: 'monospace',
        fontSize: 15,
        width: '80%', // Adjust as needed
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
