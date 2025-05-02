import { useEffect, useState } from "react";
import useAreaLocation from "../../../Hooks/useAreaLocation";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import useAxiosPublic, { axiosPublic } from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SectionTitle from "../../Shared-Components/SectionTitle";

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
    <div className=" mt-6">
      <SectionTitle
        subHeading="Update Donation Request"
        heading="Fill in the necessary details"
      />
      <div className=" max-w-3xl mx-auto">
        <form onSubmit={handleDonationRequest} className="space-y-4">
          {/* Requester Name Input */}
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
            {/*Requester Email Input */}
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
                defaultValue={reqData.recipient_name}
                className="input input-bordered w-full"
                placeholder="Recipient Name"
                required
              />
            </div>
            {/*Requester Email Input */}
            <div>
              <label className="label-text font-semibold">Blood Group</label>
              <select
                name="blood_group"
                value={reqData.blood_group}
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
                value={reqData.recipient_upazila || ""}
                onChange={(e) =>
                  setReqData({ ...reqData, recipient_upazila: e.target.value })
                }
                className="select select-bordered w-full"
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text font-semibold">Hospital Name</label>
              <input
                type="text"
                name="hospital_name"
                defaultValue={reqData.hospital_name}
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
                defaultValue={reqData.address}
                className="input input-bordered w-full"
                placeholder="Full Address"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text font-semibold">Select Time</label>
              <input
                type="time"
                name="time"
                defaultValue={reqData.time}
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
          <div>
            <label className="label-text font-semibold">Request Message</label>
            <textarea
              name="request_message"
              defaultValue={reqData.request_message}
              className="textarea textarea-bordered w-full"
              placeholder="Please explain the urgency of your request."
              required
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
