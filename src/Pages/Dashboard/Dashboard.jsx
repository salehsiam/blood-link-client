import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  return (
    <div className="flex gap-10">
      <div className="w-64 bg-red-300 min-h-screen">
        <h2
          onClick={() => {
            navigate("/dashboard");
          }}
          className="text-2xl font-semibold cursor-pointer text-center"
        >
          BloodLink
        </h2>
        {isAdmin ? (
          <ul className="menu p-4">
            <li>
              <NavLink to="/dashboard/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/all-blood-donation-request">
                All Donation Request
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/all-users">All User</NavLink>
            </li>
          </ul>
        ) : (
          <ul className="menu p-4">
            <li>
              <NavLink to="/dashboard/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-donation-request">
                My Donation Request
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/create-donation-request">
                Create Donation Request
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
