import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons"
import CodText from './CodText';
import colors from '../utils/colors';
import { calc } from '../utils/getResponsive';

interface info {
    icon: keyof typeof FontAwesome.glyphMap,
    text: string,
    color: keyof typeof colors
}
export default function UserInfo({ icon, text, color }: info) {
    const theme = useColorScheme()
    return (
        <View style={styles.container}>
            <View style={[styles.icon, { backgroundColor: colors[color] }]}>
                <FontAwesome name={icon} size={calc(50, "height")} color={colors.white} />
            </View>
            <CodText style={[{ fontSize: calc(15, "height") }, theme === "dark" && { color: colors.white }]}>{text}</CodText>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        // width: calc(50, "width"),
        // height: calc(50, "height"),
        padding: "2%",
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        width: calc(100, "width"),
        height: calc(100, "width"),
        borderRadius: calc(50, "width"),
        justifyContent: "center",
        alignItems: "center",
    }
});