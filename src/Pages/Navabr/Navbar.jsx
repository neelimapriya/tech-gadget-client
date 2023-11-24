import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/logo-12.png'
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
    const {user}=useAuth()

    const navlink=(
        <>
        <li>
            <NavLink>Home</NavLink>
        </li>
        </>
    )

  return (
    <div>
      <div className="navbar fixed  z-10 bg-opacity-5 bg-black text-white max-w-screen-xl mx-auto">
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
        <div className="flex justify-center items-center outline">
        <img src={logo} alt="" />
        <h2 className="text-2xl font-serif text-red-700 font-bold">Tech Gadget</h2>
        </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
           
            {/* <li tabIndex={0}>
              <details>
                <summary>Paret</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
           {navlink}
          </ul>
        </div>
        <div className="navbar-end">
          <Link to='/login'>
          <div className="flex flex-col justify-center items-center ">
            <h2 className="text-xl font-semibold font-serif">Sign Up</h2>
            <p>Or,Create an account</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
