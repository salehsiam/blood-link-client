import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useAllDonationRequest from "../../../Hooks/useAllDonationRequest";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Shared-Components/Loading";
import useAdmin from "../../../Hooks/useAdmin";
import SectionTitle from "../../Shared-Components/SectionTitle";

const AllBloodDonation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, refetch, isLoading } = useAllDonationRequest(
    currentPage,
    itemsPerPage
  );
  const allBloodReq = data?.result || [];
  const totalPages = data?.totalPages || 1;

  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();

  const updateStatus = async (id, newStatus) => {
    axiosSecure
      .patch(`/set-status/${id}`, { status: newStatus })
      .then((res) => {
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
          refetch();
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Blood request deleted.", "success");
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-16 px-8 ">
      <SectionTitle
        subHeading="Browse current blood donation"
        heading="All Donation Requests"
      />
      <div className="overflow-x-auto">
        <table className="table table-zebra border border-red-500">
          <thead>
            <tr className="bg-red-600 text-white">
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
            {allBloodReq.map((singleRequest, idx) => (
              <tr key={singleRequest._id}>
                <th>{idx + 1}</th>
                <td>{singleRequest.recipient_name}</td>
                <td>{`${singleRequest.recipient_upazila}, ${singleRequest.recipient_zila}`}</td>
                <td>{format(new Date(singleRequest.date), "P")}</td>
                <td>{singleRequest.time}</td>
                <td>{singleRequest.bloodGroup}</td>
                <td>{singleRequest.status}</td>
                <td>
                  <p>Name: {singleRequest.donor_name}</p>
                  <p>Email: {singleRequest.donor_email}</p>
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost">
                      <BsThreeDotsVertical />
                    </label>
                    <ul className="dropdown-content menu p-2 shadow bg-base-100 z-40 rounded-box w-52">
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
                      {isAdmin && (
                        <li>
                          <button
                            onClick={() => handleDelete(singleRequest._id)}
                          >
                            Delete
                          </button>
                        </li>
                      )}
                      {isAdmin && (
                        <li>
                          <Link
                            to={`/donation-request-details/${singleRequest._id}`}
                          >
                            View
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}

      <div className="flex justify-end mt-4">
        <button
          className="btn btn-outline"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className="mx-2">
          Page {currentPage} of {totalPages}
        </p>
        <button
          className="btn btn-outline"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllBloodDonation;
