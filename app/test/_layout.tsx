import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React from 'react';
import { SessionProvider } from '../hooks/Session';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryDelay: 100,

        }
    }
});
export default function Page() {
    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <Stack>
                    <Stack.Screen name='[test_id]' />
                </Stack>
            </QueryClientProvider>
        </SessionProvider>
    );
};
