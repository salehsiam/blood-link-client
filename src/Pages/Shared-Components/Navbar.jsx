import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUsers from "../../Hooks/useUsers";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [userData] = useUsers();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout().then((res) => {
      navigate("/login");
    });
  };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };
  return (
    <div className="w-full">
      <div className="navbar fixed bg-black  px-6 mx-auto top-0  bg-opacity-30 z-10 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-red-400 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/donation-request">Donation Request</NavLink>
              </li>
              <li>
                <NavLink to="/blogs">Blog</NavLink>
              </li>
              {!user && (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
          <a
            onClick={() => {
              navigate("/");
            }}
            className="btn btn-ghost text-xl"
          >
            BloodLink
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/donation-request">Donation Request</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/funding">Give Fund</NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <button
            onClick={toggleTheme}
            className="p-3 mr-3 bg-primary rounded-full  transition-all"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-500" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle tooltip tooltip-left avatar"
              data-tip={userData.name}
            >
              <div className="w-10 justify-center items-center rounded-full">
                {user ? (
                  <img alt={userData.name} src={userData.image} />
                ) : (
                  <FaUserCircle className="text-3xl" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-red-500 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              {user && (
                <li>
                  {" "}
                  <button onClick={handleLogout}>Logout</button>{" "}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
