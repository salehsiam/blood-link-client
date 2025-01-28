import { useState } from "react";
import useAllUser from "../../../Hooks/useAllUser";
import Loading from "../../Shared-Components/Loading";
import { BsThreeDotsVertical } from "react-icons/bs";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2"; // Make sure Swal is imported

const AllUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();
  const usersPerPage = 10;
  const { data, refetch, isLoading } = useAllUser(currentPage, usersPerPage);

  const { users, totalUsers, totalPages } = data;

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/manage-user-status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: newStatus,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch(); // Refetch users after update
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: true,
      });
    }
  };

  const updateRole = async (id, newRole) => {
    try {
      const res = await axiosSecure.patch(`/manage-user-role/${id}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: newRole,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch(); // Refetch users after update
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong",
        showConfirmButton: true,
      });
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch(); // Refetch data when page changes
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-16 px-6">
      <h2 className="text-4xl mb-6">All Users: {totalUsers}</h2>
      <div className="overflow-x-auto">
        <table className="table border border-red-500">
          {/* Table header */}
          <thead>
            <tr className="bg-red-500 text-white">
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
                <td>
                  <div className="dropdown dropdown-end">
                    {/* Three-dot menu button */}
                    <label tabIndex={0} className="btn btn-ghost">
                      <span className="material-icons">
                        <BsThreeDotsVertical />
                      </span>
                    </label>

                    {/* Dropdown menu */}
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu p-2 py-6 shadow bg-base-100 z-40 rounded-box w-52"
                    >
                      <li>
                        {singleUser.status === "blocked" && (
                          <button
                            onClick={() =>
                              updateStatus(singleUser._id, "active")
                            }
                          >
                            Unblock
                          </button>
                        )}
                        {singleUser.status === "active" && (
                          <button
                            onClick={() =>
                              updateStatus(singleUser._id, "blocked")
                            }
                          >
                            Block
                          </button>
                        )}
                      </li>
                      <li>
                        <button
                          className="border-y"
                          onClick={() => updateRole(singleUser._id, "admin")}
                        >
                          Make Admin
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            updateRole(singleUser._id, "volunteer")
                          }
                        >
                          Make Volunteer
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
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
