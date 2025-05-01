import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import BlogCard from "./BlogCard";
import { CiTimer } from "react-icons/ci";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDistance } from "date-fns";

const BlogDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [singleBlog, setSingleBlog] = useState("");
  const [recentBlog, setRecentBlog] = useState([]);

  useEffect(() => {
    axiosPublic.get(`/blog/${id}`).then((res) => {
      setSingleBlog(res.data);
    });
  }, [id]);
  useEffect(() => {
    axiosPublic.get("/recent-blog").then((res) => {
      setRecentBlog(res.data);
    });
  }, []);

  return (
    <div className="px-6 py-20 ">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="md:w-2/3">
          <h1 className="text-4xl font-bold mb-2">{singleBlog.title}</h1>
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm flex gap-1 items-center">
              <CiTimer />
              {singleBlog?.createdAt
                ? formatDistance(new Date(singleBlog.createdAt), new Date(), {
                    addSuffix: true,
                  })
                : "No Date"}
            </p>

            {/* <p className="text-sm flex items-center gap-1">
              {" "}
              <FaCalendarAlt></FaCalendarAlt>
              {format(new Date(singleBlog?.createdAt), "MMMM dd, yyyy")}
            </p> */}
          </div>
          <img
            src={singleBlog.thumbnail}
            alt={singleBlog.title}
            className="w-full object-cover h-[420px] rounded-md  mb-6"
          />

          <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: singleBlog.content }}
          ></div>
        </div>
        <aside className="max-w-lg flex-1">
          <h2 className="text-3xl mb-4 text-center">Recent Blogs</h2>
          <div className="space-y-4">
            {recentBlog.map((blog) => (
              <BlogCard key={blog._id} blog={blog}></BlogCard>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
