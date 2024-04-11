import { FCC } from "../@types/types";
import NotLogged from "../routes/NotLogged";

const ProtectedRout: FCC = ({ children }) => {
    const isLoggedIn = localStorage.getItem('jwt');
    if (!isLoggedIn) {
        return <NotLogged />
    }
    return (
        <>{children}</>
    )

}

export default ProtectedRout