import { Link } from "react-router-dom";

const ContentManagement = () => {
  return (
    <div>
      <Link to=" /dashboard/content-management/add-blog">
        <button>Add Blog</button>
      </Link>
    </div>
  );
};

export default ContentManagement;
