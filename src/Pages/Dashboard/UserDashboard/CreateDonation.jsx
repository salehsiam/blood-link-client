import { useState } from "react";
import useAreaLocation from "../../../Hooks/useAreaLocation";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useUsers from "../../../Hooks/useUsers";
import SectionTitle from "../../Shared-Components/SectionTitle";

const CreateDonation = () => {
  const [districts, upazilaData] = useAreaLocation();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [userData] = useUsers();

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
      status: "pending",
    };
    console.log(donationRequestData);
    console.log(userData);

    if (userData.status === "blocked") {
      Swal.fire({
        icon: "error",
        title: "You has been blocked",
        text: "Something went wrong!",
      });
      return;
    }

    axiosPublic.post("/blood-request", donationRequestData).then((res) => {
      console.log(res.data);
      form.reset();

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Blood Request Submitted",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  return (
    <div className="mt-10 px-6">
      <SectionTitle
        heading="Fill in the necessary details"
        subHeading="Make a Donation Request"
      />
      <div className=" max-w-3xl mx-auto p-4 ">
        <form onSubmit={handleDonationRequest} className="space-y-6">
          {/* Requester Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text font-semibold">Requester Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                name="requester_name"
                className="input input-bordered w-full bg-gray-50"
                readOnly
              />
            </div>
            <div>
              <label className="label-text font-semibold">
                Requester Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                name="requester_email"
                className="input input-bordered w-full bg-gray-50"
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recipient Name */}
            <div>
              <label className="label-text font-semibold">Recipient Name</label>
              <input
                type="text"
                name="recipient_name"
                className="input input-bordered w-full"
                placeholder="Recipient Name"
                required
              />
            </div>
            {/* Blood Group */}
            <div>
              <label className="label-text font-semibold">Blood Group</label>
              <select
                name="blood_group"
                className="select select-bordered w-full"
                required
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
          </div>
          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text font-semibold">
                Recipient District
              </label>
              <select
                name="districts"
                onChange={handleDistrictChange}
                value={selectedDistrict}
                className="select select-bordered w-full"
                required
              >
                <option value="">-- Select a District --</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text font-semibold">
                Recipient Upazila
              </label>
              <select
                name="upazila"
                className="select select-bordered w-full"
                disabled={!selectedDistrict}
                required
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

          {/* Hospital + Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text font-semibold">Hospital Name</label>
              <input
                type="text"
                name="hospital_name"
                className="input input-bordered w-full"
                placeholder="Hospital Name"
                required
              />
            </div>
            <div>
              <label className="label-text font-semibold">Full Address</label>
              <input
                type="text"
                name="address"
                className="input input-bordered w-full"
                placeholder="Full Address"
                required
              />
            </div>
          </div>

          {/* Date + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text font-semibold">Select Time</label>
              <input
                type="time"
                name="time"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="flex flex-col justify-center">
              <label className="label-text font-semibold">Select Date</label>
              <DatePicker
                className="input input-bordered w-full"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="label-text font-semibold">Request Message</label>
            <textarea
              name="request_message"
              className="textarea textarea-bordered w-full"
              placeholder="Please explain the urgency of your request."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn bg-red-600 hover:bg-red-700 text-white text-lg w-full md:w-auto px-10 py-2"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;
