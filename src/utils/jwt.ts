import jwt, { JwtPayload } from 'jsonwebtoken';

export const sign = (payload: JwtPayload) => jwt.sign(payload, process.env.SECRET_KEY);
