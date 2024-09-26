import React, { createContext, useState, useEffect } from 'react';

import authService from '../../services/auth';
import storage from '../../utils/storage';
import { Author, AuthState } from '../../utils/types';

/**
 * Typing for the auth state
 */
interface AuthContextType {
	authState: AuthState;
	loading: boolean;
	setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
	loginToAuthState: (token: string) => void;
	logoutFromAuthState: () => void;
	updateUserData: (userData: Partial<Author>) => void;
}

/**
 * Auth state object that's going to get used by other components, initialized here
 */
export const AuthContext = createContext<AuthContextType>({
	authState: { authenticated: false },
	loading: false,
	setAuthState: () => {},
	loginToAuthState: () => {},
	logoutFromAuthState: () => {},
	updateUserData: () => {},
});

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authState, setAuthState] = useState<AuthState>({
		authenticated: false,
		id: undefined,
		username: '',
		role: 'user',
	});

	const [loading, setLoading] = useState(true);
	console.log(`loading`, loading);
	/**
	 * The function that handles the auth state to reflect a log in
	 * @param token - a JWT
	 */
	const loginToAuthState = async (token: string) => {
		try {
			const userData = await authService.getUserFromToken(token);
			setAuthState({ authenticated: true, ...userData });
		} catch (error) {
			setAuthState({ authenticated: false });
			alert(error);
		}
	};

	/**
	 * The function that resets a user in auth state when they log out
	 */
	const logoutFromAuthState = () => {
		setAuthState({ authenticated: false });
	};

	/**
	 * Updates the userdata in state for the components to use
	 * @param userData - The user data to be set in state
	 */
	const updateUserData = (userData: Partial<Author>) => {
		setAuthState(prevState => ({
			...prevState,
			...userData,
		}));
	};

	/**
	 * Ensures that there's a valid token and sets the user to state if the token checks out
	 */
	useEffect(() => {
		const checkUser = async () => {
			const token = storage.getToken();
			console.log('Tokennnn', token); // Debug log: check if token exists

			if (!token) {
				console.log('No token found, setting auth to false.');
				setAuthState({ authenticated: false });
				setLoading(false);
				return;
			}

			try {
				console.log('Fetching user data from token...');
				const userData = await authService.getUserFromToken(token);
				if (userData) {
					console.log('User data retrieved:', userData); // Debug log: check if user data is correct
					setAuthState({
						authenticated: true,
						id: userData.id,
						username: userData.username,
						role: userData.role,
					});
				} else {
					console.log('User data is null or undefined, setting auth to false.');
					setAuthState({ authenticated: false });
				}
			} catch (error) {
				console.error('Error fetching user data:', error); // Log the exact error
				setAuthState({ authenticated: false });
			} finally {
				setLoading(false);
			}
		};

		checkUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				loading,
				authState,
				setAuthState,
				loginToAuthState,
				logoutFromAuthState,
				updateUserData,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
