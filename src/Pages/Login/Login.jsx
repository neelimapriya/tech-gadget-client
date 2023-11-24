import { Link } from "react-router-dom";
import SocialLogin from "../../Hooks/SocialLogin";

const Login = () => {
    return (
        <div>
            <div className="bg-black text-white h-72">
                <h2 className="pt-56 flex justify-center items-center text-4xl font-serif font-semibold">My Account</h2>
            </div>
            <div className="hero min-h-screen bg-gradient-to-r from-pink-800 via-pink-900 to-black ">
        <div className="hero-content ">
          
          <div className="card   shadow-2xl bg-base-100">
            <form  className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
             

              <div className="form-control mt-6">
                <input
                // disabled={disabled} 
                
                  type="submit"
                  value="Login"
                  className="bg-gradient-to-r from-pink-900 to-black text-white hover:from-green-700 hover:to-yellow-500 py-3 rounded-lg"
                />
              </div>
            </form>
            <p className="text-center pb-3"><small>New here ? <Link className="text-yellow-600" to="/signup">Create an account.</Link></small></p>
            <SocialLogin></SocialLogin>
          </div>
         
        </div>
      </div>
    </div>
  );
};


export default Login;