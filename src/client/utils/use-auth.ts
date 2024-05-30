import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import storage from "../utils/storage";

export const useAuth = () => {
	const navigate = useNavigate();
	const [authState, setAuthState] = useContext(AuthContext);

	//If the user sucessfully signs in, the state is set and they get naavigated to the passed in path param
	const signin = (path: string) => {
		setAuthState((prev) => ({ ...prev, authenticated: true }));
		navigate(path);
	};
//The user is logged out, setting state to reflect the change and then removing their token from local storage. They're then redirected to the login view
	const logout = () => {
		setAuthState((prev) => ({ ...prev, authenticated: false }));
		storage.removeToken();
		navigate("/login");
	};
	return {
		authenticated: authState.authenticated,
		signin,
		logout,
	};
};