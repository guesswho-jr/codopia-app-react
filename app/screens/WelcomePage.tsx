import { StyleSheet, useColorScheme } from "react-native";
import { ScrollView } from "react-native";
import React, { useEffect } from "react";

import CrossView from "../components/CrossView";
import SignupPage from "../components/SignupPage";
import LoginPage from "../components/LoginPage";

import CodText from "../components/CodText";
import { calc } from "../utils/getResponsive";


function WelcomePage() {
    var i = 0
    const [text, setText] = React.useState<string>("")
    const [loginScreen, setLoginScreen] = React.useState<boolean>(true)
    // if (getItem("token")) {
    //     router.replace("/dashboard/")
    // }`
    useEffect(() => {
        const textToWrite: string = "brilliance!"
        function type(): void {
            setText(prev => prev + textToWrite[i])
            i++
            if (i < textToWrite.length)
                setTimeout(type, 50);

        }
        type()
        return () => {
            setText("")
        }
    }, [])

    return (
        <CrossView>

            <ScrollView showsVerticalScrollIndicator={false}>
                <CodText style={styles.intro}>Codopia</CodText>
                <CodText style={styles.motto}>Fast road to {text}</CodText>
                {
                    loginScreen ? (
                        <LoginPage setLoginScreen={setLoginScreen} />
                    )
                        :
                        (
                            <SignupPage setLoginScreen={setLoginScreen} />
                        )
                }
            </ScrollView>
        </CrossView >
    );
}

const styles = StyleSheet.create({
    intro: {
        fontSize: calc(40, "height"),
        textAlign: "center",
        position: "relative",
        top: "5%"
    },

    bottomView: {
        justifyContent: "flex-end",
        marginBottom: 20,
        width: "100%",
        flex: 1
    },
    container: {
        alignItems: "center",
        flex: 1
    },
    motto: {
        alignSelf: "center",
        paddingTop: calc(100, "height"),
        fontSize: 20
    }
})

export default WelcomePage;