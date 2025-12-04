import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import config from '../config';

const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            console.log(token);
            if (!token) {
                return res.status(500).json({ message: "You are not alow" })
            }
            const decode = jwt.verify(token, config.jwt_secret as string)
            req.user = decode as JwtPayload;
            next();
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}
export default auth
