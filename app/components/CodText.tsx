import React from 'react';
import { StyleSheet, Text, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../utils/colors';
export default function CodText({ children, style = {}, numberOfLines }: { children: React.ReactNode, style?: object, numberOfLines?: number }) {
    const [fontsLoaded] = useFonts({
        "Nexa": require("../fonts/Nexa.otf")
    })
    const theme = useColorScheme()
    return (
        <>
            {fontsLoaded && <Text style={[styles.container, style, theme === "dark" && { color: colors.white }]} numberOfLines={numberOfLines}>
                {children}
            </Text>}
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        fontFamily: "Nexa"
    }
});