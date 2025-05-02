import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAdmin from "../../../Hooks/useAdmin";
import SectionTitle from "../../Shared-Components/SectionTitle";
import { FaPen } from "react-icons/fa6";

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
    <div className="md:mx-8 mt-16 mb-8">
      <SectionTitle
        heading="Easily Manage Blog Posts"
        subHeading="Manage Blog Content"
      />

      <div className="bg-gradient-to-r from-accent/10 to-accent/15 border-l-4 border-red-500 p-6 rounded-xl shadow-md mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-red-600">
              {" "}
              Create and Share Blogs with Impact
            </h3>
            <p className="text-neutral mt-2 max-w-md">
              Inspire, educate, and engage your audience by publishing your
              ideas! Click below to add a new blog post and make a difference.
            </p>
          </div>
          <Link to="/dashboard/content-management/add-blog">
            <button className="btn bg-primary text-white hover:bg-primary hover:scale-105 transition duration-300 shadow-lg">
              Add Your Blog
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col bg-accent/10 border rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
          >
            {/* Thumbnail */}
            <div className="h-44 overflow-hidden">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
              />
            </div>

            {/* Blog Content */}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-red-600 line-clamp-2">
                  {blog.title}
                </h3>
                <p
                  className="text-sm text-neutral mt-2 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 120) + "...",
                  }}
                ></p>
              </div>

              {/* Status & Actions */}
              {isAdmin && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.status === "draft" ? (
                    <button
                      onClick={() => handleStatusChange(blog._id, "published")}
                      className="btn btn-success text-white"
                    >
                      Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(blog._id, "draft")}
                      className="btn btn-warning text-white"
                    >
                      Unpublish
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-error text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
