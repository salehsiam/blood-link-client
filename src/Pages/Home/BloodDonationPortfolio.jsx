import bloodDonation1 from "./../../assets/nguy-n-hi-p-2rNHliX6XHk-unsplash.jpg";
import bloodDonation2 from "./../../assets/nguy-n-hi-p-ufwC2cmbaaI-unsplash.jpg";
import bloodDonation3 from "./../../assets/obi-pixel9propics-PMnbMcJeftk-unsplash.jpg";
import bloodDonation4 from "./../../assets/blood-drives-in-NJ (1).jpg";
import bloodDonation5 from "./../../assets/donation6.jpg";
import bloodDonation6 from "./../../assets/donation7.jpg";
import bloodDonation7 from "./../../assets/donation8.jpg";
import bloodDonation8 from "./../../assets/donation5.jpg";
import SectionTitle from "../Shared-Components/SectionTitle";

const BloodDonationPortfolio = () => {
  return (
    <section className="py-12 bg-gray-50 text-center">
      <SectionTitle
        subHeading="Our Heroes in Action"
        heading="Highlights from our donation journey."
      />
      <div className="mt-8 grid grid-cols-1 *:object-cover *:w-full sm:grid-cols-2 md:grid-cols-4 gap-6">
        <img
          src={bloodDonation1}
          alt="Blood donation event"
          className="rounded-lg  shadow-md hover:scale-105 h-48 transition-transform duration-300"
        />
        <img
          src={bloodDonation6}
          alt="Donor giving blood"
          className="rounded-lg shadow-md hover:scale-105 h-48 transition-transform duration-300"
        />

        <img
          src={bloodDonation8}
          alt="People celebrating after donation"
          className="rounded-lg shadow-md hover:scale-105 h-48 transition-transform duration-300"
        />
        <img
          src={bloodDonation3}
          alt="Volunteer assisting a donor"
          className="rounded-lg shadow-md hover:scale-105 h-48 transition-transform duration-300"
        />
        <img
          src={bloodDonation4}
          alt="People celebrating after donation"
          className="rounded-lg shadow-md hover:scale-105 h-48 transition-transform duration-300"
        />
        <img
          src={bloodDonation5}
          alt="Blood donation event"
          className="rounded-lg shadow-md hover:scale-105 h-48 transition-transform duration-300"
        />
        <img
          src={bloodDonation2}
          alt="Donor giving blood"
          className="rounded-lg shadow-md hover:scale-105 h-48 transition-transform duration-300"
        />

        <img
          src={bloodDonation7}
          alt="Volunteer assisting a donor"
          className="rounded-lg shadow-md hover:scale-105 h-48 transition-transform duration-300"
        />
      </div>
    </section>
  );
};

export default BloodDonationPortfolio;
