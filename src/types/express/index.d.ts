import { Request } from 'express';
import { express } from 'express';
import { JwtPayload } from 'jsonwebtoken';
declare global{
    namespace Express{
        interface Request{
            user?: JwtPayload;
        }
    }
}