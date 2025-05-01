import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../Shared-Components/SectionTitle";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axiosPublic.get("/published-blog").then((res) => {
      setBlogs(res.data);
    });
  }, []);
  return (
    <div className="py-24 px-6">
      <SectionTitle
        heading="Latest Blog for you"
        subHeading="-- Blog --"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default Blog;
