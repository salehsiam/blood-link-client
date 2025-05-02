import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useUsers from "../../Hooks/useUsers";
import { format } from "date-fns";
import SectionTitle from "../Shared-Components/SectionTitle";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const [userData] = useUsers();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (userData?.email) {
      axiosSecure.get(`/funding/${userData.email}`).then((res) => {
        setPayments(res.data);
      });
    }
  }, [userData?.email, axiosSecure]);

  return (
    <div className="py-24 px-4 md:px-6">
      {/* Section Heading */}
      <div className="mb-10">
        <SectionTitle
          heading="Support Our Mission"
          subHeading="-- Fund Our Lifesaving Work --"
        />
      </div>

      {/* Call to Action Box */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/15 border-l-4 border-red-500 p-6 rounded-xl shadow-md mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-red-600">
              Make a Difference Today!
            </h3>
            <p className="text-neutral mt-2 max-w-md">
              Your generous contribution helps save lives and support emergency
              blood needs across the country. Join our mission to create a
              healthier tomorrow.
            </p>
          </div>
          <Link to="/payment">
            <button className="btn bg-primary text-white hover:bg-primary hover:scale-105 transition duration-300 shadow-lg">
              Give Fund
            </button>
          </Link>
        </div>
      </div>

      {payments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra border border-red-500">
            <thead>
              <tr className="bg-red-600 text-white">
                <th>#</th>
                <th>Name</th>
                <th>Transaction ID</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{index + 1}</td>
                  <td>{payment.name}</td>
                  <td>{payment.transactionId}</td>
                  <td>${payment.amount}</td>
                  <td>{format(new Date(payment.date), "PPP")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10">
          No funding records found. Be the first to support!
        </p>
      )}
    </div>
  );
};

export default FundingPage;
