import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { getItem } from 'expo-secure-store';
import { router } from 'expo-router';
import { openURL } from "expo-linking"

import CodText from './CodText';
import colors from '../utils/colors';
import CrossButton from './CrossButton';
import { project } from '../utils/types';
import { calc } from '../utils/getResponsive';
import { getUser, like } from '../api/user';
import { useQuery } from '@tanstack/react-query';


type uploader = { username: string, full_name: string }
export default function Project({ project_id, file_path, liked_by, likes, project_detail, project_name, project_time, user_id }: project) {
    const { isLoading } = useQuery({
        queryKey: ["get_username_and_fullname", project_id],
        queryFn: async () => {
            const [{ full_name, username }] = await getUser(user_id.toString())
            setUploader({ full_name, username })
            return { full_name, username }
        }
    })
    const [uploader, setUploader] = React.useState<uploader>({ username: "", full_name: "" })
    const [_liked, setLike] = React.useState(false)
    const [totalLikes, setTotalLikes] = React.useState<number>(likes)
    const [likeLoading, setLikeLoading] = React.useState<boolean>(false)
    const theme = useColorScheme()
    const USER_ID = Number(getItem("user_id"))
    useEffect(() => {
        let array: number[] = JSON.parse(liked_by)
        if (array.includes(USER_ID)) {
            setLike(true)
        }

    }, [])
    const handleLike = async () => {
        setLikeLoading(true)
        const { success, action } = await like(USER_ID, project_id)
        if (success) {
            if (action === 0) {
                setTotalLikes(prev => Number(prev) - 1)
            }
            else if (action === 1) {
                setTotalLikes(prev => Number(prev) + 1)
            }
            setLike(prev => !prev)
        }
        setLikeLoading(false)
    }

    if (isLoading) return <ActivityIndicator size={'large'} />

    return (
        <View style={[styles.container, { backgroundColor: theme === 'dark' ? colors.black : colors.white }]}>

            <View style={styles.body}>
                <View style={styles.avatarCont}>
                    <Ionicons name='person' size={50} style={styles.avatar} />
                </View>
                <CodText style={[styles.projtext, { marginTop: 1, color: theme === 'dark' ? colors.white : colors.black }]}>{project_name}</CodText>
                <CodText style={[styles.projtext, { color: theme === 'dark' ? colors.white : colors.black }]}>{project_detail}</CodText>
                <CodText style={[styles.projtext, { fontSize: calc(20, "height") }, { color: theme === 'dark' ? colors.white : colors.black }]}>{uploader.full_name}</CodText>
                <CodText style={[styles.projtext, { color: theme === 'dark' ? colors.white : colors.black }]}>@{uploader.username}</CodText>
                <CodText style={[styles.projtext, { color: theme === 'dark' ? colors.white : colors.black }]}>{project_time}</CodText>
            </View>
            <CrossButton title='View' onPress={() => router.push(`/syntax-highlighter/${file_path}`)} />
            <View style={{ flexDirection: "row", gap: 20, paddingTop: 15, justifyContent: "space-between", position: "relative" }}>
                <TouchableWithoutFeedback onPress={handleLike} style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                    <View>
                        <MaterialCommunityIcons name={_liked ? 'heart' : 'heart-outline'} size={35} style={[styles.icon, { color: colors.secondary }]} />
                        <CodText style={{ color: theme === 'dark' ? colors.white : colors.black }}>  {totalLikes}</CodText>
                        {likeLoading && <ActivityIndicator />}
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => openURL(`https://www.codopia.free.nf/dashboard/#project_${project_id}`)}>
                    <MaterialCommunityIcons name='share' size={35} style={styles.icon} color={theme === 'dark' ? colors.white : colors.black} />
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    avatar: {
        alignSelf: "center",
        color: colors.white,
    },
    avatarCont: {
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: calc(100, "width"),
        height: calc(100, "width"),
        borderRadius: calc(50, "width")
    },
    body: {

    },

    container: {

        padding: 30,
        borderRadius: 30, //500
        width: "100%",
        position: "relative"
    },
    icon: {

    },
    projtext: {
        textAlign: "center"
    }
});