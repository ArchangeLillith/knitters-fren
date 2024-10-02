import React, { createContext, useState, useEffect } from 'react';

import authService from '../../services/auth';
import favoritesService from '../../services/favorites';
import storage from '../../utils/storage';
import { AuthState, undefinedUser } from '../../utils/types';

/**
 * Typing for the auth state
 */
interface AuthContextType {
	authState: AuthState;
	authLoading: boolean;
	setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
	loginToAuthState: (token: string) => void;
	logoutFromAuthState: () => void;
	updateUserData: (userData: Partial<AuthState>) => void;
	handleFavPatternChange: (
		eventButton: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => void;
}

/**
 * Auth state object that's going to get used by other components, initialized here
 */
export const AuthContext = createContext<AuthContextType>({
	authState: { authenticated: false, authorData: undefinedUser },
	authLoading: true,
	setAuthState: () => {},
	loginToAuthState: () => {},
	logoutFromAuthState: () => {},
	updateUserData: () => {},
	handleFavPatternChange: () => {},
});

interface AuthProviderProps {
	children: React.ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authState, setAuthState] = useState<AuthState>({
		authenticated: false,
		authorData: null,
	});

	const [authLoading, setLoading] = useState(true);
	/**
	 * The function that handles the auth state to reflect a log in
	 * @param token - a JWT
	 */
	const loginToAuthState = async (token: string) => {
		try {
			const userData = await authService.getUserFromToken(token);
			setAuthState(prev => {
				if (prev.authenticated && prev.authorData?.id === userData.id) {
					return prev;
				}
				return { authenticated: true, authorData: userData };
			});
		} catch (error) {
			setAuthState(prev => {
				if (!prev.authenticated) return prev; // Avoid re-render if the state is already false
				return { authenticated: false, authorData: null };
			});
			alert(error);
		}
	};

	/**
	 * The function that resets a user in auth state when they log out
	 */
	const logoutFromAuthState = () => {
		setAuthState({ authenticated: false, authorData: null });
	};

	/**
	 * Updates the userdata in state for the components to use
	 * @param userData - The user data to be set in state
	 */
	const updateUserData = (userData: Partial<AuthState>) => {
		setAuthState(prevState => ({
			...prevState,
			...userData,
		}));
	};

	const handleFavPatternChange = async (
		eventButton: React.MouseEvent<HTMLButtonElement>
	) => {
		const { authorData } = authState;
		if (!authorData || !authorData.id) return;

		const pattern_id = eventButton.currentTarget.id;
		const isFavorited = authorData.patternsFavorited.some(
			fav_id => fav_id === pattern_id
		);

		const result = isFavorited
			? await favoritesService.removeFavorite(authorData.id, pattern_id)
			: await favoritesService.addFavorite(authorData.id, pattern_id);

		if (result.affectedRows > 0) {
			const newFavs = isFavorited
				? authorData.patternsFavorited.filter(fav_id => fav_id !== pattern_id)
				: [...authorData.patternsFavorited, pattern_id];

			setAuthState(prev => {
				if (
					JSON.stringify(prev.authorData?.patternsFavorited) ===
					JSON.stringify(newFavs)
				) {
					return prev; // Avoid setting state if the favorite list hasn't changed
				}
				return {
					...prev,
					authorData: {
						...prev.authorData,
						patternsFavorited: newFavs,
					},
				};
			});
		}
	};

	/**
	 * Ensures that there's a valid token and sets the user to state if the token checks out
	 */
	useEffect(() => {
		const checkUser = async () => {
			const token = storage.getToken();

			// Check if no token exists and the user is already logged out
			if (!token) {
				if (!authState.authenticated) {
					setAuthState({ authenticated: false, authorData: null });
				}
				setLoading(false); // Only set authLoading to false here
				return;
			}

			try {
				const userData = await authService.getUserFromToken(token);
				if (userData) {
					console.log('User data retrieved:', userData);
					setAuthState(prev => {
						// Only set state if the values have changed
						if (
							prev.authenticated === true &&
							prev.authorData?.id === userData.id &&
							JSON.stringify(prev.authorData) === JSON.stringify(userData)
						) {
							return prev; // Avoid unnecessary re-renders if no change
						}
						return {
							authenticated: true,
							authorData: {
								id: userData.id,
								username: userData.username,
								role: userData.role,
								email: userData.email,
								patternsAuthored: userData.patternsAuthored,
								patternsFavorited: userData.patternsFavorited,
								commentsAuthored: userData.commentsAuthored,
							},
						};
					});
				} else {
					console.log('User data is null or undefined, setting auth to false.');
					setAuthState({ authenticated: false, authorData: null });
				}
			} catch (error) {
				console.error('Error fetching user data:', error);
				setAuthState({ authenticated: false, authorData: null });
			} finally {
				setLoading(false); // Ensure loading state is only set once
			}
		};
		checkUser();
	}, [authState.authenticated]);

	return (
		<AuthContext.Provider
			value={{
				authLoading,
				authState,
				setAuthState,
				loginToAuthState,
				logoutFromAuthState,
				updateUserData,
				handleFavPatternChange,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
