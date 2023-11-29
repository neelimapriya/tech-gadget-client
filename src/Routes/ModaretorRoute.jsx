import { Navigate, useLocation } from "react-router-dom";
import useModaretor from "../Hooks/useModaretor";
import useAuth from "../Hooks/useAuth";

const ModaretorRoute = ({children}) => {
    const {user,loading}=useAuth()
    const [isModaretor,isModaretorLoading]=useModaretor()

    const location =useLocation()
    if(loading || isModaretorLoading){
        return <div className="flex justify-center items-center mt-32"><progress className="progress w-56"></progress></div>
    }
    if(user && isModaretor){
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default ModaretorRoute;