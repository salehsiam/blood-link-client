import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useVolunteer from "../../Hooks/useVolunteer";
import useAuth from "../../Hooks/useAuth";
import { FaBlog, FaHome, FaMoon, FaSun } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdBloodtype, MdCreate, MdRequestPage } from "react-icons/md";
import { RiFundsFill } from "react-icons/ri";
import Footer from "../Shared-Components/Footer";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  const { user } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="flex-none lg:hidden">
          <label
            htmlFor="my-drawer-2"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className=" pt-16 bg-primary min-h-screen text-secondary">
          <div>
            <div className="flex justify-between items-center px-6">
              <h2
                onClick={() => {
                  navigate("/dashboard");
                }}
                className="text-2xl font-semibold cursor-pointer text-secondary"
              >
                BloodLink
              </h2>
              <button
                onClick={toggleTheme}
                className="p-2 bg-base-200 rounded-full transition-all"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  <FaSun className="text-yellow-500" />
                ) : (
                  <FaMoon className="text-gray-800" />
                )}
              </button>
            </div>
            {isAdmin && (
              <ul className="menu p-4">
                <li>
                  <NavLink to="/dashboard/profile">
                    <FaUser></FaUser> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-blood-donation-request">
                    <MdBloodtype></MdBloodtype> All Donation Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-users">
                    <FaUser></FaUser> All User
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/content-management">
                    <FaBlog></FaBlog> Content Management
                  </NavLink>
                </li>
              </ul>
            )}
            {isVolunteer && (
              <ul className="menu p-4">
                <li>
                  <NavLink to="/dashboard/profile">
                    <FaUser></FaUser> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/all-blood-donation-request">
                    <MdBloodtype></MdBloodtype> All Donation Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/content-management">
                    <FaBlog></FaBlog> Content Management
                  </NavLink>
                </li>
              </ul>
            )}

            {!isAdmin && !isVolunteer && (
              <ul className="menu p-4">
                <li>
                  <NavLink to="/dashboard/profile">
                    <FaUser></FaUser> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-donation-request">
                    <MdRequestPage></MdRequestPage> My Donation Request
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/create-donation-request">
                    <MdCreate></MdCreate> Create Donation Request
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          <div className="divider"></div>
          <div>
            <ul className="menu">
              <li>
                <NavLink to="/">
                  <FaHome></FaHome> Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/donation-request">
                  <MdBloodtype />
                  Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs">
                  {" "}
                  <FaBlog></FaBlog>Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/funding">
                  <RiFundsFill></RiFundsFill> Give Fund
                </NavLink>
              </li>
              {!user && (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
