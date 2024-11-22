import React from "react";
import { Text } from "react-native";
// import { useFonts } from "expo-font";

function CrossText({ text, style, onPress }: { text: string, style?: object, onPress?: any }) {

    if (typeof style === undefined || null) style = {}
    return (<Text style={[{
        // fontFamily: "Nexa"
    }, style]} onPress={onPress}>{text}</Text>)
}

export default CrossText;