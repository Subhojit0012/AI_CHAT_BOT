import { body, ValidationChain, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";


export const validate = (validations: ValidationChain[])=> {
    return async (req: Request, res:Response, next:NextFunction)=> {
        for(let validation of validations){
            const result = await validation.run(req)
            if(!result.isEmpty()){
                break;
            }
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        } res.status(422).json({errors: errors.array()})
    }
}

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is reuired!"),
    body("password").trim().isLength({min:6}).withMessage("Password should contain atleast 6 digit!")
]

export const signupValidator = [
    body("name").notEmpty().withMessage("Name is reuired!"),
    ...loginValidator
]

export const chatCompleteValidator = [
    body("message").notEmpty().withMessage("Message is reuired!"),
]