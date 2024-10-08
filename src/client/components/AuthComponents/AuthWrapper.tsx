import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

interface AuthWrapperProps {
	children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
	const { authState } = useContext(AuthContext);
	const location = useLocation();

	/**
	 * Throws the user to the login page with a message as to where they came from if thery're not logged in and trying to access the page this wraps as they shouldn't be allowed into the page without being logged in
	 */
	if (!authState.authenticated) {
		const stateToPass = { from: location.pathname }; // Use location.pathname safely
		return <Navigate to="/login" state={stateToPass} />;
	}

	return <>{children}</>;
};

export default AuthWrapper;
