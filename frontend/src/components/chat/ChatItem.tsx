import { Box } from "@mui/material"
import {Avatar, Typography} from "@mui/material"
import { useAuth } from "../../context/AuthContext"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkCold } from "react-syntax-highlighter/dist/esm/styles/prism"

export const ChatItem = ({content, role}:{content:string; role:"user" | "assistant";})=>{
    const auth = useAuth()

    return role === "assistant" ? 
    (<Box
    sx={{
        display:"flex",
        p:2,
        bgcolor:"#02113d",
        my:2,
        gap:2
    }}
    >
        <Avatar
        sx={{
            ml:0,
            bgcolor:'black'
        }}
        >
            <img src="ai.png" alt="Ai" width={'30px'}/>
        </Avatar>
        <Box>
            <Typography fontSize={'20px'}>{content}</Typography>
        </Box>
    </Box>) 
    : 
    (<Box
        sx={{
            display:"flex",
            p:2,
            bgcolor:"#020b29",
            gap:2
        }}
        >
            <Avatar
            sx={{
                ml:0,
                bgcolor:'black',
                color:'white'
            }}
            >
                {auth?.user?.name[0]}{auth?.user?.name.split("")[1][0]}
            </Avatar>
            <Box>
                <Typography fontSize={'20px'}>{content}</Typography>
            </Box>
        </Box>)
}