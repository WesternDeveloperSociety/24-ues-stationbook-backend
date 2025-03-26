import { View, Text, Alert, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';

const scanner = () => {
	const [permission, requestPermission] = useCameraPermissions();
	const [scanned, setScanned] = useState(false);

	const isPermissionGranted = Boolean(permission?.granted ?? false);

	useEffect(() => {
		async function request() {
			await requestPermission();
		}

		request();
	});

	return (
		<SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			{isPermissionGranted ? (
				<CameraView
					style={StyleSheet.absoluteFillObject}
					facing={'back'}
					onBarcodeScanned={(data) => !scanned && scanCode(data)}></CameraView>
			) : (
				<TouchableOpacity style={styles.button} onPress={() => requestPermission()} />
			)}
		</SafeAreaView>
	);

	function scanCode(data: BarcodeScanningResult) {
		setScanned(true);
		console.log(data);
	}
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
