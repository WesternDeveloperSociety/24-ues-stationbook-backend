import React, { createContext, useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Stack } from 'expo-router';

// Create AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLogin, setIsLogin] = useState(false);
	//const location = useLocation(); // Get the current location
	const navigate = useNavigation();

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const accessToken = localStorage.getItem('accessToken');
				const response = await fetch('http://172.30.165.106:5000/api/auth/isUserAuth', {
					method: 'POST',
					headers: { Authorization: `Bearer ${accessToken}` },
				});

				// // Log the response text

				if (response.ok) {
					try {
						setIsLogin(true);
					} catch {
						setIsLogin(false);
					}
				} else {
					const secondResponse = await fetch(
						'http://172.30.165.106:5000/api/auth/returnAccessToken',
						{
							method: 'POST',
							credentials: 'include',
						},
					);
					if (secondResponse.ok) {
						secondResponse.json().then((data) => {
							setIsLogin(true);

							localStorage.setItem('accessToken', data['accessToken']);
						});
					} else {
						setIsLogin(false);
						navigate.navigate('login');
					}
				}
			} catch (error) {
				console.error('Error during fetch:', error);
				setIsLogin(false);
			}
		};

		checkAuthStatus();
	}, [Stack.name]);
	return <AuthContext.Provider value={{ isLogin, setIsLogin }}>{children}</AuthContext.Provider>;
};
