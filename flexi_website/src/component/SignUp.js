import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Create a PaymentMethod object using card element
      const cardElement = elements.getElement(CardElement);
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error(error);
        alert('Payment failed. Please try again.');
      } else {
        // Make a request to your backend to create a payment intent
        const response = await axios.post('http://localhost:5000/create-payment-intent', {
          payment_method: paymentMethod.id,
        });

        const clientSecret = response.data.clientSecret;

        // Use Stripe.js to handle the payment
        const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (confirmPayment.error) {
          console.error(confirmPayment.error);
          alert('Payment failed. Please try again.');
        } else {
          alert('Payment successful!');
        }
      }
    } catch (err) {
      console.error(err);
      alert('Error processing payment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Pre-Purchase the Beta Version</h2>

      {/* Add the CardElement for collecting card details */}
      <CardElement />

      {/* Add your button with an onClick event to trigger the payment */}
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Purchase for $1'}
      </button>
    </div>
  );
};

export default SignUp;
