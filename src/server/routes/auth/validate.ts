import { Router } from 'express';

import { verifyToken } from '../../middlewares/verifyToken.mw';

const router = Router();

// GET /auth/validate/me
router.get('/me', verifyToken, (req, res, next) => {
	if (req.currentUser === null) {
		return res.status(401).json({ message: 'Not authorized' });
	}
	try {
		res.status(200).json({ message: 'success' });
	} catch (error) {
		next(error);
	}
});

export default router;
