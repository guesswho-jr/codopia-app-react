import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import UploadForm from '../../../components/UploadForm';

export default function modal() {
    const theme = useColorScheme()
    return (
        <View style={[styles.container, theme === "dark" && { backgroundColor: "rgba(0,0,0,0.85)", borderColor: "rgba(0,0,0,0.85)" }]}>
            <UploadForm />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});