import bloodCell from "./../../assets/blood.jpg";
import blood from "./../../assets/donateBlood.png";

const Banner = () => {
  return (
    <div
      className="relative flex items-center w-full h-[560px]"
      style={{
        backgroundImage: `url('${bloodCell}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-1/2"></div>
      <div className=" w-1/2  ">
        <h1 className="text-3xl  md:text-5xl text-white font-bold mb-4">
          Save Life Donate <br /> Blood
        </h1>
        <p className="w-4/5 mb-6 text-orange-100">
          Every drop counts! Become a life-saving donor today and make a
          difference in someone's life. Whether you're looking to join our
          community of donors or searching for a donor, we've got you covered.
          Sign up now to contribute to a noble cause or find the right donor
          match easily.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg">
            Join as a Donor
          </button>
          <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
