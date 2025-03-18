require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const CONNECT_SECRET = process.env.CONNECT_SECRET;
const WIDGET_ID = process.env.WIDGET_ID;

app.get('/generate-jwt', (req, res) => {
  const payload = {
    sub: WIDGET_ID,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 500, // 500 seconds expiry
    customerId: "dummy-customer-123", // Replace dynamically for real use
    segmentAttributes: {
      "connect:Subtype": { "ValueString": "connect:Guide" }
    },
    attributes: {
      "name": "Test User",
      "memberID": "000000",
      "email": "testuser@example.com",
      "isPremiumUser": "false",
      "age": "30"
    }
  };

  const token = jwt.sign(payload, CONNECT_SECRET, { algorithm: 'HS256' });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`JWT Server running on http://localhost:${PORT}`);
});
