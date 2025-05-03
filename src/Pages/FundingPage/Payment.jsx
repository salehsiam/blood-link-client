import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";
import SectionTitle from "../Shared-Components/SectionTitle";

// Load Stripe public key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  const [amount, setAmount] = useState("");

  return (
    <div className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="w-full max-w-md  border border-red-200 shadow-lg rounded-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-red-600">
            Support Our Cause
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Your donation helps save lives through blood donation.
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-neutral mb-1"
          >
            Enter Amount (USD)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="e.g. 50"
            className="input input-bordered w-full text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            required
          />
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>

        <p className="text-xs text-center text-gray-400 mt-6">
          Powered by <span className="text-blue-500 font-semibold">Stripe</span>
        </p>
      </div>
    </div>
  );
};

export default Payment;
