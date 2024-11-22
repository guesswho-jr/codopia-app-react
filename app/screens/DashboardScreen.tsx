import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CrossView from '../components/CrossView';
import NavLink from '../components/NavLink';
import CrossText from '../components/CrossText';
import { navLinks } from '../utils/links';

// {navLinks.map((link, i) => {
//     return (
//         <NavLink color={link.color}
//             icon={link.icon}
//             size={link.size}
//             title={link.text}
//             key={i} />
//     )
// })}
export default function DashboardScreen() {
    return (
        <CrossView style={styles.container}>
            <View style={styles.mainView}>
                <CrossText text='Dashboard' />
                <Text>dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</Text>
            </View>
            <View style={styles.bottomView}>

            </View>
        </CrossView>
    );
};
const styles = StyleSheet.create({
    bottomView: {
        backgroundColor: "yellow",
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 80,
        paddingTop: 20
    },
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-end"
    },
    mainView: {
        position: "absolute",
        top: 0,
        padding: 40
    }
});