import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../Shared-Components/SectionTitle";

const DonationDetails = () => {
  const { id } = useParams(); // Get donation request ID from URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [requestDetails, setRequestDetails] = useState({});

  // Fetch donation request details
  useEffect(() => {
    axiosSecure
      .get(`/blood-request/${id}`)
      .then((res) => setRequestDetails(res.data))
      .catch((err) => console.error(err));
  }, [id, axiosSecure]);

  // Handle confirm donation
  const handleConfirmDonation = () => {
    const donor_email = user?.email;
    const donor_name = user?.displayName;
    axiosSecure
      .patch(`/set-status/${id}`, {
        status: "inprogress",
        donor_name,
        donor_email,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Donation status updated to inprogress.",
            icon: "success",
          });
          setRequestDetails({
            ...requestDetails,
            status: "inprogress",
            donor_name,
            donor_email,
          });
          setIsModalOpen(false);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto px-6 py-24">
      <SectionTitle
        heading="View details & confirm donation"
        subHeading="Donation Request"
      />
      <div className="h-screen w-full   flex flex-col items-center justify-center p-8">
        <div className=" shadow-lg p-8 rounded-lg max-w-4xl w-full">
          <div className="space-y-4">
            <h2 className="text-2xl">
              Recipient Name: <strong> {requestDetails.recipient_name}</strong>
            </h2>
            <p>
              <strong>Blood Group:</strong> {requestDetails.bloodGroup}
            </p>
            <p>
              <strong>District:</strong> {requestDetails.recipient_zila}
            </p>
            <p>
              <strong>Upazila:</strong> {requestDetails.recipient_upazila}
            </p>
            <p>
              <strong>Hospital:</strong> {requestDetails.hospital_name}
            </p>
            <p>
              <strong>Address:</strong> {requestDetails.address}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(requestDetails.date).toDateString()}
            </p>
            <p>
              <strong>Time:</strong> {requestDetails.time}
            </p>
            <p>
              <strong>Status:</strong> {requestDetails.status}
            </p>

            {/* Donate Button */}
            {requestDetails.status === "pending" && (
              <button
                className="btn bg-red-600 text-white hover:bg-red-700 transition duration-300 mt-6 w-full"
                onClick={() => setIsModalOpen(true)}
              >
                Donate
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="font-bold text-lg text-center text-red-600">
              Confirm Donation
            </h2>
            <form>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Donor Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Donor Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
            </form>
            <div className="flex justify-end space-x-2">
              <button
                className="btn bg-gray-300 text-gray-700 hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn bg-red-600 text-white hover:bg-red-700 transition duration-300"
                onClick={handleConfirmDonation}
              >
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationDetails;
