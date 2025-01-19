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
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import UpdatedDonation from "../Pages/Dashboard/UserDashboard/UpdatedDonation";
import AllUser from "../Pages/Dashboard/AdminDashboard/AllUser";
import AllBloodDonation from "../Pages/Dashboard/AdminDashboard/AllBloodDonation";
import PendingDonationReq from "../Pages/DonationRequest/PendingDonationReq";
import SearchPage from "../Pages/SearchPage/SearchPage";

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
        path: "donation-request",
        element: <PendingDonationReq></PendingDonationReq>,
      },
      {
        path: "search-donation-request",
        element: <SearchPage></SearchPage>,
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
          {
            path: "updated-donation/:id",
            element: <UpdatedDonation></UpdatedDonation>,
          },
          // admin dashboard
          {
            path: "admin/all-user",
            element: <AllUser></AllUser>,
          },
          {
            path: "all-blood-donation-request",
            element: <AllBloodDonation></AllBloodDonation>,
          },
        ],
      },
      {
        path: "/donation-request-details/:id",
        element: <DonationDetails></DonationDetails>,
      },
    ],
  },
]);

export default router;
