import { useEffect, useState } from "react";
import useAreaLocation from "../../Hooks/useAreaLocation";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaLocationPin } from "react-icons/fa6";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";

const SearchPage = () => {
  const [districts, upazilaData] = useAreaLocation();
  const axiosPublic = useAxiosPublic();
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    bloodGroup: "",
    district: "",
    upazila: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setSearchCriteria({ ...searchCriteria, district: districtName });

    const selectedDistrictData = districts.find(
      (district) => district.name === districtName
    );
    if (selectedDistrictData) {
      const filtered = upazilaData.filter(
        (upazila) => upazila.district_id === selectedDistrictData.id
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  };

  useEffect(() => {
    axiosPublic
      .get("/search-donation-request", {
        params: { status: "pending" },
      })
      .then((res) => {
        setSearchResults(res.data);
      });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosPublic.get("/search-donation-request", {
        params: {
          status: "pending",
          bloodGroup: searchCriteria.bloodGroup,
          recipient_zila: searchCriteria.district,
          recipient_upazila: searchCriteria.upazila,
        },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-24">
      <form
        onSubmit={handleSearch}
        className="bg-white p-8 rounded-xl shadow-xl backdrop-blur-lg border-t-4 border-red-500"
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0  opacity-20 rounded-xl pointer-events-none"></div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-center text-red-600 mb-6">
          Search for Donors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blood Group */}
          <div className="form-control">
            <label className="label font-semibold text-neutral">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              className="select select-bordered bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-red-500"
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  bloodGroup: e.target.value,
                })
              }
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

          {/* District */}
          <div className="form-control">
            <label className="label font-semibold text-neutral">District</label>
            <select
              name="district"
              className="select select-bordered bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-red-500"
              onChange={handleDistrictChange}
            >
              <option value="">-- Select District --</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="form-control">
            <label className="label font-semibold text-neutral">Upazila</label>
            <select
              name="upazila"
              className="select select-bordered bg-white text-gray-800 shadow-md focus:ring-2 focus:ring-red-500"
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  upazila: e.target.value,
                })
              }
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

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >
            <p className="flex items-center gap-2">
              <FaSearch /> Search
            </p>
          </button>
        </div>
      </form>

      <div className="mt-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((result) => (
              <div
                key={result._id}
                className=" flex flex-col border border-primary/30 rounded-xl overflow-hidden p-5 "
              >
                {/* Recipient Name */}
                <h2 className="font-bold text-xl text-primary mb-3">
                  {result.recipient_name}
                </h2>

                {/* Request Info */}
                <div className="flex flex-col grow text-neutral space-y-2">
                  <p className="flex items-center  gap-2">
                    <FaLocationPin className="text-primary " />
                    <span>
                      {result.recipient_zila}, {result.recipient_upazila}
                    </span>
                  </p>

                  <p>
                    <strong>Blood Group:</strong>
                    <span className="ml-2 inline-block bg-primary text-white text-sm px-2 py-1 rounded-md shadow">
                      {result.bloodGroup}
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-primary" />
                    <span>
                      <strong>Date:</strong>{" "}
                      {format(new Date(result.date), "MMMM dd, yyyy")}
                    </span>
                  </p>

                  <p>
                    <strong>⏰ Time:</strong> {result.time}
                  </p>
                </div>

                {/* View Details Button */}
                <Link
                  to={`/donation-request-details/${result._id}`}
                  className="mt-4"
                >
                  <button className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
