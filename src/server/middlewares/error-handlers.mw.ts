import type { Request, Response, NextFunction } from "express";
//Catch 404 errors
//If nothing in the routes match, this is what will be shown
export const notFoundHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const error = new Error(`${req.method} ${req.originalUrl} not found`);
	error["status"] = 404;
	next(error);
};

//Catch all other errors
//Next is here from deep routes, this is an error handling middleware because it was called by 'next'. It's spit out from the deep nesting and gets caught here
//Error is used here in the params and is smart enough to understand that this is an error handler and will skip it if there is no error thrown
export const globalErrorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(error);
	//Ternary to show the error passed but setting the default to 500 if none was set
	res.status(error["status"] || 500);
	res.json({ error: error.message });
};
