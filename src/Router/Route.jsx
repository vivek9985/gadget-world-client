import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Login from "./../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "./../Pages/Dashboard/DashboardLayout/DashboardLayout";
import Addproduct from "../Pages/Dashboard/AddProduct/AddProduct";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyProducts from "../Pages/Dashboard/MyProducts/MyProducts";
import Products from "../Pages/Products/Products";
import ReviewProducts from "../Pages/Dashboard/ReviewProducts/ReviewProducts";
import ReportedContents from "./../Pages/Dashboard/ReportedContents/ReportedContents";
import ManageUsers from "./../Pages/Dashboard/ManageUsers/ManageUsers";
import Details from "../Pages/ProductDetails/Details";
import UpdateProduct from "../Pages/Dashboard/UpdateProduct/UpdateProduct";
import Statistics from "../Pages/Dashboard/Statistics/Statistics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <h3>404 not found!</h3>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "products",
        element: (
          <PrivateRoute>
            <Products></Products>
          </PrivateRoute>
        ),
      },
      {
        path: "products/:id",
        element: (
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "myProducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "addProduct",
        element: (
          <PrivateRoute>
            <Addproduct></Addproduct>
          </PrivateRoute>
        ),
      },
      {
        path: "updateProduct/:id",
        element: (
          <PrivateRoute>
            <UpdateProduct></UpdateProduct>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`http://localhost:5000/updateProduct/${params.id}`),
      },
      {
        path: "reviewProducts",
        element: (
          <PrivateRoute>
            <ReviewProducts></ReviewProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "reportedContents",
        element: (
          <PrivateRoute>
            <ReportedContents></ReportedContents>
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <PrivateRoute>
            <Statistics></Statistics>
          </PrivateRoute>
        ),
      },
      {
        path: "manageCoupons",
        element: (
          <PrivateRoute>
            <h2>Manage Coupons</h2>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
