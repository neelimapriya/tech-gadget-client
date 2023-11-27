import {
  FaBookOpen,
  FaEnvelope,
  FaHome,
  FaPen,
  
  FaShoppingCart,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useModaretor from "../Hooks/useModaretor";

const Dasboard = () => {
  const [isAdmin] = useAdmin();
  const [isModaretor] = useModaretor();
  return (
    <div>
      <div className="flex ">
        {/* dashboard sidebar */}
        <div className="w-52 min-h-screen bg-gradient-to-r from-pink-800 to-pink-950 text-white">
          <ul className="menu">
            {/* shared navlinks */}
            <div className="divider"></div>
            <li className="p-4">
                  <NavLink to="/dashboard/userHome">
                    <FaUserCircle></FaUserCircle> My profile
                  </NavLink>
                </li>
            {isAdmin ? (
              <li className="p-4">
                <NavLink to="/dashboard/AllUser">
                  <FaUser></FaUser> All User
                </NavLink>
              </li>
            ) : isModaretor ? (<>
              <li className="p-4">
                <NavLink to="/dashboard/queue">
                  <FaBookOpen></FaBookOpen> Queue Page
                </NavLink>
              </li>
              <li className="p-4">
                <NavLink to="/dashboard/reported">
                <IoIosWarning className="text-xl"/> Reported Contents
                </NavLink>
              </li>
              </>
            ) : (
              <>
                
                <li className="p-4">
                  <NavLink to="/dashboard/addProduct">
                    <FaPen></FaPen> Add Products
                  </NavLink>
                </li>
                <li className="p-4">
                  <NavLink to="/dashboard/userProducts">
                    <FaShoppingCart></FaShoppingCart> My Products
                  </NavLink>
                </li>{" "}
              </>
            )}
            {/* admin */}

            {/* modaretor */}

            {/* home page */}
            <div className="divider"></div>
            <li className="p-4">
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>

            <li className="p-4">
              <NavLink to="/order/contact">
                <FaEnvelope></FaEnvelope> Contact
              </NavLink>
            </li>
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 bg-slate-300">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
