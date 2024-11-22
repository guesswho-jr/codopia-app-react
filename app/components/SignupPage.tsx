import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { registerValidationSchema } from "../utils/validation"

import AppTextInput from './AppTextInput';
import CrossText from './CrossText';
import CrossButton from './CrossButton';
import colors from '../utils/colors';
import React, { SetStateAction, useState } from 'react';
import { Formik } from "formik"
import ErrorMessage from './ErrorMessage';
import { signUpActions } from '../api/post_requests';
import ErrorPage from './ErrorPage';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


function SignupPage({ setLoginScreen }: { setLoginScreen: React.Dispatch<SetStateAction<boolean>> }) {
    function toggleScreen(): void {
        setLoginScreen(prev => !prev)
    }


    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    if (error) return <ErrorPage body='Error occured while signing you in' retry={() => setError(false)} title='Sign up failed.' />
    return (

        <View style={{ width: "100%", marginTop: 120, flex: 1 }}>
            <Formik initialValues={{ username: '', email: '', password: '', cpassword: '', full_name: '', bio: "" }} onSubmit={async data => {
                try {
                    setLoading(true)
                    const response = await signUpActions(data, 'send_code')

                    if (!response || typeof response === "boolean") {
                        setError(true)
                        return
                    }

                    if (response.success) {
                        try {
                            await AsyncStorage.clear()
                            await AsyncStorage.setItem("signUpData", JSON.stringify(data))
                        }
                        catch (E) {
                            setError(true)
                            return
                        }
                        finally {
                            router.push("/dashboard/challenge/")
                        }
                    }
                    else {
                        if (response.error) {
                            alert("Error occured " + JSON.stringify(response.error))
                        }
                        else {
                            console.log('====================================');
                            console.log(JSON.stringify(response));
                            console.log('====================================');
                            alert("Error occured")
                        }
                    }
                } finally { setLoading(false) }
            }}
                validationSchema={registerValidationSchema}
            >
                {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                    <>
                        {loading && <ActivityIndicator size={"large"} />}
                        <AppTextInput icon={"face-man"} placeholder="Full name"
                            onChange={handleChange("full_name")} type='name'
                            onBlur={() => setFieldTouched("full_name")}
                            autoFocus
                        />
                        <ErrorMessage errors={errors} field='full_name'
                            touched={touched.full_name} />
                        <AppTextInput icon={"face-man-profile"} placeholder="Username"
                            onChange={handleChange("username")}
                            type='username'
                            onBlur={() => setFieldTouched("username")}
                        />
                        <ErrorMessage errors={errors} field='username'
                            touched={touched.username} />
                        <AppTextInput icon={"email"} placeholder="Email"
                            onChange={handleChange("email")}
                            type='emailAddress'
                            onBlur={() => setFieldTouched("email")}
                        />
                        <ErrorMessage errors={errors} field='email'
                            touched={touched.email} />
                        <AppTextInput icon={"lock"} placeholder="Password"
                            onChange={handleChange("password")}
                            type='newPassword'
                            secure
                            onBlur={() => setFieldTouched("password")}
                        />
                        <ErrorMessage errors={errors} field='password'
                            touched={touched.password} />
                        <AppTextInput icon={"lock-check"} placeholder="Confirm password"
                            onChange={handleChange("cpassword")}
                            type='password'
                            secure
                            onBlur={() => setFieldTouched("cpassword")}
                        />
                        <ErrorMessage errors={errors} field='cpassword'
                            touched={touched.cpassword} />

                        <AppTextInput icon={"file-word"} placeholder="Bio"
                            onChange={handleChange("bio")}
                            type='nickname'
                            onBlur={() => setFieldTouched("bio")}

                        />
                        <ErrorMessage errors={errors} field='bio'
                            touched={touched.bio} />
                        <CrossButton title="Sign up"
                            onPress={handleSubmit} />
                        <CrossText text="Already have an account? Login instead" style={styles.link} onPress={toggleScreen} />

                    </>
                )}
            </Formik>
        </View>
    );
}
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
export default SignupPage;