import {
  FaAddressBook,
  FaBookmark,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaPen,
  FaProductHunt,
  FaSearch,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dasboard = () => {
  return (
    <div>
      <div className="flex ">
        {/* dashboard sidebar */}
        <div className="w-64 min-h-screen bg-gradient-to-r from-pink-800 to-pink-950 text-white">
          <ul className="menu">
            {/* shared navlinks */}
            <div className="divider"></div>
            <li className="p-4">
              <NavLink to="/dashboard/userHome">
                <FaHome></FaHome> My profile
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink to="/dashboard/addProduct">
                <FaPen></FaPen> Add Products
              </NavLink>
            </li>

            <li className="p-4">
              <NavLink to="/dashboard/userProducts">
                <FaShoppingCart></FaShoppingCart> My Products
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink to="/dashboard/AllUser">
                <FaUser></FaUser> All User
              </NavLink>
            </li>

            <div className="divider"></div>
            <li className="p-4">
              <NavLink to="/">
                <FaHome></FaHome> Home
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink to="/order/salad">
                <FaSearch></FaSearch> Menu
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
