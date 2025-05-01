import { BiSolidDonateBlood, BiSolidHappyHeartEyes } from "react-icons/bi";
import { IoPersonAdd } from "react-icons/io5";
import SectionTitle from "../Shared-Components/SectionTitle";

const HowItWorks = () => {
  return (
    <section className="py-12">
      {/* Section Heading */}
      <SectionTitle
        heading="How It Works"
        subHeading="-- Simple Steps to Save Lives --"
      />

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Step 1 - Register */}
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:shadow-2xl">
          <div className="relative flex flex-col">
            <div className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold absolute -top-5 -left-5 shadow-md">
              1
            </div>
            <div className="bg-red-100 p-4 rounded-full shadow-md">
              <IoPersonAdd className="text-4xl text-red-500" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mt-6 text-gray-800">
            Register as a Donor
          </h3>
          <p className="text-gray-600 mt-2 text-center grow">
            Sign up by filling out a simple form.
          </p>
        </div>

        {/* Step 2 - Donate */}
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:shadow-2xl">
          <div className="relative">
            <div className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold absolute -top-5 -left-5 shadow-md">
              2
            </div>
            <div className="bg-red-100 p-4 rounded-full shadow-md">
              <BiSolidDonateBlood className="text-4xl text-red-500" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mt-6 text-gray-800">
            Donate Blood
          </h3>
          <p className="text-gray-600 mt-2 text-center">
            The donation process takes only 10-15 minutes.
          </p>
        </div>

        {/* Step 3 - Save Lives */}
        <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:shadow-2xl">
          <div className="relative">
            <div className="bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full font-bold absolute -top-5 -left-5 shadow-md">
              3
            </div>
            <div className="bg-red-100 p-4 rounded-full shadow-md">
              <BiSolidHappyHeartEyes className="text-4xl text-red-500" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mt-6 text-gray-800">
            Save Lives
          </h3>
          <p className="text-gray-600 mt-2 text-center">
            Your donation can save up to three lives and help countless others.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
