import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import { useQuery } from "@tanstack/react-query";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();

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

  return (
    <div>
      <h2 className="text-3xl font-semibold">My Dashboard</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
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
                  <p>Name: Jane Doe</p>
                  <p>Email: jane.doe@example.com</p>
                </td>
                <td>
                  <button
                    onClick={() => updateStatus(singleRequest._id, "done")}
                    className="btn btn-xs btn-primary text-white"
                    disabled={singleRequest.status !== "inprogress"}
                  >
                    Done
                  </button>
                  <button
                    onClick={() => updateStatus(singleRequest._id, "cancel")}
                    className="btn btn-danger btn-xs"
                    disabled={singleRequest.status !== "inprogress"}
                  >
                    Cancel
                  </button>
                </td>
                <td>
                  <Link
                    to={`/dashboard/updated-donation/${singleRequest._id}`}
                    className="btn btn-primary btn-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(singleRequest._id)}
                    className="btn btn-warning btn-xs"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link
                    to={`/donation-request-details/${singleRequest._id}`}
                    className="btn btn-info btn-xs"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
