import { Tabs } from 'expo-router';
import React from 'react';
import { View, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.black,

				tabBarInactiveTintColor: Colors.gray,
				headerShown: false,
				tabBarButton: HapticTab,
				tabBarBackground: () => {
					return (
						<View
							style={{
								position: 'absolute',
								bottom: 0,
								right: 0,
								left: 0,
								height: '50%',
								backgroundColor: Colors.offWhite,
							}}
						/>
					);
				},
				tabBarActiveBackgroundColor: Colors.offWhite,
				tabBarInactiveBackgroundColor: Colors.offWhite,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {},
				}),
			}}>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons size={28} name='map' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='explore'
				options={{
					title: 'Scan',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons size={28} name='qrcode' color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons size={28} name='account-circle' color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
