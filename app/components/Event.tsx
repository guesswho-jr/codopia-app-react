import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';

import CodText from './CodText';
import colors from '../utils/colors';
import { calc } from '../utils/getResponsive';
import { Ionicons } from "@expo/vector-icons"
import { TouchableWithoutFeedback } from 'react-native';
import { useSession } from '../hooks/Session';
import { acceptEvent } from '../api/event';

type eventProp = { name: string, description: string, deadline: string, accepted: boolean, event_id: number }

export default function Event({ name, description, deadline, accepted, event_id }: eventProp) {
    const [acceptedState, setAcceptedState] = React.useState<boolean>(false)
    const [loading, setLoading] = useState(false)
    const theme = useColorScheme()
    const { user_id } = useSession()
    useEffect(() => {
        setAcceptedState(accepted)
    }, [])
    const accept = async () => {
        setLoading(true)
        try {
            const resp = await acceptEvent(user_id, event_id)
            if (!resp.action) alert("Error occured. Please report it")
            if (resp.action === "inc") {

                setAcceptedState(true)
            }
            else if (resp.action === "dec") {
                setAcceptedState(false)
            }
            else alert("Error occured. Please report it")
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <View style={[styles.eventCard, theme === "dark" && { backgroundColor: colors.darkTheme }]}>
            {loading && <ActivityIndicator size={"large"} />}
            <TouchableWithoutFeedback onPress={accept} >
                <View style={[styles.acceptOrReject, acceptedState ? { backgroundColor: colors.secondary } : { backgroundColor: colors.primary }]}>
                    <Ionicons name={acceptedState ? "close" : "checkmark"} style={[styles.icon]} />
                </View>
            </TouchableWithoutFeedback>
            <View style={{ position: "absolute", top: calc(20, "height"), left: calc(20, "width") }}>
                <CodText style={[theme === "dark" && { color: colors.white }]}>{name}</CodText>
                <CodText style={[theme === "dark" && { color: colors.white }]}>{description}</CodText>
                <CodText style={[theme === "dark" && { color: colors.white }]}>{deadline}</CodText>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    eventCard: {
        width: calc(300, "width"),
        // height: ,
        backgroundColor: colors.white,
        borderRadius: 25,
        flex: 1,
        padding: calc(20, "width"),
        marginLeft: calc(20, "width"),
        position: "relative",
        paddingVertical: 10
        // flexDirection: 'ro'
    },
    acceptOrReject: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end",
        width: calc(50, "height"),
        height: calc(50, "height"),
        borderRadius: calc(25, "height"),
        backgroundColor: "yellow",
        top: "15%",
        right: calc(10, "width")
    },
    icon: {
        color: colors.white,
        position: 'absolute',
        fontSize: calc(28, 'height'),
        marginLeft: 15
    }
});