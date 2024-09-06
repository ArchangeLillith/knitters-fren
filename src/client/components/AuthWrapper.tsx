import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

interface AuthWrapperProps {
	children: React.ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
	const { authState } = useContext(AuthContext);
	if (!authState.authenticated) {
		const stateToPass = { from: location.pathname };
		console.log("From location in Auth:", stateToPass);
		return <Navigate to="/login" state={stateToPass} />;
	}
	return <>{children}</>;
};

export default AuthWrapper;
