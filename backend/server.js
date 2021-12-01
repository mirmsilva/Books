'use strict';
const express = require ('express');
const app = express ();

require ('dotenv').config ();

const cors = require ('cors');
app.use (cors ());

app.use (express.json ());

//identical code below
// --------------------
const jwt = require ('jsonwebtoken');
const jwksClient = require ('jwks-rsa');

// this function comes directly from the jasonwebtoken docs
const client = jwksClient ({
  // this url comes from your app on the auth0 dashboard
  jwksUri: 'https://miriamsilva.us.auth0.com/.well-known/jwks.json',
});

const PORT = process.env.PORT || 3001;

// this function comes directly from the jasonwebtoken docs
function getKey (header, callback) {
  client.getSigningKey (header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback (null, signingKey);
  });
}

//Mongoose
const mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/BookAPI`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected!!');
}).catch(err => {
    console.log('Failed to connect to MongoDB', err);
});




// ------------------------------

app.get ('/test-login', (req, res) => {
  // grab the token that was sent by the frontend
  const token = req.headers.authorization.split (' ')[1];
  // make sure the token was valid
  jwt.verify (token, getKey, {}, function (err, user) {
    if (err) {
      res.status (500).send ('invalid token');
    } else {
      res.send (user);
    }
  });
});


app.listen (PORT, () => console.log (`listening on ${PORT}`));