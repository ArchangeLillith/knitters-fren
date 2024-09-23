import type { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const error = new Error(`${req.method} ${req.originalUrl} not found :(`);
	error["status"] = 404;
	next(error);
};

export const globalErrorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	//Thios is a test
	console.log(error);
	res.status(error["status"] || 500);
	res.json({ error: error.message });
};
