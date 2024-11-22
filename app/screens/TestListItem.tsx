import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import CodText from '../components/CodText';
import { Link } from 'expo-router';
import colors from '../utils/colors';
import { calc } from '../utils/getResponsive';


export default function Test({ name, prepBy, difficulity, Href, subjectName }: { name: string, prepBy: string, difficulity: string, Href: string, subjectName: string }) {
    const theme = useColorScheme()
    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.container, theme === "dark" && { backgroundColor: "rgba(0, 0, 0, 0.85)" }]}>
                <CodText style={[theme === "dark" && { color: colors.white }]}>Subject: {name}</CodText>
                <CodText style={[theme === "dark" && { color: colors.white }]}>By {prepBy}</CodText>
                <CodText style={[theme === "dark" && { color: colors.white }]}>Type: {difficulity}</CodText>
                <Link push href={{
                    pathname: Href,
                    params: { subject: subjectName }
                }} style={{ color: colors.primary }}>Take the test &gt;</Link>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        gap: calc(30, 'width'),
        marginLeft: calc(30, "width"),
        padding: calc(10, "width"),
        width: "90%",
        borderRadius: calc(10, "width")
    }
});