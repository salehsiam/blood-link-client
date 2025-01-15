import { Link, useNavigate } from "react-router-dom";
import donateBlood from "./../../assets/donateBlood.png";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const email = form.email.value;
    signIn(email, password)
      .then((res) => {
        console.log("loggedIn");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-row-reverse">
        <div className="text-center w-1/2 lg:text-left">
          <img src={donateBlood} alt="" />
        </div>

        <div className="card w-full max-w-md">
          <form onSubmit={handleLogin} className="card-body">
            <h3 className="text-3xl font-bold text-center">Login</h3>

            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
              />
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
          <p className="ml-7">
            Don't have an account?{" "}
            <Link className="underline" to="/registration">
              Registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
