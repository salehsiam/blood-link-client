import { useState, useEffect } from "react";
import useUsers from "../../Hooks/useUsers";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import useAreaLocation from "../../Hooks/useAreaLocation";
import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Shared-Components/Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const [userData, refetch, isLoading] = useUsers(); // Fetch user data and refetch function
  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const axiosPublic = useAxiosPublic();

  const [districts, upazilaData] = useAreaLocation();
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null); // Store image file for uploading

  const [formState, setFormState] = useState({
    name: "",
    bloodGroup: "",
    districts: "",
    upazila: "",
  });

  // Initialize form states when userData is available
  useEffect(() => {
    if (userData && districts.length > 0 && upazilaData.length > 0) {
      setFormState({
        name: userData.name || "",
        bloodGroup: userData.bloodGroup || "",
        districts: userData.districts || "",
        upazila: userData.upazila || "",
      });
      setImagePreview(userData.image || "");

      // Filter upazilas based on the user's district
      const district = districts.find((d) => d.name === userData.districts);
      if (district) {
        const upazilas = upazilaData.filter(
          (upazila) => upazila.district_id === district.id
        );
        setFilteredUpazilas(upazilas);
      } else {
        setFilteredUpazilas([]);
      }
    }
  }, [userData, districts, upazilaData]);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setFormState({ ...formState, districts: districtName, upazila: "" });

    const district = districts.find((d) => d.name === districtName);
    if (district) {
      const upazilas = upazilaData.filter(
        (upazila) => upazila.district_id === district.id
      );
      setFilteredUpazilas(upazilas);
    } else {
      setFilteredUpazilas([]);
    }
  };

  const handleUpazilaChange = (e) => {
    const upazilaName = e.target.value;
    setFormState({ ...formState, upazila: upazilaName });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = userData.image;
    if (imageFile) {
      // Upload the image to IMGBB
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await axios.post(image_hosting_api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        uploadedImageUrl = response.data.data.display_url;
      } catch (error) {
        console.error("Image upload failed:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to upload image. Please try again.",
          icon: "error",
        });
        return;
      }
    }

    // Prepare form data
    const formData = {
      name: formState.name,
      image: uploadedImageUrl,
      bloodGroup: formState.bloodGroup,
      districts: formState.districts,
      upazila: formState.upazila,
    };

    try {
      const response = await axiosPublic.patch(
        `/user/${userData._id}`,
        formData
      );
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Profile updated successfully.",
          icon: "success",
        });
        setIsEditing(false); // Exit edit mode
        refetch(); // Refresh user data
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update profile. Please try again.",
        icon: "error",
      });
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mx-auto mt-16 p-8 ">
      <h1 className="text-2xl text-center font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 border border-red-200">
        {!isEditing ? (
          // Display mode
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <img
                  src={imagePreview}
                  alt="Avatar"
                  className="w-36 h-36 object-cover rounded-full"
                />
              </div>
              <button
                className="btn text-2xl btn-xs btn-ghost"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold">Name:</p>
                <p>{userData.name || "N/A"}</p>
              </div>
              <div>
                <p className="font-bold">Email:</p>
                <p>{userData.email || "N/A"}</p>
              </div>
              <div>
                <p className="font-bold">Blood Group:</p>
                <p>{userData.bloodGroup || "N/A"}</p>
              </div>
              <div>
                <p className="font-bold">District:</p>
                <p>{userData.districts || "N/A"}</p>
              </div>
              <div>
                <p className="font-bold">Upazila:</p>
                <p>{userData.upazila || "N/A"}</p>
              </div>
            </div>
          </div>
        ) : (
          // Edit mode
          <form onSubmit={handleFormSubmit}>
            <div className="flex justify-end mb-4">
              <button type="submit" className="btn text-white btn-success">
                Save
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email || ""}
                  disabled
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">Profile Image</label>
                <div className="flex items-center gap-4">
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-16 h-16 object-cover rounded-full border"
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formState.bloodGroup}
                  onChange={(e) =>
                    setFormState({ ...formState, bloodGroup: e.target.value })
                  }
                  className="select select-bordered"
                >
                  <option value="">-- Select Blood Group --</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="form-control">
                <label>District</label>
                <select
                  name="districts"
                  value={formState.districts}
                  onChange={handleDistrictChange}
                  className="select select-bordered"
                >
                  <option value="">-- Select a District --</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label>Upazila</label>
                <select
                  name="upazila"
                  value={formState.upazila}
                  onChange={handleUpazilaChange}
                  className="select select-bordered"
                  disabled={!formState.districts}
                >
                  <option value="">-- Select Upazila --</option>
                  {filteredUpazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
