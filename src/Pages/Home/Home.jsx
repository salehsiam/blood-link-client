import Banner from "./Banner";
import ContactUs from "./ContractUs";
import EligibilityCriteria from "./EligibilityCriteria";
import Featured from "./Featured";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <EligibilityCriteria></EligibilityCriteria>
      <HowItWorks></HowItWorks>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
