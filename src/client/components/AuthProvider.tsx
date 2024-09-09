import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth";
import storage from "../utils/storage";
import { IAuthor } from "../utils/types";


interface AuthState extends IAuthor {
	authenticated: boolean;
}
/**
 * Typing for the auth state
 */
interface AuthContextType {
	authState: AuthState;
	setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
	login: (token: string) => void;
	logout: () => void;
	updateUserData: (userData: Partial<IAuthor>) => void;
}

/**
 * Auth state object that's going to get used by other components, initialized here
 */
export const AuthContext = createContext<AuthContextType>({
	authState: { authenticated: false },
	setAuthState: () => {},
	login: () => {},
	logout: () => {},
	updateUserData: () => {},
});

interface AuthProviderProps {
	children: React.ReactNode;
}

/**
 * 
 * @param props - children that wrapped by this component
 * @returns The auth context wrapping all the children that were passed in
 */
const AuthProvider = (props: AuthProviderProps) => {
	const [authState, setAuthState] = useState<AuthState>({
		authenticated: false,
	});

	/**
	 * The function that handles the auth state to reflect a log in
	 * @param token - JWT token to be stored in local storage
	 */
	const login = async (token: string) => {
		try {
			console.log(`Login triggered`);
			const userData = await authService.getUserFromToken(token);
			console.log(`userdata from validate token`, userData);
			setAuthState({ authenticated: true, ...userData });
		} catch (error) {
			console.log(`Error in loggin in`);
			setAuthState({ authenticated: false });
		}
	};

	/**
	 * The function that resets a user in auth state when they log out
	 */
	const logout = () => {
		setAuthState({ authenticated: false });
	};

/**
 * Updates the userdata in state for the components to use
 * @param userData - The user data from the user that just logged in 
 */
	const updateUserData = (userData: Partial<IAuthor>) => {
		setAuthState((prevState) => ({
			...prevState,
			...userData,
		}));
	};

	/**
	 * Ensures that there's a valid token and sets the user to state if the token checks out
	 */
	useEffect(() => {
		const token = storage.getToken();
		if (!token) {
			setAuthState({ authenticated: false });
			return;
		}
		authService
			.getUserFromToken(token)
			.then((userData) => {
				// Assuming validateToken returns user data
				setAuthState({ authenticated: true, ...userData });
			})
			.catch(() => setAuthState({ authenticated: false }));
	}, []);

	return (
		<AuthContext.Provider
			value={{ authState, setAuthState, login, logout, updateUserData }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
