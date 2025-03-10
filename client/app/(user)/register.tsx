import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Link } from 'expo-router';

const Register = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [preferredName, setPreferredName] = useState('');
	const [email, setEmail] = useState('');
	const [studentNumber, setStudentNumber] = useState('');
	const [discipline, setDiscipline] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = () => {
		if (!firstName) {
			Alert.alert('Error', 'Missing Field(s)');
		} else {
			console.log({
				firstName,
				lastName,
				preferredName,
				email,
				studentNumber,
				discipline,
				password,
			});
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.header}>Registration Form</Text>
			<View>
				<Text>First Name: </Text>
				<TextInput style={styles.inputBox} value={firstName} onChangeText={setFirstName} />
			</View>

			<View>
				<Text>Last Name: </Text>
				<TextInput style={styles.inputBox} value={lastName} onChangeText={setLastName} />
			</View>

			<View>
				<Text>Preferred Name: </Text>
				<TextInput
					style={styles.inputBox}
					value={preferredName}
					onChangeText={setPreferredName}
				></TextInput>
			</View>

			<View>
				<Text>UWO email: </Text>
				<TextInput style={styles.inputBox} value={email} onChangeText={setEmail} />
			</View>

			<View>
				<Text>Student Number: </Text>
				<TextInput
					style={styles.inputBox}
					value={studentNumber}
					onChangeText={setStudentNumber}
				/>
			</View>

			<View style={styles.disciplineStyle}>
				<Text>Discipline:</Text>
				<RNPickerSelect
					placeholder={{
						label: 'Select your discipline',
						value: '',
					}}
					value={discipline}
					onValueChange={setDiscipline}
					items={[
						{ label: 'Chemical', value: 'Chemical' },
						{ label: 'Civil', value: 'Civil' },
						{ label: 'Electrical', value: 'Electrical' },
						{ label: 'Mechanical', value: 'Mechanical' },
						{ label: 'Software', value: 'Software' },
						{ label: 'Mechatronics', value: 'Mechatronics' },
						{ label: 'Integrated', value: 'Integrated' },
					]}
					style={{
						inputIOS: {
							color: 'red',
						},
						inputAndroid: {
							color: 'black',
						},
					}}
				/>
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
			<Link href='/login'>
				<Text>Already Have an Account? Login</Text>
			</Link>
		</View>
	);
};
export default Register;
//export const email;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 100,
		width: 500,
		height: 600,
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
