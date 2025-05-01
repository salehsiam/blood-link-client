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
      <h1 className="text-2xl font-bold mb-4">Search Donors</h1>
      <form
        onSubmit={handleSearch}
        className="bg-white/80  shadow-xl p-8 rounded-2xl backdrop-blur-lg relative"
      >
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-20 rounded-2xl pointer-events-none"></div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
          Search for Donors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blood Group */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
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
            <label className="label font-semibold text-gray-700">
              District
            </label>
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
            <label className="label font-semibold text-gray-700">Upazila</label>
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
            className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-full shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
          >
            <p className="flex items-center gap-2">
              {" "}
              <FaSearch /> Search
            </p>
          </button>
        </div>
      </form>

      <div className="mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {searchResults.map((result) => (
              <div
                key={result._id}
                className="relative bg-white/80 border border-gray-200 shadow-lg rounded-xl overflow-hidden p-5 backdrop-blur-lg hover:shadow-2xl"
              >
                {/* Gradient Border Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-25 rounded-xl pointer-events-none"></div>

                {/* Card Content */}
                <h2 className="font-bold text-xl text-red-600 mb-2">
                  {result.recipient_name}
                </h2>

                <p className="text-gray-700 flex gap-1 items-center">
                  <FaLocationPin />
                  <strong> Location:</strong> {result.recipient_zila},{" "}
                  {result.recipient_upazila}
                </p>

                <p className="text-gray-700">
                  <strong>🩸 Blood Group:</strong>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-md ml-1">
                    {result.bloodGroup}
                  </span>
                </p>

                <p className="text-gray-700 flex items-center gap-2">
                  <FaCalendarAlt />
                  <strong>Date:</strong>{" "}
                  {format(new Date(result.date), "MMMM dd, yyyy")}
                </p>

                <p className="text-gray-700">
                  <strong>⏰ Time:</strong> {result.time}
                </p>

                {/* Call to Action Button */}
                <Link to={`/donation-request-details/${result._id}`}>
                  <button
                    className="w-full mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                    onClick={() =>
                      console.log(`Viewing details for ${result._id}`)
                    }
                  >
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
