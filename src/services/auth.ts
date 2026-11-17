import argon2 from 'argon2';
import { UserModel } from '../models/users';
import { mongo } from 'mongoose';
import { UserAlreadyExistsError } from '../apperrors/apperrors';

//anyone can ready the payload so don't put anything secret here
//like the password hash

export interface TokenPayload{
    sub: string; //user's id
    email: string;
}

export interface PublicUser{
    _id: string;
    name: string;
    email: string;
}

//OWASP minimum settings for Argon2id: 19MiB memory, 2 iterations, 1 thread
const hashOptions ={
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
} as const;

export class AuthService{
    async register(name: string, email: string, password:string):
    Promise<PublicUser> {
        const passwordHash = await argon2.hash(password, hashOptions);

        try{
            const user = await UserModel.create({name, email, passwordHash});
            //build the response by hand so the hash never leaves the server
            return {_id: user._id.toString(), name: user.name, email: user.email};
        }
        catch(error){
            if (error instanceof mongo.MongoServerError && error.code === 11000){
                throw new UserAlreadyExistsError();
            }
            throw error;
        }

    }
}