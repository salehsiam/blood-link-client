import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="flex max-w-xs mx-auto flex-col shadow-md p-4">
      <div className="">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-40 object-cover rounded-md"
        />
      </div>
      <div className=" grow mt-3">
        <p>{blog.createdAt}</p>
        <h2 className="text-md font-bold">{blog.title}</h2>
        {/* <p
          className="text-sm"
          dangerouslySetInnerHTML={{
            __html: blog.content.substring(0, 100) + "...",
          }}
        ></p> */}
      </div>
      <div className="mt-2 flex gap-2">
        <Link to={`/blog-details/${blog._id}`}>
          <button className="btn btn-outline">Read</button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
