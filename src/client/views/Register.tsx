import React, { useState } from "react";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<div>
			<h1>Register here!</h1>
		</div>
	);
};

export default Register;
