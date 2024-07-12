import React, { createContext, useState, useEffect } from "react";
import authService from "../services/auth";

//Bro what an ugly type lol
export const AuthContext = createContext<
	[
		{ authenticated: boolean; checking: boolean },
		React.Dispatch<
			React.SetStateAction<{
				authenticated: boolean;
				checking: boolean;
			}>
		>
	]
>([{ authenticated: true, checking: true }, () => {}]);

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider = (props: AuthProviderProps) => {
	const [authState, setAuthState] = useState<{
		authenticated: boolean;
		checking: boolean;
	}>({
		authenticated: false,
		checking: true,
	});

	useEffect(() => {
		authService
			.validateToken()
			.then(() => {
				setAuthState({ authenticated: true, checking: false });
			})
			.catch(() => setAuthState({ authenticated: false, checking: false }));
	}, []);

	//If your app isn't rendering, this is why. This will intercept the render and only give you what this is spitting out, so we need to tell it that it should render all it's children instead of itself. This allows us to wrap the whole app in a context and dodge having to prop drill
	return (
		<AuthContext.Provider value={[authState, setAuthState]}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
