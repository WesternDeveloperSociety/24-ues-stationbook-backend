import { Colors } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
	const [user, setUser] = useState<{
		firstName: string;
		lastName: string;
		email: string;
		studentId: string;
		points: number;
	}>({
		firstName: 'Zanan',
		lastName: 'Virani',
		email: 'zanan.virani@example.com',
		studentId: '251234567',
		points: 420,
	});

	useEffect(() => {
		// Fetch user data
	});

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Profile</Text>
			</View>
			<View style={styles.infoContainer}>
				<InfoRow label='First Name' value={user.firstName} />
				<InfoRow label='Last Name' value={user.lastName} />
				<InfoRow label='Email' value={user.email} />
				<InfoRow label='Student ID' value={user.studentId} />
			</View>
			<View style={styles.pointsContainer}>
				<View style={styles.pointsCircle}>
					<Text style={styles.pointsNumber}>{user.points}</Text>
					<Text style={styles.pointsLabel}>Points</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

type InfoRowProps = {
	label: string;
	value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
	return (
		<View style={styles.row}>
			<Text style={styles.label}>{label}</Text>
			<Text style={styles.value}>{value}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 50,
		backgroundColor: '#f9fafb',
		paddingHorizontal: 24,
		paddingTop: 32,
	},
	pointsContainer: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	pointsCircle: {
		width: 200,
		height: 200,
		borderRadius: 100,
		backgroundColor: '#2563eb',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 5 },
		shadowRadius: 10,
		elevation: 10,
	},
	pointsNumber: {
		fontSize: 48,
		fontWeight: 'bold',
		color: '#fff',
	},
	pointsLabel: {
		fontSize: 18,
		color: '#e0f2fe',
		marginTop: 4,
	},
	infoContainer: {
		gap: 20,
	},
	row: {
		backgroundColor: Colors.purple,
		padding: 16,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		elevation: 2,
	},
	label: {
		fontSize: 12,
		color: '#ccc',
		marginBottom: 4,
		textTransform: 'uppercase',
		letterSpacing: 1,
	},
	value: {
		fontSize: 18,
		fontWeight: '600',
		color: '#fff',
	},
	title: {
		fontSize: 50,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
