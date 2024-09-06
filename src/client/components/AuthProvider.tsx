import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth";
import storage from "../utils/storage";
import { IUser } from "../utils/types";

interface AuthState extends IUser {
	authenticated: boolean;
}

interface AuthContextType {
	authState: AuthState;
	setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
	login: (token: string) => void;
	logout: () => void;
	updateUserData: (userData: Partial<IUser>) => void;
}

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

const AuthProvider = (props: AuthProviderProps) => {
	const [authState, setAuthState] = useState<AuthState>({
		authenticated: false,
	});

	const login = async (token: string) => {
		try {
			console.log(`Login triggered`);
			const userData = await authService.validateToken(token);
			console.log(`userdata from validate token`, userData);
			setAuthState({ authenticated: true, ...userData });
		} catch (error) {
			console.log(`Error in loggin in`);
			setAuthState({ authenticated: false });
		}
	};

	const logout = () => {
		setAuthState({ authenticated: false });
	};

	// Function to update user data in the state
	const updateUserData = (userData: Partial<IUser>) => {
		setAuthState((prevState) => ({
			...prevState,
			...userData,
		}));
	};

	useEffect(() => {
		const token = storage.getToken();
		if (!token) {
			setAuthState({ authenticated: false });
			return;
		}
		authService
			.validateToken(token)
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
