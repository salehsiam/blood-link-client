import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../Shared-Components/SectionTitle";
import { Link } from "react-router-dom";

const Blog = () => {
  const axiosPublic = useAxiosPublic();
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axiosPublic.get("/published-blog").then((res) => {
      setBlogs(res.data);
    });
  }, []);
  return (
    <div>
      <SectionTitle
        heading="Latest Blog for you"
        subHeading="-- Blog --"
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex max-w-[440px] mx-auto flex-col shadow-md p-4"
          >
            <div>
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-52 object-cover rounded-md"
              />
            </div>
            <div className=" grow mt-3">
              <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: blog.content.substring(0, 200) + "...",
                }}
              ></p>
            </div>
            <div className="mt-4 flex gap-2">
              <Link to={`/blog-details/${blog._id}`}>
                <button className="btn btn-outline">Read</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
