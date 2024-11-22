import { SafeAreaView, Platform, StatusBar, View } from 'react-native';
import React, { ReactNode } from 'react';
function CrossView({ children, style }: { children: ReactNode, style?: object }) {
    if (typeof style === undefined || null) style = {}
    return (
        <>
            {Platform.OS === "ios" ? (
                <SafeAreaView style={[style]}>
                    {children}
                </SafeAreaView>
            )
                :
                (
                    <View style={[{
                        marginTop: StatusBar.currentHeight,
                    }, style]}>
                        {children}
                    </View>
                )
            }
        </>
    )
}

export default CrossView;