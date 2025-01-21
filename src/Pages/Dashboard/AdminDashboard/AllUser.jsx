import Swal from "sweetalert2";
import useAllUser from "../../../Hooks/useAllUser";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Loading from "../../Shared-Components/Loading";

const AllUser = () => {
  const [allUserData, refetch, isLoading] = useAllUser();
  const axiosSecure = useAxiosSecure();

  const updateStatus = async (id, newStatus) => {
    axiosSecure
      .patch(`/manage-user-status/${id}`, {
        status: newStatus,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: newStatus,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
  };
  const updateRole = async (id, newRole) => {
    axiosSecure
      .patch(`/manage-user-role/${id}`, {
        role: newRole,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: newRole,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-2xl">Welcome</h2>
      <div className="overflow-x-auto min-h-screen">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allUserData.map((singleUser) => (
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
                            unblock
                          </button>
                        )}
                        {singleUser.status === "active" && (
                          <button
                            onClick={() =>
                              updateStatus(singleUser._id, "blocked")
                            }
                          >
                            block
                          </button>
                        )}
                      </li>
                      <li>
                        <button
                          className="border-y"
                          onClick={() => updateRole(singleUser._id, "admin")}
                        >
                          make admin
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            updateRole(singleUser._id, "volunteer")
                          }
                        >
                          make volunteer
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
    </div>
  );
};

export default AllUser;
