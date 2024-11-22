import { Stack } from 'expo-router/stack';
import { SessionProvider } from '../hooks/Session';

export default function AppLayout() {
    return (
        <SessionProvider>
            <Stack>
                <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
                <Stack.Screen name='create-project' options={{ title: "Create your project" }} />
                <Stack.Screen name='challenge' options={{ title: "Email Verification" }} />
            </Stack>
        </SessionProvider>
    );
}



