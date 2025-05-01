import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { CiTimer } from "react-icons/ci";

const BlogCard = ({ blog }) => {
  return (
    <div className="flex max-w-xs mx-auto flex-col rounded-xl bg-secondary text-gray-800 shadow-lg transition hover:shadow-xl border border-primary/10">
      {/* Thumbnail */}
      <div>
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-40 object-cover rounded-t-xl"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col px-4 pt-3 pb-2 grow">
        <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
          <CiTimer className="text-primary" />
          {blog?.createdAt
            ? formatDistance(new Date(blog.createdAt), new Date(), {
                addSuffix: true,
              })
            : "No Date"}
        </p>

        <h2 className="text-lg font-semibold text-primary mb-1 line-clamp-2">
          {blog.title}
        </h2>

        <p
          className="text-sm text-gray-700 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: blog.content.substring(0, 80) + "...",
          }}
        ></p>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 mt-auto">
        <Link to={`/blog-details/${blog._id}`}>
          <button className="btn btn-sm btn-outline btn-primary w-full">
            Read
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
