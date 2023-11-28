import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Registation/Register";
import Products from "../Components/Products/Products";
import CardDetails from "../Components/Cards/CardDetails";
import PrivateRoute from "./PrivateRoute";
import Dasboard from "../Layout/Dasboard";
import AddProducts from "../Pages/UserDashboard/AddProduct/AddProducts";
import UserHome from "../Pages/UserDashboard/UserHome/UserHome";
import MyProducts from "../Pages/UserDashboard/MyProducts/MyProducts";
import UpdateProducts from "../Pages/UserDashboard/UpdateProduct/UpdateProducts";
import Alluser from "../Pages/AdminDashboard/AllUser/Alluser";
import QueuePage from "../Pages/ModaretorDashboard/QueuePage/QueuePage";
import QueueProductDetails from "../Pages/ModaretorDashboard/QueuePage/QueueProductDetails";
import ReportedPage from "../Pages/ModaretorDashboard/ReportedPage/ReportedPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import VarifiedUser from "../Pages/VarifiedUser/VarifiedUser";


// import Products from "../Products/Products";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>,

        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>

        },
        {
          path:'/products',
          element:<Products></Products>,
          loader:()=>fetch('https://gadget-server.vercel.app/productCount')
        },
        {
          path:"/products/:id",
          element:<CardDetails></CardDetails>,
          loader:({params})=>fetch(`https://gadget-server.vercel.app/products/${params.id}`)
        }

      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dasboard></Dasboard></PrivateRoute>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        // user dashboard
        {
          path:'addProduct',
          element:<AddProducts></AddProducts>
        },
        {
          path:'userHome',
          element:<UserHome></UserHome>
        },
        {
          path:'userProducts',
          element:<MyProducts></MyProducts>
        },
        {
          path:"userProducts/updateProduct/:id",
          element:<UpdateProducts></UpdateProducts>,
          loader:({params})=>fetch(`https://gadget-server.vercel.app/products/${params.id}`)
        },
        
        // admin
        {
          path:'allUser',
          element:<Alluser></Alluser>
        },
        // modaretor
        {
          path:'queue',
          element:<QueuePage></QueuePage>
        },
        {
          path:'queue/queueDetails/:id',
          element:<QueueProductDetails></QueueProductDetails>,
          loader:({params})=>fetch(`https://gadget-server.vercel.app/getQueue/${params.id}`)
        },
        {
          path:'reported',
          element:<ReportedPage></ReportedPage>
        },
        {
          path:'varified',
          element:<VarifiedUser></VarifiedUser>
        }
      ]
    }
  ]);