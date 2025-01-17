import { NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
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
      </div>
      <div className="flex-1 overflow-x-auto">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
