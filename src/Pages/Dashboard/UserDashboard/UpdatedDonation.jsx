import { useEffect, useState } from "react";
import useAreaLocation from "../../../Hooks/useAreaLocation";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import useAxiosPublic, { axiosPublic } from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdatedDonation = () => {
  const { id } = useParams();
  const [reqData, setReqData] = useState({});
  const [districts, upazilaData] = useAreaLocation();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  // Fetch existing donation request data
  useEffect(() => {
    axiosPublic.get(`/blood-request/${id}`).then((res) => {
      setReqData(res.data);
      setSelectedDistrict(res.data.recipient_zila); // Set selected district
    });
  }, [id, axiosPublic]);

  // Populate filtered upazilas when selectedDistrict changes
  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find((d) => d.name === selectedDistrict);
      if (district) {
        const upazilas = upazilaData.filter(
          (upazila) => upazila.district_id === district.id
        );
        setFilteredUpazilas(upazilas);
      } else {
        setFilteredUpazilas([]);
      }
    }
  }, [selectedDistrict, districts, upazilaData]);

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

    const recipient_name = form.recipient_name.value;
    const recipient_upazila = reqData.recipient_upazila; // Use updated state
    const hospital_name = form.hospital_name.value;
    const address = form.address.value;
    const request_message = form.request_message.value;
    const bloodGroup = form.blood_group.value;
    const time = form.time.value;

    const donationRequestData = {
      requester_name: user?.displayName,
      requester_email: user?.email,
      recipient_name,
      recipient_zila: selectedDistrict, // Use updated district
      recipient_upazila,
      hospital_name,
      request_message,
      address,
      bloodGroup,
      time,
      date: startDate,
      status: "pending",
    };

    // Send the updated data to the backend
    axiosSecure
      .patch(`/blood-request/${id}`, donationRequestData)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Blood Request Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
        } else {
          throw new Error("Failed to update the request");
        }
      })
      .catch((error) => {
        console.error("Error updating donation request:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update the donation request. Please try again later.",
        });
      });
  };

  return (
    <div className="">
      <h2 className="text-4xl text-center ">Update Donation Request</h2>
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
              defaultValue={reqData.recipient_name}
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

          <div className="form-control">
            <label>Recipient Upazila</label>
            <select
              name="upazila"
              value={reqData.recipient_upazila || ""}
              onChange={(e) =>
                setReqData({ ...reqData, recipient_upazila: e.target.value })
              }
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
              defaultValue={reqData.hospital_name}
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
              defaultValue={reqData.address}
              placeholder="Full Address"
              className="input input-bordered"
            />
          </div>

          {/* Blood Group Select */}
          <div className="form-control">
            <label>Blood Group</label>
            <select
              value={reqData.blood_group}
              name="blood_group"
              className="select select-bordered"
            >
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
                defaultValue={reqData.time}
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
              defaultValue={reqData.request_message}
              className="textarea textarea-bordered"
              placeholder="Request Message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatedDonation;
