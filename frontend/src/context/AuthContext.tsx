import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser } from "../helpers/api-communicate";

type User = {
    name: string
    email: string
}

type UserAuth ={
    isLoggedIn: boolean
    user: User | null
    logIn: (email: string, password: string)=> Promise<void>
    signUp: (name:string, email: string, password: string)=> Promise<void>
    logOut: ()=> Promise<void>
}
const AuthContext = createContext<UserAuth | null>(null)

export const AuthProvider = ({children}: {children: ReactNode})=> {
    const [user, setUser] = useState<User|null>(null)
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(()=> {
        // fetch if the user's cookie are valid then skip logIn
        async function checkStatus() {
            const data = await checkAuthStatus();
            if(data){
                setUser({email:data.email, name:data.name})
                setisLoggedIn(true)
            }
        }
        checkStatus();
    }, [])

    const logIn = async(email: string, password:string)=> {
        const data = await loginUser(email, password);
        if(data){
            setUser({email:data.email, name:data.name})
            setisLoggedIn(true)
        }
    }
    const signUp = async(name:string, email: string, password:string)=> {}
    const logOut = async()=> {}

    const value = {
        user,
        isLoggedIn,
        logIn,
        logOut,
        signUp
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth =()=> useContext(AuthContext)