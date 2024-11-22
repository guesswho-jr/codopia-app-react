import React from 'react';
import { View, StyleSheet, TextInput, Platform, TouchableWithoutFeedback, useColorScheme, } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import colors from '../utils/colors';
import { textContentType } from '../utils/types';

type eventFn = (text: string) => void
type prop = {
    icon: keyof typeof MaterialCommunityIcons.glyphMap, placeholder: string,
    onChange?: eventFn,
    type: textContentType, secure?:
    boolean, onBlur?: () => void,
    autoFocus?: boolean,
    style?: object
}


function AppTextInput({ icon, placeholder, onChange, type, secure, onBlur, autoFocus, style }: prop) {
    const toFocus = React.useRef<TextInput>(null)
    const theme = useColorScheme()
    function handleFocus() {
        toFocus.current?.focus()
    }
    React.useEffect(() => {
        handleFocus()
    }, [])
    return (
        <TouchableWithoutFeedback>
            <View style={[styles.container, style, theme === "dark" && { backgroundColor: "rgb(50,50, 50)" }]}>
                {icon && <MaterialCommunityIcons name={icon} size={30} color={theme === "dark" ? colors.white : colors.black} />}
                {/* {icon && <MaterialCommunityIcons name={'lock'} size={30} />} */}
                <TextInput placeholder={placeholder}
                    style={[styles.innerTextInput, theme === "dark" && { color: colors.white }]}
                    onChangeText={onChange}
                    textContentType={type}
                    secureTextEntry={secure ? true : false}
                    onBlur={onBlur}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    ref={autoFocus ? handleFocus : undefined}
                    placeholderTextColor={theme === "dark" ? "gray" : colors.medium}

                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        flexDirection: "row",

        width: "100%",
        padding: 20,
        marginVertical: 10,
        gap: 12,
        //  marginTop: 120,

    },
    innerTextInput: {
        flex: 1
    },
    textInput: {
        fontSize: 18,
        paddingLeft: 10,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }
})

export default AppTextInput;