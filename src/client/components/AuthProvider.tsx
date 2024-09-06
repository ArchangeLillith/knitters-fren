import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth";
import storage from "../utils/storage";
import { IPattern, IUser } from "../utils/types";

interface AuthState extends IUser {
	authenticated: boolean;
}

// Extend AuthContext to include a login function
interface AuthContextType {
	authState: AuthState;
	setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
	login: (token: string) => void;
	updateUserData: (userData: IUser) => void; // Function to update user data
}

export const AuthContext = createContext<AuthContextType>({
	authState: { authenticated: false },
	setAuthState: () => {},
	login: () => {},
	updateUserData: () => {},
});

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
	const [authState, setAuthState] = useState<AuthState>({
		authenticated: false,
	});

	const login = () => {
		setAuthState((prevState) => ({
			...prevState,
			authenticated: true,
		}));
	};

	// Function to update user data in the state
	const updateUserData = (userData: IUser) => {
		setAuthState((prevState) => ({
			...prevState,
			...userData,
		}));
	};

	useEffect(() => {
		const token = storage.getToken();
		if (!token) {
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
			value={{ authState, setAuthState, login, updateUserData }}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
