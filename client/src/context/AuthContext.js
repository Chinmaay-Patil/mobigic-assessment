import React, {useState,useContext,createContext} from "react";



const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export default function  AuthProvider({children}){
    const [currentUser,setCurrentUser]=useState();
    const value = {
        currentUser,setCurrentUser
    }

    return(
        <div>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </div>
    )

}
