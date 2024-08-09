import React from "react";
import Container from "../components/Container";
import { Link } from "react-router-dom";
import { PiYarnLight } from "react-icons/pi";

interface LoginProps {}

const Login = (props: LoginProps) => {
	return (
		<Container>
			<div className="d-flex align-items-center flex-column justify-content-center">
				<div className="d-flex align-items-center flex-column justify-content-center p-2 my-5 mx-3 bg-soft border-primary rounded w-50">
					<h3>Welcome back~</h3>
					<a
						href="https://x.com/vbnmat"
						target="_blank"
						data-bs-toggle="tooltip"
						data-bs-placement="top"
						title="Meet the artist!"
					>
						<img
							src="/images/pancake-nanachi.png"
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
