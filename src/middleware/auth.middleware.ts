import {Request, Response, NextFunction} from 'express';
import { AppError } from '../apperrors/apperrors';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(`Custom middleware: ${err}`);
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            error: err.name,
            message: err.message
        });

        return;
    }

    res.status(500).json({ error: 'error',
        message: 'Server Error'
    });
};

export const authenticateKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey){
        res.status(401).json({
            status: 'fail',
            message: 'Unauthorised: Missing api-key header'
        });

        return;
    }
    next();
};