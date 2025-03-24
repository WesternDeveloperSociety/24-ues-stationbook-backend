import { View, Text, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';

const scanner = () => {
	const [permission, requestPermission] = useCameraPermissions();

	const isPermissionGranted = Boolean(permission?.granted ?? false);

	useEffect(() => {
		async function request() {
			requestPermission();
		}

		request();
	});

	return (
		<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{isPermissionGranted ? (
				<CameraView style={{ flex: 1 }} facing={'back'}>
					<View style={{ flex: 1 }}></View>
				</CameraView>
			) : (
				<TouchableOpacity style={styles.button} onPress={() => requestPermission()} />
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#0a7ea4', // Primary color
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default scanner;
