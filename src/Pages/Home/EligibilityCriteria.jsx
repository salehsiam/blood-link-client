import gg from "./../../assets/blood.png";

const EligibilityCriteria = () => {
  return (
    <section className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-red-600 text-center mb-4">
        Who Can Donate Blood?
      </h2>
      <p className="text-gray-700 w-2/3 mx-auto text-center mb-6">
        Ensuring safe blood donation is our priority. Before donating, check if
        you meet the eligibility criteria. Healthy donors help save lives while
        ensuring their own well-being.
      </p>

      <div className="flex p-6 gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-red-500 mb-2">
            You Can Donate If:
          </h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              Age is between <strong>18-65</strong> years.
            </li>
            <li>
              Weight is at least <strong>50 kg (110 lbs)</strong>.
            </li>
            <li>No chronic diseases or recent infections.</li>
            <li>
              Minimum <strong>3 months gap</strong> since the last donation.
            </li>
            <li>
              No recent tattoos, piercings, or high-risk activities (6 months).
            </li>
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-red-500 mb-2">
            You Cannot Donate If:
          </h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Have a fever, cold, or flu symptoms.</li>
            <li>Are pregnant or recently gave birth.</li>
            <li>Have a history of severe illnesses (HIV, Hepatitis, etc.).</li>
            <li>Have undergone surgery in the past few months.</li>
          </ul>
        </div>
      </div>

      {/* <div className="flex justify-center gap-4 mt-6">
        <button className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700">
          Check Eligibility
        </button>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700">
          Register as a Donor
        </button>
      </div> */}
    </section>
  );
};

export default EligibilityCriteria;
