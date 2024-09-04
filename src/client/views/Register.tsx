import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/Container";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const registerUser= () => {
		
	}

	return (
		<Container>
			<div className="d-flex align-items-center flex-column justify-content-center">
				<div className="d-flex align-items-center flex-column justify-content-center p-2 my-5 mx-3 bg-soft border-primary rounded w-50">
					<h3>Nice to meet you</h3>
					<a
						href="https://x.com/vbnmat"
						target="_blank"
						data-bs-toggle="tooltip"
						data-bs-placement="top"
						title="Meet the artist!"
					>
						<img
							src="/images/nice-to-meet-you-nanachi.png"
							alt="teacup-nanachi"
							style={{
								width: "250px",
							}}
						/>
					</a>
					<form>
						<div className="form-group">
							<label htmlFor="emailInput">Email address</label>
							<input
								type="email"
								className="form-control"
								id="emailInput"
								aria-describedby="emailHelp"
								placeholder="Enter email"
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="passwordInput">Password</label>
							<input
								type="password"
								className="form-control"
								id="passwordInput"
								placeholder="Password"
							/>
						</div>
						<button type="button" className="btn btn-primary mb-2" onClick={registerUser}>
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
