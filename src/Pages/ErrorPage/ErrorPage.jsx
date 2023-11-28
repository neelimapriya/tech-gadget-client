import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen bg-black text-center flex flex-col justify-center space-y-6 ">
            <h2 className="text-7xl font-extrabold text-red-700 animate-pulse">404</h2>
            <p className="text-lg text-gray-200">The page you were looking for does not exist.</p>
            <div>
               <Link to='/'>
               <button className="btn ">Go Back</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;