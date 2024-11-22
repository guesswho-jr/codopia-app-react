import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useColorScheme, View } from 'react-native';
import CodText from '../../../components/CodText';
import Test from '../../../screens/TestListItem';
import { useQuery } from '@tanstack/react-query';
import fetchTestList from '../../../api/test';
import ErrorPage from '../../../components/ErrorPage';
import colors from '../../../utils/colors';


interface test {
    id: number
    name: "JavaScript" | "HTML"
    prepared_by: string
    difficulity: string
}


export default function test() {
    const { isLoading, data, isError, refetch } = useQuery({
        queryKey: ["test_list"],
        queryFn: fetchTestList
    })
    const theme = useColorScheme()
    if (isLoading) return <ActivityIndicator size={'large'} />
    if (isError) return <ErrorPage body='Error occured in fetching data' retry={refetch} title='Oh No!' />
    return (

        <View style={[styles.container, theme === "dark" && { backgroundColor: "rgba(0, 0, 0, 0.85)" }]}>
            <CodText style={[styles.title, { color: colors.white }]}>Tests</CodText>
            <FlatList data={data}
                style={{ marginTop: 100, flex: 1 }}
                keyExtractor={key => key.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
                renderItem={({ item }) => (
                    <Test name={item.name} difficulity={item.difficulity} prepBy={item.prepared_by} Href={`/test/${item.id}`} subjectName={item.name} />
                )} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        // justifyContent: "center",
        // alignItems: "center",
        flex: 1,

    },
    title: {
        fontSize: 39,

    }
});