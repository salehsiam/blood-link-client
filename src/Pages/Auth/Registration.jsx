import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useState, useEffect } from "react";
import useAreaLocation from "../../Hooks/useAreaLocation";
import bloodImg from "./../../assets/pngegg.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Registration = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [districts, upazilaData] = useAreaLocation();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);

    const district = districts.find((d) => d.name === districtName);
    if (district) {
      const upazilas = upazilaData.filter(
        (upazila) => upazila.district_id === district.id
      );
      console.log("Filtered Upazilas:", upazilas);
      setFilteredUpazilas(upazilas);
    } else {
      setFilteredUpazilas([]);
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const bloodGroup = form.blood_group.value;
    const upazila = form.upazila.value;

    const userData = {
      name,
      email,
      bloodGroup,
      districts: selectedDistrict,
      upazila,
      role: "donor",
      status: "active",
    };
    console.log(userData);
    createUser(email, password).then((result) => {
      updateUserProfile(name)
        .then((result) => {
          navigate("/");
          axiosPublic.post("/users", userData).then((res) => {
            console.log(res.data);
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-row-reverse">
        <div className="text-center w-1/2 lg:text-left">
          <img src={bloodImg} alt="" />
        </div>

        <div className="card w-full max-w-lg">
          <form onSubmit={handleRegistration} className="card-body">
            <h3 className="text-3xl font-bold text-center">Registration</h3>

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
              />
            </div>

            {/* Blood Group Select */}
            <div className="form-control">
              <label>Blood Group</label>
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
              <label>District</label>
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
              <label>Upazila</label>
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

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign Up
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
