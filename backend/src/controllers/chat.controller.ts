import { NextFunction, Response, Request } from "express";
import { User } from "../models/User.model.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { configureOpenAI } from "../config/openai.config.js";

export const generateChatCompletion = async (req:Request, res:Response, next:NextFunction) => {
    const {message} = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id)
        if(!user) return res.status(401).json({message: "User not registered or Token malfunctioned"})

    // grab chat of the users
        const chats = user.chats.map(({role, content})=> ({
            role, 
            content
        })) as ChatCompletionRequestMessage[]
        
        chats.push({content:message, role:"user"})
        user.chats.push({content:message, role:"user"})

    // send all chats with the new one to OPEN AI
        const config = configureOpenAI();
        const openAi = new OpenAIApi(config);

    // get latest response
        const chatResponse = await openAi.createChatCompletion({model:"gpt-3.5-turbo", messages:chats});
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({chats: user.chats});

    } catch (err) {
        // console.log(err);
        return res.status(401).json({message: "Something went wrong!"})
    }
}

export const sendChatsToUser =async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered!")
        }

        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission didn't allowed!")
        }
        return res.status(200).json({message:"OK", chats: user.chats});
    } catch (error) {
        console.log("Cann't send the caht to the user!")
        return res.status(200).json({message: "ERROR", cause: error.message});
    }
}

export const deleteChats =async (req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered!")
        }

        if(user._id.toString() !== res.locals.jwtData.id){
            return res.status(401).send("Permission didn't match!")
        }
        return res.status(200).json({message:"OK"});
    } catch (error) {
        console.log("Cann't send the caht to the user!")
        return res.status(200).json({message: "ERROR", cause: error.message});
    }
}