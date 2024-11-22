import React from 'react';
import { StyleSheet, View, Animated, useColorScheme } from 'react-native';
import { Ionicons } from "@expo/vector-icons"

import { calc } from '../utils/getResponsive';
import colors from '../utils/colors';
import CodText from './CodText';
import CrossButton from './CrossButton';

type prop = {
    showCancelButton: boolean,
    icon: keyof typeof Ionicons.glyphMap,
    title: string,
    subTitle: string,
    showSuccessButton: boolean,
    successButtonText?: string,
    cancelButtonText?: string,
    iconColor: keyof typeof colors,
    ElementToBeAddedAtTheBottom?: React.ComponentType,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    successButtonAction?: () => void
}


export default function CustomModal({ showCancelButton, icon, title, subTitle, successButtonText, cancelButtonText, iconColor = "selected", ElementToBeAddedAtTheBottom, visible = false, setVisible, successButtonAction }: prop) {
    if (!visible) return null
    const theme = useColorScheme()
    const scale = React.useRef(new Animated.Value(0)).current
    React.useEffect(() => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true
        }).start()

    }, [])
    return (
        <Animated.View style={[styles.wrapper, theme === "dark" && { backgroundColor: colors.black, borderColor: colors.black }, {
            transform: [
                {
                    scale
                }
            ]
        }]}>
            <View style={[styles.container]}>
                <Animated.View style={[styles.iconCont, {
                    backgroundColor: colors[iconColor]
                }
                ]}>
                    <Ionicons name={icon} style={[{ color: colors.white, fontSize: calc(100, "height") }]} />
                </Animated.View>
                <CodText style={[{ fontSize: calc(30, "height"), paddingBottom: calc(10, "height") }, theme === "dark" && { color: colors.white }]}>{title}</CodText>
                <CodText style={[theme === "dark" && { color: colors.white }]}>{subTitle}</CodText>
                <View style={{ padding: calc(30, "height") }}>
                    {ElementToBeAddedAtTheBottom && <ElementToBeAddedAtTheBottom />}
                </View>
            </View>
            <View style={styles.bottom}>
                {(successButtonText && showCancelButton) && <CrossButton title={successButtonText} onPress={() => {
                    setVisible(false)
                    successButtonAction && successButtonAction()
                }} />}
                {(showCancelButton && cancelButtonText) && <CrossButton title={cancelButtonText} style={styles.deleteButton} onPress={() => setVisible(false)} />}
            </View>
        </Animated.View>
    );
};
const styles = StyleSheet.create({
    bottom: {
        paddingVertical: calc(30, "height"),
        paddingHorizontal: calc(40, "width")
    },
    container: {
        marginTop: calc(90, "height"),
        alignItems: 'center',
        paddingTop: calc(10, "width")
    },
    deleteButton: {
        backgroundColor: colors.wrong
    },
    iconCont: {
        fontSize: calc(100, "height"),
        color: colors.white,
        width: calc(150, "width"),
        height: calc(150, "width"),
        borderRadius: calc(75, "width"),
        justifyContent: "center",
        alignItems: "center",
        marginBottom: calc(30, "height")
    },
    wrapper: {
        alignSelf: "center",
        width: "80%",
        backgroundColor: colors.white,
        // height: "40%",
        padding: calc(15, "width"),
        borderRadius: 30,
        borderWidth: 2.5,
        borderColor: colors.light,
        zIndex: 99999999999,
        // position: "absolute"
    }
});