import colors from "../utils/colors"
import CrossButton from "./CrossButton";
import CrossText from "./CrossText";
import AppTextInput from "./AppTextInput";
import { loginValidationSchema } from "../utils/validation";
import ErrorMessage from "./ErrorMessage";

import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Formik } from "formik"
import { router } from "expo-router";
import { login } from "../api/project";
import CodText from "./CodText";
import { calc } from "../utils/getResponsive";


function LoginPage({ setLoginScreen }: { setLoginScreen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    function toggleScreen(): void {
        setLoginScreen(prev => !prev)
    }
    return (
        <View style={{ width: "100%", marginTop: 120, flex: 1 }}>
            <Formik initialValues={{ username: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={async values => {
                    try {
                        setError(false)
                        setLoading(true)
                        const ifTrue = await login(values)
                        if (ifTrue) {
                            router.replace("/dashboard/")
                        }
                        else {
                            setError(true)
                        }
                    }
                    finally {
                        setLoading(false)
                    }
                }
                }

            >
                {({ handleChange, handleSubmit, errors, touched }) => (
                    <>
                        {loading && <ActivityIndicator size={"large"} />}
                        {error && <CodText style={{ padding: calc(15, "width"), backgroundColor: colors.wrong, color: colors.white, alignSelf: "center" }}>Error occured while logging you in. Please check your credentials or network.</CodText>}
                        <AppTextInput icon={"face-man"} placeholder="Username"
                            onChange={handleChange("username")}
                            type="username"
                            autoFocus
                        />
                        <ErrorMessage errors={errors} field='username'
                            touched={touched.username} />
                        <AppTextInput icon={"lock"} placeholder="Password"
                            onChange={handleChange("password")}
                            type="password"
                            secure={true}
                        />
                        <ErrorMessage errors={errors} field='password'
                            touched={touched.password} />
                        <CrossButton title="Login" onPress={handleSubmit} />
                        <CrossText text="Do not have an account? Sign up" style={styles.link} onPress={toggleScreen} />
                    </>
                )}
            </Formik>
        </View>
    )

}

export default LoginPage;
const styles = StyleSheet.create({
    link: {
        textDecorationColor: colors.medium,
        textDecorationLine: "underline",
        color: colors.primary,
        fontSize: 16,
        paddingTop: 30,
        alignSelf: "center"
    },
})