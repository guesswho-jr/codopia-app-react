import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import colors from '../../utils/colors';
import { Dimensions, StyleSheet, useColorScheme, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import { calc } from '../../utils/getResponsive';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function TabLayout() {
    const theme = useColorScheme()
    const client = new QueryClient()
    return (
        <QueryClientProvider client={client}>
            <Tabs screenOptions={{ tabBarActiveTintColor: colors.secondary, headerStyle: theme === 'light' ? styles.header : styles.headerDark, tabBarStyle: styles.tabCont }} >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: '',
                        tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} style={styles.icon} />,

                        headerTitle: "Codopia",
                        headerTitleStyle: theme === "light" ? styles.title : styles.titleDark,
                        tabBarStyle: theme === "light" ? styles.tabBar : styles.tabBarDark,
                        headerStatusBarHeight: calc(10, "height")
                    }}
                />
                <Tabs.Screen
                    name="test"
                    options={{
                        title: '',
                        tabBarIcon: ({ color }) => <FontAwesome name="book" color={color} style={styles.icon} />,
                        tabBarStyle: theme === "light" ? styles.tabBar : styles.tabBarDark,
                        headerTitle: "Test",
                        headerStatusBarHeight: calc(5, "height")
                    }}
                />
                <Tabs.Screen
                    name="upload"
                    options={{
                        tabBarStyle: theme === "light" ? styles.tabBar : styles.tabBarDark,
                        headerStatusBarHeight: calc(5, "height"),
                        headerTitle: "Upload",
                        title: '',
                        tabBarIcon: () => (
                            <View style={styles.upload}>
                                <FontAwesome name="pencil" color={colors.white} style={styles.icon} />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen
                    name="fdbk"
                    options={{
                        tabBarStyle: theme === "light" ? styles.tabBar : styles.tabBarDark,
                        headerStatusBarHeight: calc(5, "height"),
                        title: '',
                        headerTitle: "Write us",
                        tabBarIcon: ({ color }) => <Ionicons name='newspaper-outline' color={color} style={styles.icon} />,
                    }}
                />
                <Tabs.Screen

                    name="settings"
                    options={{
                        tabBarStyle: theme === "light" ? styles.tabBar : styles.tabBarDark,
                        headerStatusBarHeight: calc(5, "height"),
                        title: '',
                        headerTitle: "Personal Info",
                        tabBarIcon: ({ color }) => <FontAwesome name="cog" color={color} style={styles.icon} />,
                    }}
                />
            </Tabs>
        </QueryClientProvider>
    );
}

const styles = StyleSheet.create({
    icon: {
        // width: "100%",
        fontSize: calc(27, "height")
    },
    header: {
        height: calc(60, "height"),
        // width: 20,
        borderBottomWidth: 2,
        borderBottomColor: "rgba(0,0,0,0.1)",

    },
    headerDark: {
        height: calc(60, "height"),
        // width: 20,
        borderBottomWidth: 2,
        borderBottomColor: "rgba(0,0,0,0.1)",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
    },
    title: {
        position: "absolute",
        top: 0,
        // alignSelf: "center",
        paddingTop: 0,
        textTransform: "uppercase",
    },
    titleDark: {
        position: "absolute",
        top: 0,
        // alignSelf: "center",
        paddingTop: 0,
        textTransform: "uppercase",
        color: colors.white
    },
    tabCont: {
        position: 'absolute',
    },
    headerBg: {
        color: colors.white
    },
    tabs: {
        justifyContent: "flex-end",
    },
    upload: {
        backgroundColor: colors.secondary,
        color: colors.white,
        // width: Dimensions.get("screen").width / 12.87142857142857,
        // height: Dimensions.get("screen").width / 12.87142857142857,
        borderRadius: calc(70, "width"),
        justifyContent: "center",
        alignItems: "center",
        width: calc(70, "width"),
        height: calc(70, "width"),
        bottom: Dimensions.get("screen").width / 30
    },
    tabBar: {
        height: calc(80, "height"),
        zIndex: 99999999999,
        // width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",

    },
    tabBarDark: {
        height: calc(80, "height"),
        zIndex: 99999999999,
        // width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "rgba(0, 0, 0, 0.85)"
    }
})