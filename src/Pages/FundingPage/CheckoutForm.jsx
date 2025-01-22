import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ amount }) => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  useEffect(() => {
    if (amount > 0.5) {
      axiosSecure
        .post("/create-payment-intent", { amount })
        .then((res) => {
          console.log(res.data.clientSecret);
          if (res.data && res.data.clientSecret) {
            setClientSecret(res.data.clientSecret);
          } else {
            console.error("Invalid response from server:", res.data);
          }
        })
        .catch((err) => console.error("Payment Intent Error:", err));
    }
  }, [amount, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    setProcessing(true);

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        name: user?.displayName,
        email: user?.email,
      },
    });

    if (error) {
      console.log("[error]", error);
      setProcessing(false);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.error("Payment Confirmation Error:", confirmError);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment Successful", paymentIntent);

      const funding = {
        name: user.displayName,
        amount: paymentIntent.amount,
        email: user?.email,
        date: new Date(),
        transactionId: paymentIntent.id,
      };
      await axiosSecure.post("/funding", funding).then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Donate successful",
          showConfirmButton: false,
          timer: 1500,
        });
      });
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        {processing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};
export default CheckoutForm;
