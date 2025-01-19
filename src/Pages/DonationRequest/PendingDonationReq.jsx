import { format } from "date-fns";
import usePendingDonation from "../../Hooks/usePendingDonation";
import Loading from "../Shared-Components/Loading";
import { Link } from "react-router-dom";

const PendingDonationReq = () => {
  const [pendingBloodReq, isLoading] = usePendingDonation();
  console.log(pendingBloodReq);
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-2xl">Pending Request</h2>
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
            {pendingBloodReq?.map((singleRequest, idx) => (
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
                  <Link
                    className="btn btn-xs btn-secondary"
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
    </div>
  );
};

export default PendingDonationReq;
