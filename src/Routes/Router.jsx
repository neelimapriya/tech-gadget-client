import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Registation/Register";
import Products from "../Components/Products/Products";
import CardDetails from "../Components/Cards/CardDetails";
// import Products from "../Products/Products";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
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
          element:<Products></Products>
        },
        {
          path:"/products/:id",
          element:<CardDetails></CardDetails>,
          loader:({params})=>fetch(`http://localhost:5000/products/${params.id}`)
        }

      ]
    },
  ]);