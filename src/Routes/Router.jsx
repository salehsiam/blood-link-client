import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Registration from "../Pages/Auth/Registration";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/Profile";
import UserDashboard from "../Pages/Dashboard/UserDashboard/UserDashboard";
import CreateDonation from "../Pages/Dashboard/UserDashboard/CreateDonation";
import MyDonationRequest from "../Pages/Dashboard/UserDashboard/MyDonationRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "registration",
        element: <Registration></Registration>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
          {
            path: "/dashboard",
            element: <UserDashboard></UserDashboard>,
          },
          {
            path: "profile",
            element: <Profile></Profile>,
          },
          {
            path: "my-donation-request",
            element: <MyDonationRequest></MyDonationRequest>,
          },
          {
            path: "create-donation-request",
            element: <CreateDonation></CreateDonation>,
          },
        ],
      },
    ],
  },
]);

export default router;
