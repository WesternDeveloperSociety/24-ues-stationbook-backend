import { useState } from 'react';

import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Link } from 'expo-router';

export default function Login() {
	const [email, setEmail] = useState('');

	const [password, setPassword] = useState('');

	const [emailFound, setEmailFound] = useState<boolean | null>(null);

	const emails: string[] = ['qwerty@gmail.com', 'abcd@gmail.com'];
	const handleSearch = () => {
		const exists = emailExists(email);
		setEmailFound(exists);
	};
	const emailExists = (emailGiven: string): boolean => {
		Alert.alert('email found');

		return emails.some((email) => email === emailGiven);
	};
	const handleSubmit = () => {
		if (emailFound) {
			handleSearch();
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Welcome Back! Login</Text>

			<View>
				<Text>UWO email: </Text>
				<TextInput style={styles.inputBox} value={email} onChangeText={setEmail} />
			</View>

			<View>
				<Text>Password: </Text>
				<TextInput
					style={styles.inputBox}
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
				/>
			</View>
			<Button color='grey' title='Submit' onPress={handleSubmit} />
			<Link href='/register'>
				<Text>Don&apos;t have an account yet? Register</Text>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 100,
		width: 500,
		height: 500,
		padding: 20,
		backgroundColor: 'white',
	},
	header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
	inputBox: {
		height: 30,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		paddingLeft: 10,
		marginBottom: 10,
	},
	disciplineStyle: {
		borderRadius: 4,
		marginBottom: 10,
		marginLeft: -20,
		color: '#ccc',
	},
	picker: {},
});
