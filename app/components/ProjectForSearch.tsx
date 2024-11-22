import React from 'react';
import { StyleSheet, View } from 'react-native';
import CodText from './CodText';
import { calc } from '../utils/getResponsive';
import colors from '../utils/colors';

export default function ProjectForSearch({ query, name, desc }: { query: string, name: string, desc: string }) {
    return (
        <>
            {name.toLowerCase().includes(query.toLowerCase()) && (
                <View style={styles.container}>
                    <CodText>{name}</CodText>
                    <CodText>{desc}</CodText>
                </View>
            )}
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        // width: calc(200, "width"),
        height: calc(200, "height"),
        backgroundColor: colors.white,
        padding: calc(30, "width"),
        borderRadius: 30, //500
        width: calc(200, "width"),
        margin: calc(20, "width"),
    }
});