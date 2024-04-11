import { createContext, useEffect, useState } from "react";
import { FCC, JwtDecodeType } from "../@types/types";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext({
    isLoggedIn: false,
    isBiz: false,
    login: (jwt: string) => { },
    logout: () => { }
})
export const AuthProvider: FCC = ({ children }) => {
    const token = localStorage.getItem("jwt");
    const [isLoggedIn, setLogin] = useState(false)
    const [isBiz, setBiz] = useState(false);


    useEffect(() => {
        if (token) {
            setLogin(true);
            const decoded: JwtDecodeType = jwtDecode(token);
            setBiz(decoded.isBusiness)
        }
    }, []);

    const login = (jwt: string) => {
        setLogin(true)
        const decoded: JwtDecodeType = jwtDecode(jwt)
        setBiz(decoded.isBusiness)
        localStorage.setItem("jwt", jwt);
    };

    const logout = () => {
        setLogin(false)
        setBiz(false)
        localStorage.removeItem('jwt')
    };
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isBiz }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider