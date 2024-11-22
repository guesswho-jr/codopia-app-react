import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import CrossButton from '../../components/CrossButton';
import colors from '../../utils/colors';
import { calc } from '../../utils/getResponsive';
import CodText from '../../components/CodText';
import { signUp, signUpActions } from '../../api/post_requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { login } from '../../api/project';

export default function Page() {

    const [signUpData, setSignUpData] = useState<signUp>()
    const checkData = async () => {

        const signUpData = await AsyncStorage.getItem("signUpData")

        if (!signUpData) {
            router.push("..")
            return
        }

        // setSignUpData({ bio: "", cpassword: "", email: "", full_name: "", password: "", username: "" })
        setSignUpData(JSON.parse(signUpData))
    }
    useEffect(() => {
        checkData()
    }, [])
    const theme = useColorScheme()

    const ref1 = useRef<TextInput>(null)
    const ref2 = useRef<TextInput>(null)
    const ref3 = useRef<TextInput>(null)
    const ref4 = useRef<TextInput>(null)
    const ref5 = useRef<TextInput>(null)
    const ref6 = useRef<TextInput>(null)

    const [data, setData] = useState({ one: "", two: "", three: "", four: "", five: "", six: "" })
    const handleSubmit = async () => {
        let final = ""
        for (const key in data) {
            final += data[key as keyof typeof data]
        }
        if (!signUpData) {
            router.push("..")
            return
        }

        const response = await signUpActions(signUpData, "check_code", parseInt(final));
        if (typeof response == "boolean") { router.push(".."); return }
        if (response.success) {
            const { username, password } = signUpData;
            let resp = await login({ username, password })
            if (resp) {
                router.replace("/dashboard/")
                return
            }
            else {
                router.push("..")
                return
            }
        }
        else if (!response.success) {
            alert(response.reason)
        }
        else {
            alert("Unknown error occured")
        }
    }

    return (
        <View style={[styles.container, theme === 'dark' && { backgroundColor: colors.darkTheme }]}>
            <View style={[styles.form, { backgroundColor: colors.black }]}>
                <CodText style={{ fontSize: calc(25, "height"), alignSelf: "center", paddingBottom: calc(30, "height"), color: colors.white }}>Enter the code we emailed you</CodText>
                <View style={styles.inputs}>
                    <TextInput style={[styles.input, theme === "dark" && { backgroundColor: colors.black }]} maxLength={1}
                        keyboardType='number-pad' ref={ref1} onChangeText={text => { ref2.current?.focus(); setData(prev => { return { ...prev, one: text } }) }}
                    />
                    <TextInput style={[styles.input, theme === "dark" && { backgroundColor: colors.black }]} maxLength={1}
                        keyboardType='number-pad' ref={ref2} onChangeText={text => { ref3.current?.focus(); setData(prev => { return { ...prev, two: text } }) }}
                    />
                    <TextInput style={[styles.input, theme === "dark" && { backgroundColor: colors.black }]} maxLength={1}
                        keyboardType='number-pad' ref={ref3} onChangeText={text => { ref4.current?.focus(); setData(prev => { return { ...prev, three: text } }) }}
                    />
                    <TextInput style={[styles.input, theme === "dark" && { backgroundColor: colors.black }]} maxLength={1}
                        keyboardType='number-pad' ref={ref4} onChangeText={text => { ref5.current?.focus(); setData(prev => { return { ...prev, four: text } }) }}
                    />
                    <TextInput style={[styles.input, theme === "dark" && { backgroundColor: colors.black }]} maxLength={1}
                        keyboardType='number-pad' ref={ref5} onChangeText={text => { ref6.current?.focus(); setData(prev => { return { ...prev, five: text } }) }}
                    />
                    <TextInput style={[styles.input, theme === "dark" && { backgroundColor: colors.black }]} maxLength={1}
                        keyboardType='number-pad' ref={ref6} onChangeText={text => {
                            setData(prev => { return { ...prev, six: text } })
                        }}
                    />
                </View>
                <CrossButton title='Submit' onPress={handleSubmit} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: calc(50, "width"),
        width: "80%"
    },
    input: {
        borderRadius: 5,
        width: calc(80, 'width'),
        height: calc(100, "height"),
        borderWidth: 2,
        borderColor: colors.medium,
        color: colors.white,
        fontSize: calc(20, "height"),
        padding: calc(30, "width")
    },

    inputs: {
        flexDirection: "row",
        gap: calc(15, "width"),
        alignSelf: "center",
        paddingBottom: calc(50, "height")
    }
});