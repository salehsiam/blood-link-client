import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";

const Payment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Give Fund</h2>
      <form className="space-y-4">
        <input
          type="name"
          placeholder="Your Name"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          placeholder="Amount (USD)"
          className="input input-bordered w-xl"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <Elements stripe={stripePromise}>
          <CheckoutForm donorName={donorName} amount={amount} />
        </Elements>
      </form>
    </div>
  );
};

export default Payment;
