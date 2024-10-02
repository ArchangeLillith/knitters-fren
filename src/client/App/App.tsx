//npm run dev to start the project in dev mode
//frontend on 8000
//server on 3000

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import AuthProvider from '../components/AuthComponents/AuthProvider';

const App = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppRoutes />
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
