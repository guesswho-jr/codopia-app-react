import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import CodText from './CodText';
import colors from '../utils/colors';

interface stylesForWrongAndRight {
    backgroundColor?: string
    color?: string
    borderWidth?: number
}
export default function TestPageChoice({ leftTitle, mainTitle, selected, toggle, correct }: { leftTitle: string, mainTitle: string, selected: boolean, toggle: () => void, correct?: boolean }) {
    const [correctOrWrongStyle, setCorrectOrWrongStyle] = React.useState<stylesForWrongAndRight>(styles.wrong)
    // const [containerStyle, setContainerStyle] = React.useState<stylesForWrongAndRight>({})
    React.useEffect(() => {

        if (correct === undefined) {
            setCorrectOrWrongStyle({ color: colors.black })
        }
        else if (correct === true) {
            setCorrectOrWrongStyle(prev => {
                return { ...prev, backgroundColor: colors.correct, color: colors.white, borderWidth: 0 }
            })
        }
        else if (correct == false && selected) {
            setCorrectOrWrongStyle(prev => {
                return { ...prev, backgroundColor: colors.wrong, color: colors.white, borderWidth: 0 }
            })
        }
    }, [selected, correct])


    return (

        <TouchableWithoutFeedback onPress={toggle}>
            <View style={[styles.container, selected && { backgroundColor: colors.selected }, correctOrWrongStyle,]}>
                <CodText style={[{ color: colors.black }, (selected && typeof correct === 'boolean') || selected ? { color: colors.white } : { color: colors.black }]}>{leftTitle} </CodText>
                <CodText style={[{ color: colors.black }, correctOrWrongStyle, (selected && typeof correct === 'boolean') || selected ? { color: colors.white } : { color: colors.black }]}>{mainTitle}</CodText>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: "100%",
        gap: 20,
        borderColor: colors.medium,
        borderRadius: 5,
        marginTop: 10,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    correct: {
        backgroundColor: colors.correct,
        color: colors.white
    },
    wrong: {
        backgroundColor: colors.wrong,
        color: colors.white
    }
});