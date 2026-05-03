import { useState , createContext,useContext} from "react";






const Authcontext =createContext()


export const AuthProvider = ({children})=>{
    const [user,setUser]=useState(()=>{
        const storeUser = localStorage.getItem("user")
        return storeUser ? JSON.parse(storeUser):null
    })

    const login = (userData,token)=>{
        setUser(userData)
        localStorage.setItem("user",JSON.stringify(userData))
        localStorage.setItem("token",token)

    }
    const logout = ()=>{
        setUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }
    return (
        <Authcontext.Provider value={{user,login,logout}}>
            {children}
        </Authcontext.Provider>
    )
}
export const useAuth =()=> useContext(Authcontext)
export default AuthProvider
