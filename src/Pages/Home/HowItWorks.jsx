import { BiSolidDonateBlood, BiSolidHappyHeartEyes } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";

const HowItWorks = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-semibold">How It Works</h2>
        <p className="md:w-1/2 text-center">
          Every drop counts, and your generosity can bring hope to those in
          need. Join us in making a positive impact today!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Register */}
        <div className="flex flex-col justify-center items-center">
          <div className="bg-gray-300 p-2 rounded-full">
            <IoPersonAdd className="text-3xl text-red-500" />
          </div>
          <h3 className="text-2xl font-semibold">Register as a Donor</h3>
          <p>Sign up by filling out a simple form.</p>
          <FaArrowRight />
        </div>
        {/* Donate */}
        <div className="flex flex-col justify-center items-center">
          <div className="bg-gray-300 p-2 rounded-full">
            <BiSolidDonateBlood className="text-3xl text-red-500" />
          </div>

          <h3 className="text-2xl font-semibold">Donate Blood</h3>
          <p>The donation process takes only 10-15 minutes.</p>
          <FaArrowRight />
        </div>
        <div className="flex flex-col justify-center items-center text-center">
          <div className="bg-gray-300 p-2 rounded-full">
            <BiSolidHappyHeartEyes className="text-3xl text-red-500" />
          </div>
          <h3 className="text-2xl font-semibold">Save Lives</h3>
          <p>
            Your donation can save up to three lives and help countless others.
          </p>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
