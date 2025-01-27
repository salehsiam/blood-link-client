import { useState } from "react";
import useAllUser from "../../../Hooks/useAllUser";
import Loading from "../../Shared-Components/Loading";

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const { data, refetch, isLoading } = useAllUser(currentPage, usersPerPage);

  const { users, totalUsers, totalPages } = data;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-16 px-6">
      <h2 className="text-2xl">All Users: {totalUsers}</h2>
      <div className="overflow-x-auto ">
        <table className="table">
          {/* Table header */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((singleUser) => (
              <tr key={singleUser._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-circle h-14 w-14">
                        <img src={singleUser.image} alt={singleUser.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{singleUser.name}</div>
                    </div>
                  </div>
                </td>
                <td>{singleUser.email}</td>
                <td>{singleUser.role}</td>
                <td>{singleUser.status}</td>
                <td>{/* Actions (like block/unblock, make admin, etc.) */}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUser;
