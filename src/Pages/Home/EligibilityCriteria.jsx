import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import SectionTitle from "../Shared-Components/SectionTitle";

const EligibilityCriteria = () => {
  return (
    <section className="max-w-7xl mx-auto rounded-3xl relative py-12">
      {/* Heading */}
      <SectionTitle
        heading="Who Can Donate Blood?"
        subHeading="-- Eligibility Criteria --"
      />

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Eligible Card */}
        <div className="p-8 border bg-accent/10 border-green-300 shadow-lg rounded-xl backdrop-blur-lg transition duration-300">
          <h3 className="text-2xl font-semibold text-green-600 flex items-center gap-2 mb-4">
            <FaCheckCircle className="text-green-500 text-3xl" />
            You Can Donate If:
          </h3>
          <ul className="list-disc pl-6 text-neutral space-y-3">
            <li>
              Age is between <strong>18–65</strong> years.
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

        {/* Not Eligible Card */}
        <div className="p-8  border bg-accent/10 border-primary shadow-lg rounded-xl backdrop-blur-lg transition duration-300">
          <h3 className="text-2xl font-semibold text-primary flex items-center gap-2 mb-4">
            <FaTimesCircle className="text-primary text-3xl" />
            You Cannot Donate If:
          </h3>
          <ul className="list-disc pl-6 text-neutral space-y-3">
            <li>Have a fever, cold, or flu symptoms.</li>
            <li>Are pregnant or recently gave birth.</li>
            <li>Have a history of severe illnesses (HIV, Hepatitis, etc.).</li>
            <li>Have undergone surgery in the past few months.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EligibilityCriteria;
