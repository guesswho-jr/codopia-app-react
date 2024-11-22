import { Slot } from 'expo-router';
import React from 'react';
import { SessionProvider } from '../hooks/Session';

export default function _layout() {
    return <SessionProvider>
        <Slot />
    </SessionProvider>
};
