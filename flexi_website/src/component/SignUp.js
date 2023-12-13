import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // Make a request to your backend to create a payment intent
      const response = await axios.post('http://localhost:5000/create-payment-intent');
      const clientSecret = response.data.clientSecret;

      // Use Stripe.js to handle the payment
      const stripe = window.Stripe('pk_test_51NwshIGPvFriD0ZoWyBOcjgQ8evCfJ8hJ9hs0lLP8QfPb1ldAXeYB0O16PPpHO5vXsnx8veyfsB2EVCGMCPrSLZr00am8tEQab'); // Replace 'your-publishable-key' with your actual Stripe publishable key
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: stripe.elements.getElement('card'), // Replace with your actual card element reference
        },
      });

      if (error) {
        console.error(error);
        alert('Payment failed. Please try again.');
      } else {
        alert('Payment successful!');
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

      {/* Add your button with an onClick event to trigger the payment */}
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Purchase for $1'}
      </button>
    </div>
  );
};

export default SignUp;
