import React from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import colors from '../utils/colors';

export default function SearchBar() {
    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} placeholder='Search' />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("screen").width / 28.84,
        borderColor: colors.mediumLight,
        borderWidth: 1
        // backgroundColor: colors.white,
    },
    textInput: {
        flex: 1,
        height: 20,
        backgroundColor: colors.white
    }
});