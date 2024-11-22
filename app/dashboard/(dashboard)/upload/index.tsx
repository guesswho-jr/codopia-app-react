import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useColorScheme, View } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from "@expo/vector-icons"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as Yup from "yup"
import { Formik } from 'formik';

import CodText from '../../../components/CodText';
import colors from "../../../utils/colors"
import { Project, ProjectSeparator } from '../../../components/ProjectUtils';
import { calc } from '../../../utils/getResponsive';
import CustomModal from '../../../components/CustomModal';
import { getProjectByUserId } from '../../../api/project';
import { useSession } from '../../../hooks/Session';
import AppTextInput from '../../../components/AppTextInput';
import CrossButton from '../../../components/CrossButton';
import ErrorMessage from '../../../components/ErrorMessage';
import { deleteProject, editProject } from '../../../api/post_requests';
import ErrorPage from '../../../components/ErrorPage';
import { isAxiosError } from 'axios';

const validationSchema = Yup.string().required()

export default function upload() {
    const [deleteModal, setDeleteModal] = React.useState<boolean>(false)
    const [visible, setVisible] = React.useState<boolean>(false)
    const [project_id, setProjectId] = React.useState<number>(-1)
    const [refreshing] = React.useState(false)
    const [error, setError] = React.useState<boolean>(false)
    const queryClient = useQueryClient()
    const { user_id, isLoading: LoadingData } = useSession()

    const { isLoading, data, refetch, isError } = useQuery({
        queryKey: ["projects_per_user"],
        queryFn: async () => {
            try {
                let response = await getProjectByUserId(user_id)
                return response
            }
            catch (E) {
                if (isAxiosError(E)) {
                    setError(true)
                    return null
                }
                setError(true)
                return null
            }
        },
        enabled: !LoadingData
    })
    const handleSubmission = useMutation({
        mutationKey: ["projects_per_user"],
        mutationFn: async (fdata: { new_name: string, new_desc: string }) => {

            if (project_id === -1) {
                return
            }
            let resp = await editProject(fdata.new_name, fdata.new_desc, String(project_id))
            if (resp) {
                alert("Success")
            }
            else {

                setError(true)
            }
            setVisible(false)
            setProjectId(-1)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects_per_user"] })
        }
    })
    const handleDelete = useMutation({
        mutationKey: ["projects_per_user"],
        mutationFn: async (fdata: { user_id: string, id: string }) => {

            if (project_id === -1) {
                return
            }
            let resp = await deleteProject(fdata.user_id, fdata.id)
            if (resp) {
                alert("Success")
            }
            else {
                alert("Error occured")
            }
            setVisible(false)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects_per_user"] })
        }
    })
    const theme = useColorScheme()
    if (isLoading) return <ActivityIndicator size={'large'} />
    if (LoadingData) return <ActivityIndicator size={'large'} />
    if (!data || isError || error) return (
        <>
            <ErrorPage body='Error when fetching projects. Probably you have not uploaded yet. Upload now!' retry={() => {
                refetch()
                setError(false)
            }} title='Oops!' />
            <View style={styles.floater}>
                <Link href={'/dashboard/upload/modal'} style={{ color: colors.white }} asChild>
                    <FontAwesome name='plus' size={calc(30, "width")} />
                </Link>
            </View>
        </>

    )

    function EditForm() {
        return (
            <Formik initialValues={{ new_name: "", new_desc: "" }} validationSchema={validationSchema} onSubmit={handleSubmission.mutateAsync}>
                {({ handleChange, handleSubmit, errors, touched }) => (
                    <>
                        <AppTextInput placeholder="New name" icon="new-box" type="name" onChange={handleChange("new_name")} />
                        <ErrorMessage errors={errors} field='new_name' touched={touched.new_name} />
                        <AppTextInput placeholder="New description" icon="cloud-question" type="name" onChange={handleChange("new_desc")} />
                        <ErrorMessage errors={errors} field='new_desc' touched={touched.new_desc} />
                        <View style={{ flexGrow: 0.2 }}>
                            <CrossButton title='Submit' type='primary' onPress={handleSubmit} style={{ width: "100%" }} />
                        </View>
                    </>
                )}
            </Formik>
        )
    }

    return (
        <View style={[styles.container, theme === "dark" && { backgroundColor: "rgba(0, 0, 0, 0.85)" }]}>
            <View style={styles.modal}>
                {/**Delete button */}
                <CustomModal
                    visible={deleteModal}
                    icon="warning"
                    iconColor="wrong"
                    title="Delete your project"
                    subTitle=''
                    showCancelButton
                    cancelButtonText="Cancel"
                    successButtonText="Delete"
                    showSuccessButton

                    successButtonAction={() => handleDelete.mutate({ user_id: user_id.toString(), id: project_id.toString() })}
                    setVisible={setDeleteModal}
                />
            </View>
            {/**Edit modal */}

            <View style={styles.modal}>
                <CustomModal
                    visible={visible}
                    icon="information"
                    iconColor="selected"
                    title="Edit your project"
                    subTitle=""
                    showCancelButton
                    cancelButtonText="Cancel"
                    // successButtonText="Go"
                    showSuccessButton={false}
                    setVisible={setVisible}
                    ElementToBeAddedAtTheBottom={EditForm}
                />
            </View>
            <View style={styles.floater}>
                <Link href={'/dashboard/upload/modal'} style={{ color: colors.white }} asChild>
                    <FontAwesome name='plus' size={calc(30, "width")} />
                </Link>
            </View>
            <CodText style={[styles.text, theme === "dark" && { color: colors.white, backgroundColor: "transparent" }]}>Your projects</CodText>
            <CodText style={[theme === "dark" && { color: colors.white, backgroundColor: "transparent" }]}>Slide to edit and delete your project!</CodText>
            <View style={[styles.projList, theme === "dark" && { borderColor: colors.black }]}>

                <FlatList data={data.data}
                    ItemSeparatorComponent={() => <ProjectSeparator />}
                    keyExtractor={item => item.project_id.toString()}
                    style={{ borderWidth: 0 }}
                    renderItem={({ item }) => (
                        <Project name={item.project_name}
                            desc={item.project_detail}
                            project_id={Number(item.project_id)}
                            deleteAction={(pid: number) => {
                                setDeleteModal(true)
                                setProjectId(pid)
                            }}
                            setProjectId={setProjectId}
                            setVisible={setVisible}
                        />
                    )}
                    onRefresh={refetch}
                    refreshing={refreshing}
                />

            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        backgroundColor: colors.white,
    },
    floater: {
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: calc(50, "width"),
        width: calc(70, "width"),
        height: calc(70, "width"),
        position: "absolute",
        padding: calc(5, "height"),
        bottom: calc(20, "height"),
        color: colors.white,
        right: calc(20, "width")
    },
    modal: {
        position: "absolute",
        top: calc(10, "height"),
        width: "90%"
    },
    projList: {
        marginTop: calc(100, "height"),
        // height: calc(800, "height"),
        // width: calc(700, "width"),
        borderWidth: 1,
        borderColor: colors.mediumLight,
        borderRadius: 10,
        width: "80%"
    },
    text: {
        fontSize: calc(39, "height"),
        textAlign: "center",
        backgroundColor: colors.white
    }
});