import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import config from './config';
import {
	globalErrorHandler,
	notFoundHandler,
} from './middlewares/error-handlers.mw';
import { configurePassport } from './middlewares/passport.mw';
import routes from './routes';

const app = express();

console.log(`Recompiled server.ts`);

// Apply CORS middleware for all environments
app.use(
	cors({
		origin:
			process.env.NODE_ENV === 'production'
				? ['https://your-production-domain.com']
				: ['http://localhost:8000'],
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

// Configure Passport middleware
configurePassport(app);

// Enable JSON request parsing
app.use(express.json());

// Apply logging in development mode only
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Serve static files only in production
if (process.env.NODE_ENV === 'production') {
	const staticPath = path.join(__dirname, '../public');
	app.use(express.static(staticPath));

	// Routes and API endpoints
	app.use('/api', routes);
	app.use('/auth', routes);

	// Handle client-side routing (serve index.html for any unmatched route)
	app.get('/*', (req, res) => {
		res.sendFile(path.join(staticPath, 'index.html'));
	});
}

// Handle 404 errors
app.use(notFoundHandler);

// Global error handling
app.use(globalErrorHandler);

// Start the server and bind to the correct port
const PORT = process.env.PORT || config.app.port;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}~`);
	console.log(`Running Node.js version: ${process.version}`);
});
