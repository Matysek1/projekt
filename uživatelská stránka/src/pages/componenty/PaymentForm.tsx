import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe nebyl inicializován");
      return;
    }

    setLoading(true);

    // Vytvoření Payment Intentu na serveru
    const response = await fetch("/api/payment/create-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }), // např. 1000 haléřů = 10 Kč
    });

    const { clientSecret } = await response.json();

    // Potvrzení platby
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement!,
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else if (result.paymentIntent?.status === "succeeded") {
      console.log("Platba úspěšná!");
    }

    setLoading(false);
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
      <button type="submit" disabled={!stripe || loading}>
        {loading ? "Probíhá platba..." : "Zaplatit"}
      </button>
    </form>
  );
};

export default PaymentForm;