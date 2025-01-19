import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return (
    <Navigate to="/forbidden" state={{ from: location }} replace></Navigate>
  );
};

export default AdminRoute;
