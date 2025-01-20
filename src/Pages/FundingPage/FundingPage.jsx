import { Link } from "react-router-dom";

const FundingPage = () => {
  return (
    <div>
      <Link to="/payment">
        <button className="btn">Give Fund</button>
      </Link>
    </div>
  );
};

export default FundingPage;
