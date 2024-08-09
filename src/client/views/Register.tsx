import React, { useState } from "react";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	
	return (
		<div>
			<h1>Register component rendered</h1>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<p>Email: {email}</p>
			<p>Password: {password}</p>
		</div>
	);
};

export default Register;
