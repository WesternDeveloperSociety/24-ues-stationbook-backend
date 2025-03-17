import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import QRCode from 'react-native-qrcode-svg';
import { useState } from 'react';

export default function TabTwoScreen() {
	const dimensions = useWindowDimensions();

	const [userId, setUserId] = useState<string | undefined>(undefined);

	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
				<Text style={styles.title}>My QR Code</Text>
			</View>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<QRCode
					value={userId ?? 'hello'}
					size={dimensions.width * 0.7}
					color={Colors.light.text}
					backgroundColor={Colors.white}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 50,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
