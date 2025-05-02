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
    <div className="py-24 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg bg-white border border-red-500 rounded-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-red-600">
            Support Our Cause
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            Donate to help save lives through blood donation.
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-neutral mb-2"
          >
            Enter Amount (USD)
          </label>
          <input
            id="amount"
            type="number"
            placeholder="e.g. 50"
            className="input input-bordered w-full text-lg"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            required
          />
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm amount={amount} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
