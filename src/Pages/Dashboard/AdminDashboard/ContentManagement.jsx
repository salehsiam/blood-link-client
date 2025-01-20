import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

const ContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("");

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
    <div>
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold">Manage Blog</h2>
        <Link to="/dashboard/content-management/add-blog">
          <button className="btn btn-primary">Add Blog</button>
        </Link>
      </div>

      <div>
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex gap-10 items-center shadow-md p-4"
          >
            <div>
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-64 object-cover rounded-md"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: blog.content.substring(0, 200) + "...",
                }}
              ></p>
              <div className="mt-4 flex gap-2">
                {blog.status === "draft" ? (
                  <button
                    onClick={() => handleStatusChange(blog._id, "published")}
                    className="btn btn-success"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatusChange(blog._id, "draft")}
                    className="btn btn-warning"
                  >
                    Unpublish
                  </button>
                )}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
