
import { AppBar, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import { Navlink } from "./shared/Link";

export default function Header(){
    const auth = useAuth();

    return(
        <AppBar sx={{bgcolor: "transparent", position: "static", boxShadow: "none"}}>
            <Toolbar sx={{display: "flex"}}>
                <Logo />
                <div>
                {auth?.isLoggedIn ? 
                (<>
                <Navlink bg="#00fffc" to="/chat" text="go to chat" textColor="black"/>
                <Navlink bg="#51538f" to="/" text="logout" textColor="white" onClick={auth.logOut}/>
                </>) :
                (<>
                <Navlink bg="#00fffc" to="/login" text="login" textColor="black"/>
                <Navlink bg="#51538f" to="/signup" text="signup" textColor="white"/>
                </>)
                }
            </div>
            </Toolbar>
        </AppBar>
    )
}