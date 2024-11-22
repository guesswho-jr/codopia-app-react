import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ProjectSeparator() {
    return (
        <View style={styles.container}></View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 3,
        width: "100%",
    }
});