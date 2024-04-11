import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'


import {NativeStackScreenProps} from "@react-navigation/native-stack"
import { RootStackParamList } from '../App'

//for the data we are accepting from there that is of product id
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from "@react-navigation/native-stack"

//type safety
type DetailsProps = NativeStackScreenProps<RootStackParamList,'Details'>


export default function Details({route}:DetailsProps) {//!here we are mentioning the type

  const {productId}=route.params
  const navigation=useNavigation<NativeStackNavigationProp <RootStackParamList>>()
  return (
    <View style={styles.container}>
      <Text style={styles.smallcolor}>Details:{productId}</Text>
      <Button 
      title="go to home"
      onPress={()=> navigation.navigate("Home")}
      // onPress={()=> navigation.goBack()}
      />

      <Button 
      title="go to first screen"
      
      // onPress={()=> navigation.pop(2)}
      onPress={()=>navigation.popToTop()}
      />

      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },
    smallcolor:{
        color:"#000000"
    }
})