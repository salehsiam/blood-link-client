import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import StatCard from "./StatCard";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { totalDonor, bloodRequest, revenue } = stats;
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome <span className="text-red-500">{user.displayName}</span>
        </h1>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard
          icon={<FaUsers size={40} className="text-blue-500" />}
          title="Total Donors"
          count={totalDonor}
        />
        <StatCard
          icon={<FaHandHoldingHeart size={40} className="text-green-500" />}
          title="Total Funding"
          count={revenue}
        />
        <StatCard
          icon={<FaTint size={40} className="text-red-500" />}
          title="Blood Requests"
          count={bloodRequest}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
