import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import {FaGoogle  } from 'react-icons/fa';


const SocialLogin = () => {

    const axiosPublic=useAxiosPublic()
    const {googleSignIn}=useAuth()
    const navigate=useNavigate()

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user)
            const userInfo={
                email:result?.user?.email,
                name:result?.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res=>{
                console.log(res.data)
                navigate('/')

            })
        })
    }

    return (
        <div className="">
        <div className="divider"></div>
        <div>
            <button onClick={handleGoogleSignIn} className="btn w-full text-orange-600">
                <FaGoogle className="text-green-600 text-xl"></FaGoogle>Continue with Google
                </button></div>            
        </div>
    );
};

export default SocialLogin;