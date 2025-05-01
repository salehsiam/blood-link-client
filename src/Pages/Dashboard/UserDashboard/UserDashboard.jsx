import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { useQuery } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";
import useUsers from "../../../Hooks/useUsers";
import SectionTitle from "../../Shared-Components/SectionTitle";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [userData] = useUsers();

  const { user } = useAuth();
  const { data: bloodRequest = [], refetch } = useQuery({
    queryKey: ["blood-request-limit"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/blood-request-limit?email=${user.email}`
      );
      return res.data;
    },
  });

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/set-status/${id}`, {
        status: newStatus,
      });
      console.log(res.data);
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/blood-request/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Blood request deleted.", "success");
          }
        });
      }
    });
  };
  console.log(userData);

  return (
    <div className="px-4 my-8">
      <div
        className=" h-[180px] md:h-[250px] bg-cover bg-center  rounded-xl shadow-md overflow-hidden bg-white"
        style={{
          backgroundImage: `linear-gradient(rgb(1, 152, 182), rgba(1, 152, 182, 0.7)), url(${
            userData?.image || "https://i.imgur.com/8Km9tLL.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" inset-0 flex items-center justify-center">
          <div className="text-center p-6 flex flex-col items-center gap-4">
            <img
              src={userData?.image || ""}
              alt={user?.displayName || "User"}
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <h1 className="text-xl md:text-4xl font-bold text-white mb-2">
              Welcome Back, {user?.displayName?.split(" ")[0] || "User"}!
            </h1>
          </div>
        </div>
      </div>

      {/* <div className="mt-8">
        <SectionTitle heading="Latest Request" />
      </div> */}

      <div className="overflow-x-auto min-h-screen mt-6">
        <table className="table table-zebra border border-red-500 mb-8">
          <thead>
            <tr className="bg-red-500 text-white">
              <th></th>
              <th>Recipient Name</th>
              <th>Recipient Address</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood Group</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bloodRequest.map((singleRequest, idx) => (
              <tr key={singleRequest._id}>
                <th>{idx + 1}</th>
                <td>{singleRequest.recipient_name}</td>
                <td>
                  {singleRequest.recipient_upazila},{" "}
                  {singleRequest.recipient_zila}
                </td>
                <td>{format(new Date(singleRequest.date), "P")}</td>
                <td>{singleRequest.time}</td>
                <td>{singleRequest.bloodGroup}</td>
                <td>{singleRequest.status}</td>
                <td>
                  <p>Name: {singleRequest?.donor_name}</p>
                  <p>Email: {singleRequest?.donor_email}</p>
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    {/* Three-dot menu button */}
                    <label tabIndex={0} className="btn btn-ghost">
                      <span className="material-icons">
                        <BsThreeDotsVertical />
                      </span>
                    </label>

                    {/* Dropdown menu */}
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 shadow bg-base-100 z-40 rounded-box w-52"
                    >
                      <li>
                        <button
                          onClick={() =>
                            updateStatus(singleRequest._id, "done")
                          }
                          disabled={singleRequest.status !== "inprogress"}
                        >
                          Done
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            updateStatus(singleRequest._id, "cancel")
                          }
                          disabled={singleRequest.status !== "inprogress"}
                        >
                          {" "}
                          Cancel
                        </button>
                      </li>
                      <li>
                        <Link
                          to={`/dashboard/updated-donation/${singleRequest._id}`}
                        >
                          Edit
                        </Link>
                      </li>
                      <li>
                        <button onClick={() => handleDelete(singleRequest._id)}>
                          Delete
                        </button>
                      </li>
                      <li>
                        <Link
                          to={`/donation-request-details/${singleRequest._id}`}
                        >
                          View
                        </Link>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center">
          <Link to="/dashboard/my-donation-request">
            <button className="btn bg-red-500 text-white">
              View my all request
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
