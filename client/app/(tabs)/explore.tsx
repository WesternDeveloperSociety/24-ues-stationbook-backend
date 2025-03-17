import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function TabTwoScreen() {
	return (
		<View style={{ flex: 1, backgroundColor: Colors.white }}>
			<View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
				<Text style={styles.title}>My QR Code</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});
