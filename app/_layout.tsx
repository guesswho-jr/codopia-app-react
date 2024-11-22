import { router, Slot } from 'expo-router';
import { hideAsync } from 'expo-splash-screen';
import React from 'react';
import { validateSession } from './auth/storage';

export default function _layout() {
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {

        setLoading(true)
        if (validateSession()) {
            router.replace("/dashboard/")
        }
        setLoading(false)

        hideAsync()
    }, [])
    if (loading) return <></>
    return <Slot />
};
