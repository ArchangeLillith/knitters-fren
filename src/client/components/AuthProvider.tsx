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
	loginToAuthState: (token: string) => void;
	logoutFromAuthState: () => void;
	updateUserData: (userData: Partial<IAuthor>) => void;
}

/**
 * Auth state object that's going to get used by other components, initialized here
 */
export const AuthContext = createContext<AuthContextType>({
	authState: { authenticated: false },
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
		username: "",
		role: "user",
	});

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
				setAuthState({
					authenticated: true,
					id: userData.id,
					username: userData.username,
					role: userData.role,
				});
			})
			.catch(() => setAuthState({ authenticated: false }));
	}, []);

	return (
		<AuthContext.Provider
			value={{
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
