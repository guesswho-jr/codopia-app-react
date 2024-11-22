import React, { useCallback, useContext, useEffect } from 'react';
import { initialValue, useStorageNonCached } from './useStorage';

export type session = {
    username: string,
    points: number,
    uploads: number,
    user_id: number
}

const AuthContext = React.createContext<typeof initialValue>(initialValue)

export const SessionProvider = ({ children }: React.PropsWithChildren) => {
    const [state, setState] = React.useState<typeof initialValue>({ ...initialValue })
    const useStorage = useCallback(useStorageNonCached, []);

    useEffect(() => {
        useStorage(setState)
    }, [])
    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
    )
}
export function useSession() {
    const data = useContext(AuthContext)
    if (!data) {
        console.error("Error")
    }
    return data
}