import { useEffect, useState } from "react";
import SectionTitle from "../Shared-Components/SectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { FaLocationPin } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

const RecentRequest = () => {
  const [bloodReq, setBloodReq] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic("/latest-pending-request").then((res) => {
      setBloodReq(res.data);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <SectionTitle
        heading="Donate Blood Help People"
        subHeading="Recent Request"
      />

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6">
        {bloodReq.map((result) => (
          <div
            key={result._id}
            className="relative flex flex-col border border-primary/30 rounded-xl overflow-hidden p-5 "
          >
            {/* Recipient Name */}
            <h2 className="font-bold text-xl text-primary mb-3">
              {result.recipient_name}
            </h2>

            {/* Request Info */}
            <div className="flex flex-col grow text-gray-700 space-y-2">
              <p className="flex items-center  gap-2">
                <FaLocationPin className="text-primary " />
                <span>
                  {result.recipient_zila}, {result.recipient_upazila}
                </span>
              </p>

              <p>
                <strong>Blood Group:</strong>
                <span className="ml-2 inline-block bg-primary text-white text-sm px-2 py-1 rounded-md shadow">
                  {result.bloodGroup}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                <span>
                  <strong>Date:</strong>{" "}
                  {format(new Date(result.date), "MMMM dd, yyyy")}
                </span>
              </p>

              <p>
                <strong>⏰ Time:</strong> {result.time}
              </p>
            </div>

            {/* View Details Button */}
            <Link
              to={`/donation-request-details/${result._id}`}
              className="mt-4"
            >
              <button className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentRequest;
