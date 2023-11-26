
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { HashLoader } from "react-spinners";

const PrivateRoute = ({children}) => {
    const {user, loading}=useAuth()
    const location =useLocation()
    if(loading){
        return <div className="flex justify-center items-center mt-40"><HashLoader size={100} color="black"></HashLoader></div>
    }
    if(user){
        return children
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;