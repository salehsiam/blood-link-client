import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../Shared-Components/SectionTitle";
import Loading from "../Shared-Components/Loading";

const DonationDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [requestDetails, setRequestDetails] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    axiosSecure
      .get(`/blood-request/${id}`)
      .then((res) => setRequestDetails(res.data))
      .catch((err) => console.error(err));
    setLoading(false);
  }, [id, axiosSecure]);

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
  if (loading) <Loading />;

  return (
    <div className="container mx-auto px-6 py-24">
      <SectionTitle
        heading="Donation Request Details"
        subHeading="View & Confirm"
      />
      <div className="flex justify-center">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-3xl w-full border border-red-200">
          <h2 className="text-3xl font-semibold text-red-600 mb-4 text-center">
            Recipient: {requestDetails.recipient_name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-lg">
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm">
              <strong>Blood Group:</strong> {requestDetails.bloodGroup}
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <strong>District:</strong> {requestDetails.recipient_zila}
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <strong>Upazila:</strong> {requestDetails.recipient_upazila}
            </div>
            <div className="p-4 bg-gray-100 rounded-md">
              <strong>Hospital:</strong> {requestDetails.hospital_name}
            </div>
            <div className="p-4 bg-gray-100 rounded-md md:col-span-2">
              <strong>Address:</strong> {requestDetails.address}
            </div>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <strong>Date:</strong>{" "}
              {new Date(requestDetails.date).toDateString()}
            </div>
            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <strong>Time:</strong> {requestDetails.time}
            </div>
            <div className="p-4 bg-red-100 rounded-md md:col-span-2">
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  requestDetails.status === "pending"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {requestDetails.status}
              </span>
            </div>
          </div>

          {/* Donate Button */}
          {requestDetails.status === "pending" && (
            <button
              className="btn bg-red-600 text-white hover:bg-red-700 transition duration-300 mt-8 w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Donate Now
            </button>
          )}
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
