import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from './AuthProvider';

interface AuthWrapperProps {
	children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
	const { authState, loading } = useContext(AuthContext);

	if (loading) return <div>Loading...</div>;

	/**
	 * Throws the user to the login page with a message as to where they came from if thery're not logged in and trying to access the page this wraps as they shouldn't be allowed into the page without being logged in
	 */
	if (!authState.authenticated) {
		const stateToPass = { from: location.pathname };
		return <Navigate to="/login" state={stateToPass} />;
	}

	return <>{children}</>;
};

export default AuthWrapper;
