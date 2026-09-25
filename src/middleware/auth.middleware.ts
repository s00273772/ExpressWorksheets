import {Request, Response, NextFunction} from 'express';

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