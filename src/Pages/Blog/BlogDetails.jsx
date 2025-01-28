import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const [blog, setBlog] = useState("");
  useEffect(() => {
    axiosPublic.get(`/blog/${id}`).then((res) => {
      setBlog(res.data);
    });
  }, []);
  console.log(blog);
  return (
    <div className="lg:w-3/4 mx-auto px-6 py-24">
      <img
        src={blog.thumbnail}
        alt={blog.title}
        className="w-full h-[490px] object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div
        className="prose max-w-full"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogDetails;
