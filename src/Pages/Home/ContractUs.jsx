import { BiPhoneCall } from "react-icons/bi";
import { FaAddressBook, FaAddressCard, FaLocationPin } from "react-icons/fa6";
import SectionTitle from "../Shared-Components/SectionTitle";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="  rounded-lg shadow-lg">
      <SectionTitle
        heading="Have questions or need help?"
        subHeading="Get in Touch "
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col justify-center bg-blue-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <p className="text-sm text-gray-700 mb-4">
            Feel free to reach out to us via phone or use the contact form to
            send us a message. We’re here to help!
          </p>
          <div className="text-lg flex items-center font-bold">
            <BiPhoneCall /> <span>+880 1234 567 890</span>
          </div>
          <div className="text-sm flex items-center gap-2 text-gray-700 mt-2">
            <FaAddressBook></FaAddressBook> <span>support@yourwebsite.com</span>
          </div>
          <div className="text-sm flex items-center gap-2 text-gray-700 mt-2">
            <FaLocationPin></FaLocationPin>
            <span>123, Main Street, Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
