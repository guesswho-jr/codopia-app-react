import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'expo-router';
import TestPage from '../screens/TestPage';
import colors from '../utils/colors';

export default function Page() {
    const { subject } = useLocalSearchParams()
    const theme = useColorScheme()
    return (
        <View style={[styles.container, theme === "dark" && { backgroundColor: colors.darkTheme }]}>
            <Stack.Screen
                options={{
                    title: `${subject} - test`,
                    headerShown: true
                }}

            />

            <TestPage subjectId={subject as string} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // width: calc(20, 'width'),
    }
});