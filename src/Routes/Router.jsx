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
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import ContentManagement from "../Pages/Dashboard/AdminDashboard/ContentManagement";
import AddBlogPage from "../Pages/Dashboard/AdminDashboard/AddBlogPage";
import FundingPage from "../Pages/FundingPage/FundingPage";
import Payment from "../Pages/FundingPage/Payment";

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
            element: (
              <PrivateRoute>
                <Profile></Profile>
              </PrivateRoute>
            ),
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
            path: "all-users",
            element: (
              <AdminRoute>
                <AllUser></AllUser>
              </AdminRoute>
            ),
          },
          {
            path: "all-blood-donation-request",
            element: (
              <AdminRoute>
                <AllBloodDonation></AllBloodDonation>
              </AdminRoute>
            ),
          },
          {
            path: "content-management",
            element: <ContentManagement></ContentManagement>,
          },
          {
            path: "content-management/add-blog",
            element: <AddBlogPage></AddBlogPage>,
          },
        ],
      },
      {
        path: "/donation-request-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetails></DonationDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/funding",
        element: <FundingPage></FundingPage>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
    ],
  },
]);

export default router;
