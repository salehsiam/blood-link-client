import { useState } from "react";
import JoditEditor from "jodit-react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlogPage = () => {
  const axiosPublic = useAxiosPublic();
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const [post, setPost] = useState(false);

  const handleThumbnailUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.data.display_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPost(true);

    if (!title || !thumbnail || !content) {
      alert("All fields are required!");
      return;
    }

    try {
      const imageUrl = await handleThumbnailUpload(thumbnail);
      const blogData = {
        title,
        thumbnail: imageUrl,
        content,
        status: "draft",
        createdAt: new Date(),
      };
      console.log(blogData);

      const response = await axiosPublic.post("/blogs", blogData);
      if (response.data.insertedId) {
        setPost(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog created successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTitle("");
        setThumbnail(null);
        setContent("");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      setPost(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-2">Blog Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Thumbnail Image</label>
          <input
            type="file"
            name="thumbnail_image"
            className="file-input w-full"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Blog Content</label>
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {post ? "Creating" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;
