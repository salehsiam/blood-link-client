import { BsThreeDotsVertical } from "react-icons/bs";
import useAllDonationRequest from "../../../Hooks/useAllDonationRequest";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Shared-Components/Loading";
import useAdmin from "../../../Hooks/useAdmin";

const AllBloodDonation = () => {
  const [allBloodReq, refetch, isLoading] = useAllDonationRequest();
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const updateStatus = async (id, newStatus) => {
    axiosSecure
      .patch(`/set-status/${id}`, {
        status: newStatus,
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
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
          console.log(res.data);
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Blood request deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-2xl">All Donation Request: </h2>
      <div className="overflow-x-auto min-h-screen">
        <table className="table table-zebra">
          {/* head */}
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
            {allBloodReq?.map((singleRequest, idx) => (
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
                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(singleRequest._id)}
                          >
                            Delete
                          </button>
                        )}
                      </li>
                      <li>
                        {isAdmin && (
                          <Link
                            to={`/donation-request-details/${singleRequest._id}`}
                          >
                            View
                          </Link>
                        )}
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBloodDonation;
