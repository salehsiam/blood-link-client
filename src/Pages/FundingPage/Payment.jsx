import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const Payment = () => {
  const [amount, setAmount] = useState("");

  return (
    <div className="pt-28">
      <div className="w-2/3 mx-auto p-6 bg-white shadow-md rounded-lg border border-red-500">
        <h2 className="text-2xl font-bold mb-4">Give Fund</h2>
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Amount (USD)"
            className="input input-bordered w-xl"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
