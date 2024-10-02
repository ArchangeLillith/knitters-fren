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

console.log(`Running Node.js version: ${process.version}`);
configurePassport(app);

app.use(express.json());

if (process.env.NODE_ENV === 'production') {
	// Serve static files only in production
	app.use(express.static(path.join(__dirname, '../../public')));
}

// Logging based on environment
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Routes and APIs
app.use(routes);

// Handle client-side routing by sending index.html for non-API routes
app.get('/*', (req, res) =>
	res.sendFile(path.join(__dirname, '../../public/index.html'))
);

// Error Handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Dynamic port binding
const PORT = process.env.PORT || config.app.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}~`));
