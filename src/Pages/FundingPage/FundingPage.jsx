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
    <div>
      <Link to="/payment">
        <button className="btn">Give Fund</button>
      </Link>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
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
