import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import BlogCard from "./BlogCard";

const BlogDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const [singleBlog, setSingleBlog] = useState("");
  const [recentBlog, setRecentBlog] = useState([]);

  useEffect(() => {
    axiosPublic.get(`/blog/${id}`).then((res) => {
      setSingleBlog(res.data);
    });
  }, []);
  useEffect(() => {
    axiosPublic.get("/recent-blog").then((res) => {
      setRecentBlog(res.data);
    });
  }, []);

  return (
    <div className=" ">
      <img
        src={singleBlog.thumbnail}
        alt={singleBlog.title}
        className="w-full h-[480px] object-cover mb-6"
      />
      <div className="flex">
        <div className="w-2/3">
          <h1 className="text-4xl font-bold mb-4">{singleBlog.title}</h1>

          <div
            className="prose max-w-full"
            dangerouslySetInnerHTML={{ __html: singleBlog.content }}
          ></div>
        </div>
        <aside className="max-w-lg flex-1">
          <h2 className="text-3xl text-center">Recent Blogs</h2>
          <div>
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
