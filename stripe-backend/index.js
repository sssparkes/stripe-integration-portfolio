const express = require('express');
const stripe = require('stripe')('sk_test_51NwshIGPvFriD0ZoD3631NNUOgYngTwgG4FUO6DN6XkNHBlqAWjNPMXFNk2DfqEzPaLa224lfz68ZEBBqCccKOOh00XyP5oNgZ');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON body
app.use(express.json());

// Define a route for handling payments
app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,  // amount in cents
      currency: 'usd',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
