import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { TextInput } from 'react-native';
import CodText from '../../components/CodText';
import { calc } from '../../utils/getResponsive';
import CrossButton from '../../components/CrossButton';
import colors from '../../utils/colors';
import { sendFeedBack } from '../../api/post_requests';
import { useSession } from '../../hooks/Session';
import ErrorPage from '../../components/ErrorPage';

export default function fdbk() {
    const [feedback, setFeedback] = React.useState<string>("")
    const [errorPage, setErrorPage] = React.useState<boolean>(false)
    const { user_id } = useSession()
    const theme = useColorScheme()
    const handleSubmit = async () => {
        const response = await sendFeedBack(feedback, user_id.toString())
        if (response) {
            alert("Success!")
        }
        else {
            setErrorPage(true)
        }
    }
    if (errorPage) return <ErrorPage body='Something occured while sending your feedback' retry={() => setErrorPage(false)} title='Oops!' />
    return (
        <View style={[styles.container, theme === "dark" && { backgroundColor: "rgba(0,0,0,0.85)" }]}>
            <CodText style={[styles.text, theme === "dark" && { color: colors.white }]}>Write us your feedback</CodText>
            <CodText style={[theme === "dark" && { color: colors.white }]}>Continue writing to make it bigger.</CodText>
            <View style={{ height: "60%" }}>
                <TextInput style={[styles.input, theme === "dark" && { backgroundColor: colors.black, color: colors.white, borderColor: colors.black }]} multiline spellCheck verticalAlign='top' onChangeText={text => setFeedback(text)} />
                <CrossButton title='Submit' type='primary' onPress={handleSubmit} />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: "center",
        padding: calc(20, "width")
    },
    input: {
        backgroundColor: colors.white,
        borderColor: colors.light,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: calc(20, "width"),
        height: "auto",
        minHeight: calc(100, "height")
        // flex: 1,
        // height: calc(400, "height")
    },
    text: {
        fontSize: calc(39, 'height')
    }
});