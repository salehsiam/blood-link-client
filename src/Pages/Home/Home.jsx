import Banner from "./Banner";
import BloodDonationPortfolio from "./BloodDonationPortfolio";
import ContactUs from "./ContractUs";
import EligibilityCriteria from "./EligibilityCriteria";
import Featured from "./Featured";
import HowItWorks from "./HowItWorks";
import LatestBlog from "./LatestBlog";
import RecentRequest from "./RecentRequest";

const Home = () => {
  return (
    <div className="space-y-6">
      <Banner></Banner>
      <div className="space-y-6 max-w-7xl px-2 mx-auto">
        <RecentRequest></RecentRequest>
        {/* <Featured></Featured> */}

        <EligibilityCriteria></EligibilityCriteria>
        <LatestBlog></LatestBlog>
        <HowItWorks></HowItWorks>
        <BloodDonationPortfolio></BloodDonationPortfolio>
        <ContactUs></ContactUs>
      </div>
    </div>
  );
};

export default Home;
