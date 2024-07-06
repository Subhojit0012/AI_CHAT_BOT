import { Box, Avatar, IconButton} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import {Typography, Button} from "@mui/material"; 
import { purple } from "@mui/material/colors";
import {ChatItem} from "../components/chat/ChatItem";
import { AiOutlineSend } from "react-icons/ai";
import { useRef, useState } from "react";
import { sendChatRequest } from "../helpers/api-communicate.ts";
import toast from "react-hot-toast";


type Message = {
    role:"user" | "assistant";
    content:string;
}

const Chat = ()=> {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const auth = useAuth()
    const [chatMessages, setChatMessages] = useState<Message[]>([])

    const handleSubmit = async()=> {
        const content = inputRef.current?.value as string;
        if(inputRef && inputRef.current){
            inputRef.current.value = "";
        }
        const newMessage: Message = {role: "user", content};
        setChatMessages((prev)=> [...prev, newMessage]);
        const chatData = await sendChatRequest(content);
        setChatMessages([...chatData.chats]);
    }
    return (
        <Box
        sx={{
            display:'flex',
            flex:1,
            width:'100%',
            height:'100%',
            mt:3,
            gap:3
        }}
        >
            <Box sx={{display:{md:'flex', sm:'none', xs:'none'}, flex:0.2, flexDirection:'column'}}>

                <Box sx={{display:'flex', width:'100%', height:'60vh', bgcolor:'rgb(17, 29, 39)', borderRadius:5, flexDirection:'column', mx:3}}>

                    <Avatar sx={{mx:"auto", my:2, bgcolor:'white', color:'black', fontWeight:700}}>

                        {auth?.user?.name[0]}{auth?.user?.name.split("")[1][0]}
                    </Avatar>

                    <Typography
                    sx={{mx:'auto', fontFamily:'Roboto Condensed, sans-serif'}}
                    >
                        You are talking to a Chat-Bot
                    </Typography>

                    <Typography
                    className="typogrphy-font"
                    sx={{mx:'auto', fontFamily:'Montserrat, sans-serif', my:4, p:3}}
                    >
                        You can ask some question related to Knowledge, Business,
                        Advices, Education, etc.<b>But aviod sharing personal info.</b>
                    </Typography>

                    <Button
                    sx={{
                        width:"200px",
                        my:"auto",
                        color:'white',
                        fontWeight:"800",
                        fontFamily:'Montserrat, sans-serif',
                        borderRadius:3,
                        mx:"auto",
                        bgcolor:purple[800],
                        ":hover":{
                            bgcolor:purple[500]
                        }
                    }}
                    >Clear Coversation</Button>
                </Box>
            </Box>
            <Box sx={{display:"flex", flex:{md: 0.8, xs: 1, sm: 1}, flexDirection:"column", p:3}}>
                <Typography
                sx={{
                    textAlign:"center",
                    fontSize:"40px",
                    color:"white",
                    mb:2,
                    mx:'auto'
                }}
                >Model - GPT-3.5 Turbo
                </Typography>

                <Box
                sx={{
                    display:"flex",
                    width:"100%",
                    height:"60vh",
                    borderRadius:3,
                    mx:"auto",
                    flexDirection:"column",
                    overflow:"scroll",
                    overflowX:"hidden",
                    overflowY:"auto",
                    scrollBehavior:"smooth",
                    bgcolor:"rgb(23, 29, 48)",
                    p:1
                }}
                >
                    
                    {chatMessages.map((chat, index)=>
                    (<ChatItem content={chat.content} role={chat.role} key={index}/>))}

                </Box>
                <div style={{width:"98.4%", padding:"20px", borderRadius:8, backgroundColor:"rgb(17, 27, 39)", display:'flex', margin:'auto'}}>
                    {" "}
                <input type="text" ref={inputRef} style={{width:'100%', backgroundColor:'transparent', padding:'10px', border:'none', outline:'none',color:'white', fontSize:'20px'}} />

                <IconButton sx={{ml:'auto', color:'white'}} onClick={handleSubmit}>
                    <AiOutlineSend />
                </IconButton>
                </div>
            </Box>
        </Box>
    )
}

export default Chat;