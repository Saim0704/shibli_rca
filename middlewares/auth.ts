import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { IUser } from 'models/user';

export const issueJWT = (user: IUser) => {
  const expiresIn = '1d';
  const payload = {
    sub: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: expiresIn,
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
};

const verifyJWT = (token: string) => {
  try {
    const extractedToken = token.split(' ')[1];
    const decoded = JWT.verify(extractedToken, process.env.JWT_SECRET!);
    return {
      valid: true,
      expired: false,
      payload: decoded,
    };
  } catch (err: any) {
    console.log(err);
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      payload: null,
    };
  }
};

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['authorization'];

    if (!token) throw new Error('No token');

    const { valid, expired, payload } = verifyJWT(token);
    if (!valid || expired) throw new Error('Valid or expired');

    req.user = payload.sub;
    req.authenticated = true;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
};
