import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native';
import { router } from 'expo-router';
import { calc } from '../../utils/getResponsive';
import CodText from '../../components/CodText';
import SyntaxHighlighter from 'react-native-syntax-highlighter'
import { returnFileType } from '../../utils/file';
import { atomDark, dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CrossButton from '../../components/CrossButton';
import { useSession } from '../../hooks/Session';
import { save } from '../../api/post_requests';
import ErrorPage from '../../components/ErrorPage';
import colors from '../../utils/colors';


export default function index() {
    const theme = useColorScheme()
    const [data, setData] = useState<{ name: string | null, desc: string | null, main_file: string | null }>({
        name: "",
        desc: "",
        main_file: ""
    })
    const { user_id } = useSession()
    const [code, setCode] = useState("")
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const editorRef = useRef<TextInput>(null)
    useEffect(() => {
        editorRef.current?.focus()
    }, [])


    const populate = async () => {
        if (!await AsyncStorage.multiGet(["name", "desc"])) {
            router.replace("/dashboard/(dashboard)/upload")
            return
        }
        setData({
            name: await AsyncStorage.getItem("name"),
            desc: await AsyncStorage.getItem("desc"),
            main_file: await AsyncStorage.getItem("main_file")
        })
    }

    useEffect(() => {
        populate()
        if (data.name == null || data.desc == null) {
            router.replace("/dashboard/")
        }
    }, [])
    const saveFile = () => {
        if (!data.name || !data.desc || !data.main_file) {

            setError(true)
            return
        }
        setProgress(0.01)
        save(data.name, code, data.desc, user_id.toString(), data.main_file, setError, setProgress, setSuccess)
    }

    if (error) return <ErrorPage body='Error while uploading your file' retry={saveFile} title='Whoops!' />
    return (
        <View style={[styles.container, theme === "dark" && { backgroundColor: "rgba(0,0,0,0.85)" }]}>
            <View style={styles.topInfo}>
                <CodText>{success && "Success!!"}</CodText>
                <CodText>File: {data.main_file} (this feature is still under development)</CodText>
                <View style={{ flexDirection: "row", gap: calc(10, "width"), flex: 0.4 }}>
                    <CrossButton title='Save' onPress={saveFile} />
                    <CrossButton title='Discard' type='wrong' onPress={() => router.replace("/dashboard/")} />
                    <CodText>{progress ? `${progress * 100}%` : ""}</CodText>
                </View>
            </View>
            <TextInput onChangeText={text => setCode(text)} ref={editorRef} style={[styles.input, {
                fontSize: calc(15, "height"),
                top: `${5}%`
            }]} multiline textAlignVertical='top' cursorColor={colors.primary} scrollEnabled autoFocus />
            <SyntaxHighlighter
                style={dracula}
                customStyle={{ padding: 0, margin: 0, height: "90%", }}
                language={returnFileType(data.main_file) ?? "javascript"}
                fontSize={calc(15, "height")}
                highlighter="prism"
                wrapLongLines
            >
                {data.main_file ? code : "console.error('Error')"}
            </SyntaxHighlighter>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    info: {
        fontSize: calc(15, "height")
    },
    topInfo: {
        flexDirection: "row",
        gap: calc(10, "width")
    },
    input: {
        position: "absolute",
        // top: "5%",
        height: "100%",
        zIndex: 99999,
        width: "100%",
        color: "transparent",
        marginTop: calc(33, "height"),
        // fontSize: calc(13, "height"),
        fontFamily: "monospace",

    }
});