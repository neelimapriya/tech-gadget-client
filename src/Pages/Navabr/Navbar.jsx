import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo-12.png";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogout = () => {
    logOut().then().catch();
  };

  const navlink = (
    <>
      <li className="text-xl font-serif hover:text-red-700">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-xl font-serif  hover:text-red-700">
        <NavLink to="/products">Products</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar fixed  z-10 bg-opacity-5 bg-black text-white  max-w-screen-xl mx-auto ">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlink}
            </ul>
          </div>
          <div className="flex justify-center items-center outline p-1">
            <img src={logo} className="w-10 md:w-20 lg:w-28" alt="" />
            <h2 className="text-sm md:text-2xl font-serif text-red-700 font-bold">
              Tech Gadget
            </h2>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlink}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-bottom dropdown-end ">
              <label tabIndex={0} className=" avatar">
                <div className="w-7 h-7   md:w-12 md:h-12 rounded-full hover:cursor-pointer  ">
                  <img src={user?.photoURL} alt="" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow  rounded-box w-32 md:w-52 border"
              >
                <li>
                  <p className=" font-serif text-sm flex justify-center items-center  bg-slate-50 text-red-700">
                    {user?.displayName}
                  </p>
                </li>
                <li>
                <Link to='/dashboard/userHome'  className=" font-serif text-sm flex justify-center items-center bg-slate-50 text-red-700">
                
                    Dashboard
                  
                  </Link>
                </li>
               
                <li>
                  <p
                    onClick={handleLogout}
                    className="text-red-700 bg-slate-50 font-serif text-sm flex justify-center items-center"
                  >
                    LogOut
                  </p>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <div className="flex flex-col justify-center items-center ">
                <h2 className="text-xl font-semibold font-serif">Sign Up</h2>
                <p className="">Or,Create an account</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
