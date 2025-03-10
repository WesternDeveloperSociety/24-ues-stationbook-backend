import { View, Button } from 'react-native';
import { useRouter } from 'expo-router';

const userHome = () => {
	const router = useRouter();

	const goRegister = () => {
		router.push('./register');
	};
	const goLogin = () => {
		router.push('./login');
	};
	return (
		<View>
			<Button title='Register' onPress={goRegister} />
			<Button title='Login' onPress={goLogin} />
		</View>
	);
};
export default userHome;
