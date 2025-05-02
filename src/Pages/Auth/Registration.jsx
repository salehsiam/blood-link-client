import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAreaLocation from "../../Hooks/useAreaLocation";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import bloodImg from "./../../assets/pngegg.png";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [districts, upazilaData] = useAreaLocation();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [registration, setRegistration] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);

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

  const handleRegistration = async (e) => {
    e.preventDefault();
    setRegistration(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const bloodGroup = form.blood_group.value;
    const upazila = form.upazila.value;
    const imageFile = { image: form.image.files[0] };

    // Password Validation
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must have at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    setPasswordError("");

    try {
      const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (imageRes.data.success) {
        const userData = {
          name,
          email,
          bloodGroup,
          districts: selectedDistrict,
          upazila,
          image: imageRes.data.data.display_url,
          role: "donor",
          status: "active",
        };

        await createUser(email, password);
        await updateUserProfile(name);
        await axiosPublic.post("/users", userData);
        setRegistration(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegistration(false);
    }
  };

  return (
    <div className="hero  min-h-screen py-24">
      <div className="hero-content flex-row-reverse">
        <div className="text-center w-2/3 lg:text-left">
          <img
            src="https://i.ibb.co.com/0yW8H4h5/Blood-donation-rafiki.png"
            alt=""
          />
        </div>

        <div className="card w-full">
          <form onSubmit={handleRegistration} className="card-body">
            <h3 className="text-3xl font-bold text-center mb-4">
              Registration
            </h3>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              {/* Blood Group Select */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select name="blood_group" className="select select-bordered">
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

              {/* District Select */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
                  name="districts"
                  onChange={handleDistrictChange}
                  value={selectedDistrict}
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

              {/* Upazila Select */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upazila</span>
                </label>
                <select
                  name="upazila"
                  className="select select-bordered"
                  disabled={!selectedDistrict}
                >
                  <option value="">-- Select Upazila --</option>
                  {filteredUpazilas.map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Profile Image</span>
                </label>
                <input
                  type="file"
                  name="image"
                  className="file-input file-input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Submit Button (spans full width) */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary text-white w-full"
              >
                {registration ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          <p className="ml-7">
            Already have an account?{" "}
            <Link className="underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
