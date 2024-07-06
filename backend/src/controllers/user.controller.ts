import { NextFunction, Response, Request } from "express"
import { User } from "../models/User.model.js"
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
      // get all user
      const users = await User.find();
      return res.status(200).json({ message: "OK", users });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };

  export const userSignUp = async (req: Request, res: Response, next: NextFunction) => {
    //user signup
    try {
      const {name, email, password} = req.body

      const existingUser = await User.findOne({email})
      if(existingUser) return res.status(401).send("User already exist")

      const hashedPassword = await hash(password, 10);
      const user = new User({name, email, password: hashedPassword})

      await user.save()

      // create token and store cookie

      res.clearCookie(COOKIE_NAME, {path: "/",domain: "localhost", httpOnly: true, signed: true})

      const token = createToken(user._id.toString(), user.email, "7d")

      const expires = new Date();
      expires.setDate(expires.getDate() + 7)
      res.cookie(COOKIE_NAME, token, {path: "/", domain: "localhost", expires, httpOnly: true, signed: true})


      return res.status(200).json({ message: "OK", name: user.name, email: user.email});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  }; 

  export const userLogin = async (req:Request, res:Response, next:NextFunction) => {
    // user login
    try {
      const {email, password} = req.body
      const user = await User.findOne({email})

      if(!user) return res.status(401).send("User not Register")

      const isPasswordCorrect = await compare(password, user.password)

      if(!isPasswordCorrect) return res.status(403).send("Incorrect Password!")

      // cookies

      res.clearCookie(COOKIE_NAME, {path: "/", domain: "localhost", httpOnly: true, signed: true})

      const token = createToken(user._id.toString(), user.email, "7d")

      const expires = new Date();
      expires.setDate(expires.getDate() + 7)
      res.cookie(COOKIE_NAME, token, {path: "/", domain: "localhost", expires, httpOnly: true, signed: true})


      return res.status(200).json({ message: "OK", name: user.name, email: user.email});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };

  export const verifyUser = async (req:Request, res:Response, next:NextFunction) => {
    
    try {
      const user = await User.findById(res.locals.jwtData.id)

      if(!user) return res.status(401).send("User not registered or token malfunctioned")
      // console.log(user._id.toString(), res.locals.jwtData.id);
      if(user._id.toString() !== res.locals.jwtData.id){
        return res.status(401).send("Permission didn't match ❌")
      }
      return res.status(200).json({ message: "OK", name: user.name, email: user.email});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "ERROR", cause: error.message });
    }
  };