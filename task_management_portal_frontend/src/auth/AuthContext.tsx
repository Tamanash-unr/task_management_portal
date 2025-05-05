import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth0 } from "@auth0/auth0-react";

interface AuthProviderProps {
    children: ReactNode;
}

type AuthState = {
    isAuthenticated: boolean;
    user: string | null;
}

interface AuthContextType {
    authState: AuthState;
    handleLogin: (username: string) => void;
    handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, setAuthState] = useState<AuthState>(() => {
        const saved = localStorage.getItem("auth");
        return saved ? JSON.parse(saved) : { isAuthenticated: false, user: null }
    })

    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    useEffect(() => {
        if(isAuthenticated){
            console.info("Logged in To..")
        }
    }, [isAuthenticated])

    const handleLogin = (username: string) => {
        console.log(username)
        // const newAuth = { isAuthenticated: true, user: username };
        // setAuthState(newAuth);
        // localStorage.setItem("auth", JSON.stringify(newAuth))
        loginWithRedirect()
    };

    const handleLogout = () => {
        logout()
        localStorage.removeItem("auth");
        setAuthState({ isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider
            value={{ authState, handleLogin, handleLogout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}