import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAdmin from "../../../Hooks/useAdmin";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("");
  const [isAdmin] = useAdmin();

  const {
    data: blogs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/blogs?status=${status}`);
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    await axiosSecure.patch(`/blogs/${id}`, { status: status });
    refetch();
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/blogs/${id}`).then((res) => {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        });
      }
    });
  };
  return (
    <div className="md:mx-8 mt-16">
      <div className="flex px-6 justify-between ">
        <h2 className="text-4xl font-bold">Manage Blog</h2>
        <Link to="/dashboard/content-management/add-blog">
          <button className="btn btn-primary">Add Blog</button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col gap-1 max-w-sm mx-auto  shadow-md p-4"
          >
            <div className="h-40">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="grow">
              <h2 className="text-md font-bold mt-2">{blog.title}</h2>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: blog.content.substring(0, 150) + "...",
                }}
              ></p>
            </div>
            {isAdmin && (
              <div className=" flex gap-2">
                {blog.status === "draft" ? (
                  <button
                    disabled={!isAdmin}
                    onClick={() => handleStatusChange(blog._id, "published")}
                    className="btn btn-success"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    disabled={!isAdmin}
                    onClick={() => handleStatusChange(blog._id, "draft")}
                    className="btn btn-warning"
                  >
                    Unpublish
                  </button>
                )}
                <button
                  disabled={!isAdmin}
                  onClick={() => handleDelete(blog._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
