import { Stack } from 'expo-router';
import React from 'react';

export default function _layout() {
    return <Stack>
        <Stack.Screen name='index' options={{
            headerShown: false,

        }} />
        <Stack.Screen name='modal' options={{
            title: "Upload",
            presentation: "modal",
            headerShown: false


        }} />
    </Stack>
};
