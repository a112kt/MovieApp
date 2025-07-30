import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { useTheme } from '@react-navigation/native';


const {width,height} = Dimensions.get("window")
export default function Loading() {
  return (
    <View style={{width,height}} className="absolute flex-row justify-center items-center" >
      <Progress.CircleSnail thickness={10}  size={120} color={'yellow'}/>
    </View>
  )
}