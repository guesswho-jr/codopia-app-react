import { StatusBar } from 'expo-status-bar';
import { StyleSheet, useColorScheme, View } from 'react-native';
import WelcomePage from './screens/WelcomePage';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function Page() {
    const client = new QueryClient()
    const theme = useColorScheme()


    return (
        <QueryClientProvider client={client}>
            <View style={[styles.container, { backgroundColor: theme === "light" ? "rgba(0,0,0,0.1)" : "#121212" }]}>
                <View style={styles.textOpener}>
                    <WelcomePage />
                </View>
                <StatusBar style="auto" />
            </View>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
        // backgroundColor: "rgba(0,0,0,0.1)",
    },
    textOpener: {
        marginTop: 100,

    }
});
