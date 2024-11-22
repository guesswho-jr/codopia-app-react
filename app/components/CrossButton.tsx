import React from 'react';
import { TouchableNativeFeedback, TouchableHighlight, Platform, View, StyleSheet, Text } from 'react-native';
import colors from '../utils/colors';

function CrossButton({ title, style, onPress, type = "primary" }: { title: string, style?: object, onPress?: () => void, type?: keyof typeof colors }) {
    if (typeof style === undefined || null) style = {}
    return (
        Platform.OS === "android" ? (
            <TouchableNativeFeedback onPress={onPress}>
                <View style={[styles.button, { backgroundColor: colors[type] }, style]}>
                    <Text style={[styles.text]}>{title}</Text>
                </View>
            </TouchableNativeFeedback>
        )
            :
            (
                <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
                    <View style={[styles.button, style, { backgroundColor: colors[type] }]}>
                        <Text style={[styles.text]}>{title}</Text>
                    </View>
                </TouchableHighlight >
            )
    );
}
const styles = StyleSheet.create({
    button: {
        width: "100%",
        padding: 15,
        alignItems: "center",

        marginTop: 20
    },
    text: {
        textTransform: "uppercase",
        color: colors.white
    }
})
export default CrossButton;