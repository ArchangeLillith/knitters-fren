import React, { FormEvent, useContext, useState } from "react";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import loginService from "../services/auth";
import { AuthContext } from "../components/AuthProvider";
interface LoginProps {}

const Login = (props: LoginProps) => {
	const [password, setPassword] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const navigate = useNavigate();

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const { login } = useContext(AuthContext);
			//Authenticat and get the token
			const token = await loginService.loginUser({ username, password });
			//Use the token to update the auth state
			login(token);
			//Go home!
			navigate(`/`);
		} catch (error) {
			console.error("Error logging in:", error);
		}
	};
	return (
		<Container>
			<div className="d-flex align-items-center flex-column justify-content-center">
				<div className="d-flex align-items-center flex-column justify-content-center p-2 my-5 mx-3 bg-soft border-pink rounded w-50">
					<h3>Welcome back~</h3>
					<img
						src="/images/pancake-nanachi.png"
						alt="teacup-nanachi"
						style={{
							width: "250px",
						}}
					/>
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<label htmlFor="emailInput">Email or username</label>
							<input
								onChange={(e) => setUsername(e.target.value)}
								type="email"
								className="form-control"
								id="emailInput"
								aria-describedby="emailHelp"
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="passwordInput">Password</label>
							<input
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								className="form-control"
								id="passwordInput"
							/>
						</div>
						<button type="submit" className="btn btn-primary mb-2">
							Submit
						</button>
						<div>
							Don't have an account? Register{" "}
							<Link to="/register" style={{ color: "#cb8585" }}>
								here!
							</Link>
						</div>
					</form>
				</div>
			</div>
		</Container>
	);
};

export default Login;
