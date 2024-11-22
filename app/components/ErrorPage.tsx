import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import CodText from './CodText';
import CrossButton from './CrossButton';
import colors from '../utils/colors';
import { calc } from '../utils/getResponsive';

export default function ErrorPage({ title, body, retry }: { title: string, body: string, retry: () => void }) {
    const theme = useColorScheme()
    return (
        <View style={[styles.container, theme === "dark" && { backgroundColor: colors.black }]}>
            <CodText style={[styles.topText, theme === "dark" && { color: colors.white }]}>{title} </CodText>
            <CodText style={[styles.bottomText, theme === "dark" && { color: colors.white }]}>{body}</CodText>
            <View style={{ width: calc(200, "width") }}>
                <CrossButton title='Retry ' type='secondary' onPress={retry} style={styles.retryButton} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        padding: calc(50, "width"),
        // borderRadius: 10,
        alignItems: 'center',
        flex: 1,
        justifyContent: "center"
    },
    topText: {
        fontSize: calc(20, "height"),
        fontWeight: "bold"
    },
    bottomText: {},
    retryButton: {
    }
});