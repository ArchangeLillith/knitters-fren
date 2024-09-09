import React, {
	FormEvent,
	MouseEventHandler,
	useContext,
	useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import registerService from "../services/auth";
import { AuthContext } from "../components/AuthProvider";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const validateFields = (
		email: string,
		password: string,
		confirmPassword: string,
		username: string
	) => {
		const errors: string[] = [];
		if (!isValidEmail(email)) errors.push("invalid email");
		if (password !== confirmPassword) errors.push("passwords don't match");
		if (!password || !username || !email)
			errors.push("all fields are required");
		return errors;
	};

	const registerUser = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const errors = validateFields(email, password, confirmPassword, username);

		if (errors.length > 0) {
			console.log(errors.join(", "));
			return;
		}
		const authorDTO = { email, password, username };
		const token = await registerService.registerUser(authorDTO);
		login(token);
		//Go home!
		navigate(`/`);
	};

	return (
		<Container>
			<div className="d-flex align-items-center flex-column justify-content-center">
				<div className="d-flex align-items-center flex-column justify-content-center p-2 my-5 mx-3 bg-soft border-pink rounded w-50">
					<h3>Nice to meet you</h3>
					<img
						src="/images/nice-to-meet-you-nanachi.png"
						alt="teacup-nanachi"
						style={{
							width: "250px",
						}}
					/>
					<form onSubmit={registerUser}>
						<div className="form-group">
							<label htmlFor="emailInput">Email address</label>
							<input
								type="email"
								className="form-control"
								id="emailInput"
								aria-describedby="emailHelp"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="usernameInput">Username</label>
							<input
								type="text"
								className="form-control"
								id="usernameInput"
								aria-describedby="username"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="passwordInput">Password</label>
							<input
								type="password"
								className="form-control"
								id="passwordInput"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="confirmPassword"> Confirm password</label>
							<input
								type="password"
								className="form-control"
								id="confirmPassword"
								aria-describedby="password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<button type="submit" className="btn btn-primary mb-2">
							Submit
						</button>
						<div>
							Already have an account? Log in{" "}
							<Link to="/login" style={{ color: "#cb8585" }}>
								here!
							</Link>
						</div>
					</form>
				</div>
			</div>
		</Container>
	);
};

export default Register;

function isValidEmail(email: string) {
	return email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
}
