import { useState } from "react";
import useAreaLocation from "../../../Hooks/useAreaLocation";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const CreateDonation = () => {
  const [districts, upazilaData] = useAreaLocation();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

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
  const handleDonationRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const requester_name = user.displayName;
    const requester_email = user.email;
    const recipient_name = form.recipient_name.value;
    const recipient_upazila = form.upazila.value;
    const hospital_name = form.hospital_name.value;
    const address = form.address.value;
    const request_message = form.request_message.value;
    const bloodGroup = form.blood_group.value;
    const time = form.time.value;
    const donationRequestData = {
      requester_name,
      requester_email,
      recipient_name,
      recipient_zila: selectedDistrict,
      recipient_upazila,
      hospital_name,
      request_message,
      address,
      bloodGroup,
      time,
      date: startDate,
    };
    console.log(donationRequestData);

    axiosPublic.post("/blood-request", donationRequestData).then((res) => {
      console.log(res.data);
      form.reset();
    });
  };
  return (
    <div>
      <h2 className="text-4xl text-center ">Create Donation</h2>

      <div className="card w-full max-w-lg mx-auto">
        <form onSubmit={handleDonationRequest} className="card-body">
          {/* Requester Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Name</span>
            </label>
            <input
              type="text"
              defaultValue={user?.displayName}
              name="requester_name"
              placeholder="Requester Name"
              className="input input-bordered"
              readOnly
            />
          </div>
          {/*Requester Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Email</span>
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              name="requester_email"
              placeholder="Requester Email"
              className="input input-bordered"
              readOnly
            />
          </div>
          {/* Recipient Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              type="text"
              name="recipient_name"
              placeholder="Recipient Name"
              className="input input-bordered"
            />
          </div>

          {/* District Select */}
          <div className="form-control">
            <label>Recipient District</label>
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
            <label>Recipient Upazila</label>
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
          {/* Hospital Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hospital Name</span>
            </label>
            <input
              type="text"
              name="hospital_name"
              placeholder="Hospital Name"
              className="input input-bordered"
            />
          </div>
          {/* Address */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Address</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Full Address"
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
          <div className="flex gap-4">
            {/* Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Time</span>
              </label>
              <input
                type="time"
                name="time"
                className="input input-bordered"
                required
              />
            </div>
            {/* Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Date</span>
              </label>
              <DatePicker
                className="input input-bordered"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          {/* Request Message */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Request Message</span>
            </label>
            <textarea
              name="request_message"
              className="textarea textarea-bordered"
              placeholder="Request Message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;
