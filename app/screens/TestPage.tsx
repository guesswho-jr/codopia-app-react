import React from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native';
import { router } from 'expo-router';
import { TouchableWithoutFeedback } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView } from 'react-native';

import colors from '../utils/colors';
import CodText from '../components/CodText';
import TestPageChoice from '../components/TestPageChoice';
import CrossButton from '../components/CrossButton';
import { calc } from '../utils/getResponsive';
import { useSession } from '../hooks/Session';
import { getTheFirstQuestion, nextQuestionResponse, temporaryQuestion } from '../api/test';
import { getBaseAxios } from '../api/project';
import ErrorPage from '../components/ErrorPage';
import { isAxiosError } from 'axios';



export default function TestPage({ subjectId }: { subjectId: string }) {
    const queryClient = useQueryClient()
    const { isLoading, user_id } = useSession()
    const [selected, setSelected] = React.useState<string>('')
    const [isTheFirstQuestion, setIsTheFirstQuestion] = React.useState<boolean>(true)
    const [correct, setCorrect] = React.useState<number>(0)
    const [wrong, setWrong] = React.useState<number>(0)
    const [error, setError] = React.useState<{ error: boolean, text?: string }>({ error: false })
    const [firstClick, setFirstClick] = React.useState<boolean>(true)
    const [correctAns, setCorrectAns] = React.useState<string>("")
    const [questionHolder, setQuestionHolder] = React.useState<temporaryQuestion>()
    const [questionsEnded, setQuestionsEnded] = React.useState<boolean>(false)
    const [showLoading, setShowLoading] = React.useState<boolean>(false)

    const question = useQuery({
        queryKey: ["question"],
        queryFn: async () => {
            try {
                const resp = await getTheFirstQuestion(user_id, subjectId)

                return resp.data[0]
            }
            catch (Error) {

                setError({
                    error: true,
                    text: isAxiosError(Error) ? Error.response?.data.message : String(Error)
                })
                return null;
            }
        },
        enabled: !isLoading
    })
    const theme = useColorScheme()

    const fetchNextQuestion = useMutation({
        mutationFn: async () => {
            if (firstClick) {
                const response = await getBaseAxios.get(`next_question/${user_id}/${subjectId}/${selected}`);
                const data: nextQuestionResponse = response.data
                if (data.code && data.code === 12) {

                    // Question ended man
                    if (data.correct == 1) {
                        setCorrect(prev => prev + 1)
                        setCorrectAns(selected)
                    }
                    else {
                        setWrong(prev => prev + 1)
                    }
                    setShowLoading(true)
                    setTimeout(() => {
                        setQuestionsEnded(true)
                        setShowLoading(false)
                    }, 2000)
                    return
                }
                setQuestionHolder(data.nextQuestion)
                if (data.correct) setCorrect(prev => prev + 1)
                else setWrong(prev => prev + 1)
                setCorrectAns(data.ans.answer)
                setFirstClick(false)
                return
            }
            else {

                setFirstClick(true)

                if (typeof questionHolder === 'undefined') {
                    setFirstClick(true)
                    return
                }
                setCorrectAns("")
                setSelected("")
                return {
                    question: questionHolder.question,
                    a: questionHolder.a,
                    b: questionHolder.b,
                    c: questionHolder.c,
                    d: questionHolder.d
                }
            }
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["question"], () => data)
        }
    })

    function handleSubmit(): void {
        fetchNextQuestion.mutate();
        if (isTheFirstQuestion) {
            setIsTheFirstQuestion(false)
        }
    }

    if (isLoading) return (<><ActivityIndicator /></>)
    if (question.isLoading) return (<><ActivityIndicator /></>)
    if (!question.data || error.error || question.isError) return <ErrorPage title={error.text || "Error occured"} body={`
    If the above couldn't explain the issue...
    Possible reasons: 
    1. You might be offline of having unstable internet connection.
    2. You might have taken the test.
    3. There is a malfunction in the data
    Please report this to our telegram channel 
    NB. This feature will not be available after the beta version is over.
    `} retry={() => question.refetch()} />

    return (
        <View style={[styles.container]}>
            <View style={[styles.testCont, theme === "dark" && { backgroundColor: colors.darkTheme }]}>
                {showLoading && <ActivityIndicator size={'large'} />}
                {questionsEnded ? (
                    <>
                        <View style={{ flexDirection: "row", gap: calc(20, "width") }}>
                            <CodText>Wrong: {wrong}</CodText>
                            <CodText>Correct: {correct}</CodText>
                        </View>
                        <TouchableWithoutFeedback onPress={() => router.replace("/dashboard/")}>
                            <View >
                                <CodText style={{ color: colors.primary }}>Leave test</CodText>
                            </View>
                        </TouchableWithoutFeedback>
                    </>
                )
                    :
                    <ScrollView>
                        <>

                            <CodText>{question.data.question.replace("<code>", "").replace("</code>", "")}</CodText>
                            <TestPageChoice leftTitle='A. ' mainTitle={question.data.a} selected={selected === 'a'} toggle={() => setSelected('a')} correct={correctAns == '' ? undefined : correctAns === 'a'} />
                            <TestPageChoice leftTitle='B. ' mainTitle={question.data.b} selected={selected === 'b'} toggle={() => setSelected('b')} correct={correctAns == '' ? undefined : correctAns === 'b'} />
                            <TestPageChoice leftTitle='C. ' mainTitle={question.data.c} selected={selected === 'c'} toggle={() => setSelected('c')} correct={correctAns == '' ? undefined : correctAns === 'c'} />
                            <TestPageChoice leftTitle='D. ' mainTitle={question.data.d} selected={selected === 'd'} toggle={() => setSelected('d')} correct={correctAns == '' ? undefined : correctAns === 'd'} />
                        </>
                        <CrossButton style={{ backgroundColor: "#033f3f" }} title={isTheFirstQuestion ? 'Submit' : "Next"} onPress={handleSubmit} />
                    </ScrollView>
                }
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    testCont: {
        backgroundColor: colors.white,
        borderColor: colors.light,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 40,
        paddingHorizontal: 50,
        width: "70%"
    }
});