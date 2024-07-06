import { Box, Typography, Button } from "@mui/material";
import { CustomisedInput } from "../components/shared/CustomInput";
import { CgLogIn } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login(){
    const auth = useAuth()
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email") as string
        const password = formData.get("password") as string
        try {
            toast.loading("Signing in!", {id: "login"})
            await auth?.logIn(email, password)
            toast.success("Signin successfully", {id: "login"})
        } catch (error) {
            console.log(error)
            toast.error("Failed to Sign-Up!",{id: "login"})
        }
    }
    return (
        <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
            <Box padding={8} mt={8} display={{md: 'flex', sm:'none', xs:'none'}}>
                <img className="robot-img" src="robot.png" alt="Robot" style={{width: "400px"}}/>
            </Box>
            <Box display={'flex'} flex={{xs: 1, md: 0.5}} justifyContent={'center'} alignItems={'center'} padding={2} ml={'auto'} mt={16}> 
            <form 
            onSubmit={handleSubmit}
            style={{
                margin: 'auto',
                padding: '30px',
                boxShadow:'10px 10px 20px #000',
                borderRadius: '10px',
                border: 'none'
            }}
            >
                <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>Login</Typography>
                    <CustomisedInput type="email" name="email" lable="Email" />
                    <br />
                    <CustomisedInput type="password" name="password" lable="Password" />
                    <Button 
                    type="submit" 
                    sx={{
                        px:2, 
                        py:1, 
                        mt:2, 
                        width:"400px", 
                        borderRadius:2, 
                        bgcolor: '#368fbf',
                        color:"#040c4d",
                        transition: "background-color 0.3s ease",
                        ":hover":{
                            bgcolor:'white',
                            color: 'black'
                        }
                    }}
                    endIcon={<CgLogIn/>}
                    >Login</Button>
                </Box>
            </form>
            </Box>
        </Box>
    )
}