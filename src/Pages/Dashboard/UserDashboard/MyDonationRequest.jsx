import { FaCheck } from "react-icons/fa";
import useDonationRequest from "../../../Hooks/useDonationRequest";
import { MdCancel } from "react-icons/md";
import { format } from "date-fns";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loading from "../../Shared-Components/Loading";

const MyDonationRequest = () => {
  const [bloodRequest, refetch, isLoading, setPage, page, limit] =
    useDonationRequest();
  const axiosSecure = useAxiosSecure();

  const updateStatus = async (id, newStatus) => {
    axiosSecure.patch(`/set-status/${id}`, { status: newStatus }).then(() => {
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
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Blood request deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="my-8 px-6">
      <h2 className="text-2xl">
        My Donation Requests: {bloodRequest.data.length}
      </h2>
      <div className="overflow-x-auto min-h-screen">
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
            {bloodRequest.data.map((singleRequest, idx) => (
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
                    <label tabIndex={0} className="btn btn-ghost">
                      <BsThreeDotsVertical />
                    </label>
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
        {/* Pagination Controls */}
        <div className="flex justify-end mt-4">
          <button
            className="btn btn-outline mx-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className="btn btn-outline"
            disabled={page === bloodRequest.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
        <p className="text-right mt-2">
          Page {page} of {bloodRequest.totalPages}
        </p>
      </div>
    </div>
  );
};

export default MyDonationRequest;
