import React, { useState } from "react";
import { format } from "date-fns";
import usePendingDonation from "../../Hooks/usePendingDonation";
import Loading from "../Shared-Components/Loading";
import { Link } from "react-router-dom";
import SectionTitle from "../Shared-Components/SectionTitle";

const PendingDonationReq = () => {
  const [page, setPage] = useState(1); // Current page
  const limit = 10; // Number of requests per page
  const { requests, totalRequests, totalPages, isLoading, error } =
    usePendingDonation(page, limit);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="text-red-500">Error loading requests: {error.message}</p>
    );
  }

  return (
    <div className="py-24 px-6">
      <SectionTitle
        subHeading="Donation Requests"
        heading="Donation requests awaiting your action."
      />
      <div className="overflow-x-auto min-h-screen">
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
            {requests.map((singleRequest, idx) => (
              <tr key={singleRequest._id}>
                <th>{idx + 1 + (page - 1) * limit}</th>
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
                  <Link
                    className="btn btn-xs bg-red-600 text-white"
                    to={`/donation-request-details/${singleRequest._id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          className="btn bg-red-600 text-white"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <p>
          Page {page} of {totalPages} ({totalRequests} total requests)
        </p>
        <button
          className="btn bg-red-600 text-white"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PendingDonationReq;
