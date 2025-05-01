import { useEffect, useState } from "react";
import SectionTitle from "../Shared-Components/SectionTitle";
import BlogCard from "../Blog/BlogCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const LatestBlog = () => {
  const [latestBlog, setLatestBlog] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/latest-blog").then((res) => {
      setLatestBlog(res.data);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12">
      <SectionTitle heading="Latest Blog for You" subHeading="-- Blog --" />

      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mt-8">
        {latestBlog.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
