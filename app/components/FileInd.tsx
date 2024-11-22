import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import CodText from './CodText';
import { calc } from '../utils/getResponsive';
import colors from '../utils/colors';
import { TouchableWithoutFeedback } from 'react-native';

export default function CodFile({ file_name, onPressed }: { file_name: string, onPressed: () => void }) {
    const theme = useColorScheme()
    return (
        <TouchableWithoutFeedback onPress={onPressed}>
            <View style={[styles.container, theme === "dark" && { backgroundColor: "rgba(0,0,0,0.85)" }]}>
                <CodText>{file_name}</CodText>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: calc(20, "width"),
        backgroundColor: colors.white
    }
});