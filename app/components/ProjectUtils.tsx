import { View, StyleSheet, useColorScheme } from "react-native"
import colors from "../utils/colors"
import CodText from "./CodText"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react";
import { calc } from "../utils/getResponsive";
export function ProjectSeparator() {
    return (
        <View style={{
            height: 1,
            width: '100%',
            backgroundColor: colors.light
        }} />
    )
}

function DeleteView(action: () => void) {

    return (
        <View style={styles.deleteButton}>
            <TouchableWithoutFeedback onPress={action}>
                <View>
                    <MaterialCommunityIcons name="delete" size={25} color={colors.white} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}
function EditView() {
    return (
        <View style={styles.editButton}>
            <TouchableWithoutFeedback>
                <View>
                    <MaterialCommunityIcons name="pen" size={25} color={colors.white} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}


export function Project({ name, desc, project_id, deleteAction, setVisible, setProjectId }: { name: string, desc: string, project_id: number, setVisible: React.Dispatch<React.SetStateAction<boolean>>, deleteAction: (pid: number) => void, setProjectId: typeof deleteAction }) {
    const theme = useColorScheme()
    return (
        <>

            <GestureHandlerRootView >
                <Swipeable renderRightActions={() => DeleteView(() => deleteAction(project_id))} renderLeftActions={EditView} onSwipeableOpen={(direction, s) => {
                    if (direction === "left") {
                        setVisible(true)
                        s.close()
                    }
                    setProjectId(project_id)
                }}>
                    <View style={[styles.project, theme === "dark" && { backgroundColor: colors.black, borderWidth: 0 }]}>
                        <CodText style={[theme === "dark" && { color: colors.white }]}>{name}</CodText>
                        <CodText numberOfLines={1} style={[theme === "dark" && { color: colors.white }]}>{desc}</CodText>
                    </View>

                </Swipeable>
            </GestureHandlerRootView>

        </>
    )
}
const styles = StyleSheet.create({
    deleteButton: {
        alignItems: "center",
        justifyContent: "center",
        width: calc(100, "width"),
        padding: 10,
        backgroundColor: colors.secondary
    },
    editButton: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: colors.primary,
        flex: 1
    },
    modal: {
        flex: 1
    },
    project: {
        padding: calc(20, "width"),
        backgroundColor: colors.white,

        zIndex: 100000
    }
})
export default {
    Project,
    ProjectSeparator
}