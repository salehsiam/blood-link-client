import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useUsers from "../../Hooks/useUsers";
import { format } from "date-fns";

const FundingPage = () => {
  const axiosSecure = useAxiosSecure();
  const [userData] = useUsers();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/funding/${userData.email}`).then((res) => {
      setPayments(res.data);
    });
  }, [userData.email]);
  return (
    <div className="py-24">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-semibold">Funding us</h2>
        <Link to="/payment">
          <button className="btn bg-red-600 text-white">Give Fund</button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="bg-red-600 text-white">
              <th></th>
              <th>Name</th>
              <th>TransactionId</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id}>
                <th>1</th>
                <td>{payment.name}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.amount}</td>
                <td>{format(new Date(payment.date), "P")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FundingPage;
