import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { COOKIE_NAME } from './constants.js'
import { ifError } from 'assert'

// Create Token:
export const createToken = (id:string, email:string, expiresIn: string)=> {
    const payload = {
        id, 
        email
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    })
    return token
}

// verify Token:
export const verifyToken = (req:Request, res:Response, next:NextFunction )=> {
    const token = req.signedCookies[`${COOKIE_NAME}`]
    if(!token || token.trim() === ""){
        return res.status(401).json({message:"Token not Received"})
    }
    return new Promise<void>((resolve, reject)=> {
        return jwt.verify(token, process.env.JWT_SECRET, (err:Error, success)=> {
            if(err){
                reject(err.message);
                return res.status(401).json({message: "Token expired"})
            } else {
                console.log("Token verification Successful")
                resolve()
                res.locals.jwtData = success;
                return next()
            }
        })
    })
}   