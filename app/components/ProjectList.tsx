import React from 'react';
import {
    FlatList, StyleSheet, View, Dimensions, ActivityIndicator,

} from 'react-native';

import Project from './Project';
import { useQuery } from '@tanstack/react-query';
import { getAllProjects } from '../api/project';
import ErrorPage from './ErrorPage';



export default function ProjectList() {
    const [refreshing] = React.useState(false)
    const data = useQuery({

        queryKey: ["projects_all"],
        queryFn: async () => {
            let projects = await getAllProjects()
            // setProjects(projects)
            return projects
        }

    })
    if (data.isLoading) return <ActivityIndicator size="large" />
    if (data.isError || !data.data) return <ErrorPage body='Something wrong happend while fetching data' retry={() => {
        data.refetch()
    }} title='Oops!' />
    return (
        <View style={styles.container}>
            {data.data.success && <FlatList data={data.data.data}
                style={{ width: "50%" }}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Project file_path={item.file_path}
                        liked_by={item.liked_by}
                        likes={item.likes}
                        project_detail={item.project_detail}
                        project_id={item.project_id}
                        project_name={item.project_name}
                        project_time={item.project_time}
                        user_id={item.user_id}
                    />
                )
                }
                keyExtractor={project => project.project_id.toString()}
                ItemSeparatorComponent={() =>
                    <View style={{ width: "100%", height: 40 }} />
                }
                refreshing={refreshing}
                onRefresh={() => data.refetch()}
            />}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: Dimensions.get("screen").width * 0.0208044382801664,
    }
});