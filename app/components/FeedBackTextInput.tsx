import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native';
import colors from '../utils/colors';
import { calc } from '../utils/getResponsive';

export default function FeedBackTextInput() {
    return (
        <View style={styles.container}>
            <TextInput />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.white,
        borderColor: colors.light,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: calc(20, "width"),
        height: 30,
        minHeight: calc(40, "height"),
        // width: "100%"
    }
});