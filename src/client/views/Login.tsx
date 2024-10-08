/* eslint-disable react/no-unescaped-entities */
import React, {
	FormEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../components/AuthComponents/AuthProvider';
import Container from '../components/Container';
import { useFadeIn } from '../hooks/useFadeIn';
import loginService from '../services/auth';
import { locationStrings } from '../utils/types';

const Login = () => {
	const [password, setPassword] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);
	const isVisible = useFadeIn(10); // 100ms delay
	const { loginToAuthState } = useContext(AuthContext);
	const navigate = useNavigate();
	const { state } = useLocation();
	const fromLocation = state?.from;

	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const token = await loginService.authenticateUserAndStoreToken({
				username,
				password,
			});
			if (!token) return;
			loginToAuthState(token);
			navigate(`/`);
		} catch (error) {
			console.error('Error logging in:', error);
		}
	};

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<Container>
			<div
				className={`fade-in ${isVisible ? 'visible d-flex align-items-center flex-column justify-content-center' : 'd-flex align-items-center flex-column justify-content-center'}`}
			>
				{fromLocation && (
					<div className="d-flex align-items-center">
						<div>
							You've been redirected from the {locationStrings[fromLocation]}{' '}
							page because you need to be logged in to access that page
						</div>
					</div>
				)}
				<div className="d-flex align-items-center flex-column justify-content-center p-2 my-5 mx-3 bg-soft border-pink rounded w-50">
					<h3>Welcome back~</h3>
					<img
						src="https://knitters-fren.s3.ca-central-1.amazonaws.com/website-images/pancake-nanachi.png"
						alt="teacup-nanachi"
						style={{
							width: '250px',
						}}
					/>
					<form onSubmit={handleLogin}>
						<div className="form-group">
							<label htmlFor="emailInput">Email or username</label>
							<input
								ref={inputRef}
								onChange={e => setUsername(e.target.value)}
								type="email"
								className="form-control"
								id="emailInput"
								aria-describedby="email auto-focus"
							/>
						</div>
						<div className="form-group mb-2">
							<label htmlFor="passwordInput">Password</label>
							<input
								onChange={e => setPassword(e.target.value)}
								type="password"
								className="form-control"
								id="passwordInput"
							/>
						</div>
						<button type="submit" className="btn btn-primary mb-2">
							Submit
						</button>
						<div>
							Don't have an account? Register{' '}
							<Link to="/register" style={{ color: '#cb8585' }}>
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
