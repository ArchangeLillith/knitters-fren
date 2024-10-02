import React, { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../components/AuthComponents/AuthProvider';
import Container from '../components/Container';
import authService from '../services/auth';
import { validateFields } from '../utils/functions.utils';
import { FormFields } from '../utils/types';

const Register = () => {
	const { loginToAuthState } = useContext(AuthContext);
	const navigate = useNavigate();
	const [formFields, setFormFields] = useState<FormFields>({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
	});

	const registerUser = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const errors = validateFields(formFields);

		if (errors.length > 0) {
			console.log(errors.join(', '));
			return;
		}

		const { email, password, username } = formFields;
		const authorDTO = { email, password, username };

		try {
			const token = await authService.registerUserAndStoreToken(authorDTO);
			if (token) {
				loginToAuthState(token);
				navigate(`/`);
			}
		} catch (error) {
			console.error('Error logging in:', error);
		}
	};

	return (
		<Container>
			<div className="d-flex align-items-center flex-column justify-content-center">
				<div className="d-flex align-items-center flex-column justify-content-center p-2 my-5 mx-3 bg-soft border-pink rounded w-50">
					<h3>Nice to meet you</h3>
					<img
						src="https://knitters-fren.s3.ca-central-1.amazonaws.com/website-images/nice-to-meet-you-nanachi.png"
						alt="teacup-nanachi"
						style={{
							width: '250px',
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
								onChange={e =>
									setFormFields(prev => ({ ...prev, email: e.target.value }))
								}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="usernameInput">Username</label>
							<input
								type="text"
								className="form-control"
								id="usernameInput"
								aria-describedby="username"
								onChange={e =>
									setFormFields(prev => ({
										...prev,
										username: e.target.value,
									}))
								}
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="passwordInput">Password</label>
							<input
								type="password"
								className="form-control"
								id="passwordInput"
								onChange={e =>
									setFormFields(prev => ({
										...prev,
										password: e.target.value,
									}))
								}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="confirmPassword"> Confirm password</label>
							<input
								type="password"
								className="form-control"
								id="confirmPassword"
								aria-describedby="password"
								onChange={e =>
									setFormFields(prev => ({
										...prev,
										confirmPassword: e.target.value,
									}))
								}
							/>
						</div>
						<button type="submit" className="btn btn-primary mb-2">
							Submit
						</button>
						<div>
							Already have an account? Log in{' '}
							<Link to="/login" style={{ color: '#cb8585' }}>
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
