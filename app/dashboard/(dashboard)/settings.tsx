import React, { useEffect } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import * as store from "expo-secure-store"
import colors from '../../utils/colors';
import CrossButton from '../../components/CrossButton';
import { useSession } from '../../hooks/Session';
import UserInfo from '../../components/UserInfo';
import { calc } from '../../utils/getResponsive';
import { router } from 'expo-router';
import { refreshData } from '../../api/user';

export default function Search() {
    const userData = useSession()
    const theme = useColorScheme()
    useEffect(() => {
        refreshData()
    }, [])
    function logout() {
        store.deleteItemAsync("username")
        store.deleteItemAsync("points")
        store.deleteItemAsync("uploads")
        store.deleteItemAsync("token")
        router.replace("/")
    }
    return (
        <View style={[styles.container, theme === "dark" && { backgroundColor: "rgba(0,0,0,0.85)" }]}>
            <View style={[styles.topCont, theme === "dark" && { backgroundColor: colors.black }]}>
                <UserInfo color='secondary' icon='user' text={`Username: ${userData.username}`} />
                <UserInfo color='secondary' icon='money' text={`Points: ${userData.points}`} />
                <UserInfo color='secondary' icon='upload' text={`Uploads: ${userData.uploads}`} />
            </View>
            <View style={styles.secondCont}>
                <CrossButton title='Logout' type='secondary' onPress={logout} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",

        // justifyContent: 'center'
    },
    topCont: {
        backgroundColor: colors.white,
        width: "80%",
        flex: 0.2,
        marginTop: "10%",
        borderRadius: 10,
        paddingTop: "3%",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: calc(10, "width"),
        justifyContent: "center",
        alignItems: "center"
    },
    secondCont: {
        width: "60%"
    }
});