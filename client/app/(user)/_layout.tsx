import { Stack } from 'expo-router';
import { AuthProvider } from './authContext';

export default function UserLayout() {
	return (
		<Stack>
			<AuthProvider>
				<Stack.Screen name='register' options={{ headerShown: false }} />
				<Stack.Screen name='login' options={{ headerShown: false }} />
			</AuthProvider>
		</Stack>
	);
}
