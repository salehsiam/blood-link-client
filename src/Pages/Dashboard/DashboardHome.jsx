import useAdmin from "../../Hooks/useAdmin";
import useVolunteer from "../../Hooks/useVolunteer";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import UserDashboard from "./UserDashboard/UserDashboard";

const DashboardHome = () => {
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  if (isAdmin || isVolunteer) {
    return <AdminDashboard></AdminDashboard>;
  } else {
    return <UserDashboard></UserDashboard>;
  }
};

export default DashboardHome;
