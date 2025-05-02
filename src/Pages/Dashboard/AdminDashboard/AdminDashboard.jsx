import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import StatCard from "./StatCard";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared-Components/Loading";
import useUsers from "../../../Hooks/useUsers";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData] = useUsers();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res?.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="p-6 min-h-screen">
      {/* Welcome Section */}
      <div
        className="h-[200px] md:h-[280px] rounded-2xl overflow-hidden shadow-xl relative"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(1,152,182,0.9), rgba(1,152,182,0.6)), url(${
            userData?.image || "https://i.imgur.com/8Km9tLL.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center p-4 md:p-6 flex flex-col items-center gap-3">
            <img
              src={userData?.image || "https://i.imgur.com/8Km9tLL.png"}
              alt={user?.displayName || "User"}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <h1 className="text-lg md:text-3xl font-bold text-white">
              Welcome Back, {user?.displayName?.split(" ")[0] || "User"}!
            </h1>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <StatCard
          icon={<FaUsers size={40} className="text-blue-500" />}
          title="Total Donors"
          count={stats.totalDonor}
        />
        <StatCard
          icon={<FaHandHoldingHeart size={40} className="text-green-500" />}
          title="Total Funding"
          count={stats.revenue}
        />
        <StatCard
          icon={<FaTint size={40} className="text-red-500" />}
          title="Blood Requests"
          count={stats.bloodRequest}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
