import { useState, useEffect } from "react";
import useUsers from "../../Hooks/useUsers";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import useAreaLocation from "../../Hooks/useAreaLocation";
import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../Shared-Components/Loading";
import SectionTitle from "../Shared-Components/SectionTitle"; // ⬅️ Make sure this exists
import { Link } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const [userData, refetch, isLoading] = useUsers();
  const [isEditing, setIsEditing] = useState(false);
  const axiosPublic = useAxiosPublic();

  const [districts, upazilaData] = useAreaLocation();
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [formState, setFormState] = useState({
    name: "",
    bloodGroup: "",
    districts: "",
    upazila: "",
  });

  useEffect(() => {
    if (userData && districts.length > 0 && upazilaData.length > 0) {
      setFormState({
        name: userData.name || "",
        bloodGroup: userData.bloodGroup || "",
        districts: userData.districts || "",
        upazila: userData.upazila || "",
      });
      setImagePreview(userData.image || "");

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
    setFormState({ ...formState, upazila: e.target.value });
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
      const formData = new FormData();
      formData.append("image", imageFile);

      try {
        const response = await axios.post(image_hosting_api, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedImageUrl = response.data.data.display_url;
      } catch (error) {
        Swal.fire("Error!", "Image upload failed.", "error");
        return;
      }
    }

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
        Swal.fire("Success!", "Profile updated successfully.", "success");
        setIsEditing(false);
        refetch();
      }
    } catch (error) {
      Swal.fire("Error!", "Failed to update profile.", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto mt-20 p-6">
      <SectionTitle
        heading="My Profile"
        subheading="Manage your personal information and blood donation preferences"
      />

      <div className="bg-white shadow-md rounded-lg p-6 border border-red-200">
        {!isEditing ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <img
                src={imagePreview}
                alt="Avatar"
                className="w-36 h-36 object-cover rounded-full border"
              />
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
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
                  value={userData.email}
                  disabled
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">Profile Image</label>
                <div className="flex items-center gap-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">Blood Group</label>
                <select
                  value={formState.bloodGroup}
                  onChange={(e) =>
                    setFormState({ ...formState, bloodGroup: e.target.value })
                  }
                  className="select select-bordered"
                >
                  <option value="">-- Select Blood Group --</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="form-control">
                <label className="label">District</label>
                <select
                  value={formState.districts}
                  onChange={handleDistrictChange}
                  className="select select-bordered"
                >
                  <option value="">-- Select District --</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">Upazila</label>
                <select
                  value={formState.upazila}
                  onChange={handleUpazilaChange}
                  className="select select-bordered"
                  disabled={!formState.districts}
                >
                  <option value="">-- Select Upazila --</option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                type="submit"
                className="btn bg-primary hover:bg-primary text-white"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn bg-accent hover:bg-accent text-white"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
