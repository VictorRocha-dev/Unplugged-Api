import { env } from '@/env';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
  id: string;
  iat: number;
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: 'Token not provided' });
	}

	const [, token] = authorization.split(' ');

	try {
		const decoded = verify(token, env.TOKEN_KEY);
		const { id } = decoded as TokenPayload;

		req.user = { id }; 
		next();
	} catch (err) {
		return res.status(401).json({ error: 'Invalid token' });
	}
}
