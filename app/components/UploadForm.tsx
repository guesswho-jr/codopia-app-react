import React, { useState } from 'react';
import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"

import CodText from './CodText';
import AppTextInput from './AppTextInput';
import colors from '../utils/colors';
import { calc } from '../utils/getResponsive';
import CrossButton from './CrossButton';
import { router } from 'expo-router';

export default function UploadForm() {
    const [name, setName] = useState<string>("")
    const [desc, setDesc] = useState<string>("")
    const [fileName, setFileName] = useState<string>("")
    const [error, setError] = useState(false)
    const setData = async () => {
        if (!fileName.match(/\w+\.\w+/)) {
            setError(true)
        }
        if (name === "" ||
            desc === ""
        ) {
            setError(true)
            return
        }
        if ((await AsyncStorage.getItem("name") || await AsyncStorage.getItem("desc") || await AsyncStorage.getItem("main_file"))) {
            AsyncStorage.clear()
        }
        AsyncStorage.setItem('name', name)
        AsyncStorage.setItem('desc', desc)
        AsyncStorage.setItem("main_file", fileName)
        router.push("/dashboard/create-project/")
    }
    const theme = useColorScheme()
    return (
        <View style={styles.container}>
            {error && <CodText>Fill out all the fields please.</CodText>}
            <CodText style={[styles.title]}>Start your project</CodText>
            <CodText style={[styles.subTitle]}>Max: 5MB</CodText>
            <AppTextInput icon='pen-plus' placeholder='Project name ' type='name' onChange={text => setName(text)} style={{}} />
            <CodText style={[styles.caption]}>Caption</CodText>
            <TextInput style={[styles.input, theme === "dark" && { backgroundColor: colors.black, borderColor: colors.black, color: colors.white }]} onChangeText={text => setDesc(text)} />
            <CodText>Enter the entry document with extension eg main.py</CodText>
            <TextInput style={[styles.input, theme === "dark" && { backgroundColor: colors.black, borderColor: colors.black, color: colors.white }]} onChangeText={text => setFileName(text)} placeholder='Enter the main file' />
            <CrossButton title='Start' onPress={setData} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        // paddingTop: calc(100, "height"),
        width: "80%",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.light,
        height: "100%",
        padding: calc(50, "width")
        // flex: 1
    },
    input: {
        backgroundColor: colors.white,
        borderColor: colors.light,
        borderWidth: 2,
        borderRadius: 10,
        width: "100%",
        paddingLeft: calc(20, "width"),
        height: "auto",
        minHeight: calc(100, "height")
    },
    title: {
        fontSize: calc(39, "height")
    },
    subTitle: {

    },
    name: {
        flexDirection: "row"
    },
    caption: {
        flexDirection: "row"
    }
});