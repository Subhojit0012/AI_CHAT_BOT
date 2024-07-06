import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompleteValidator, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat.controller.js";

// openai API
const chatRoutes = Router();
chatRoutes.post("/new",validate(chatCompleteValidator), verifyToken, generateChatCompletion);

export default chatRoutes