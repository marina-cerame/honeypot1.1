require('dotenv').config();
var express = require('express');
var plaid = require('plaid');
var bodyParser = require('body-parser');
var stripe = require('stripe')('sk_test_XtAMFVO64j1hd1Fiud3lCVdj');
var app = express();



app.use(bodyParser.json())
console.log('this is my env var: ', process.env.PLAID_CLIENT_ID);
var plaidClient = new plaid.Client(process.env.PLAID_CLIENT_ID,
                                   process.env.PLAID_SECRET,
                                   plaid.environments.tartan);

app.post('/authenticate', function(serverReq, serverRes) {
  var public_token = serverReq.body.public_token;
  var account_id = serverReq.body.account_id;
  console.log('hit');
  plaidClient.exchangeToken(public_token, account_id, function(err, res) {
    if (err != null) {
      console.log(err);
    } else {
      var access_token = res.access_token;
      console.log(access_token);
      var bank_account_token = res.stripe_bank_account_token;
      console.log(bank_account_token);
      stripe.customers.create({
        source: bank_account_token
      }, function(err, customer) {
        if (err) {
          console.log(err);
        } else {
          console.log(customer);
          serverRes.send(customer);
        }
      });
    }
  });
});

app.post('/charge', function(req, res) {
  console.log('req.body: ', req.body);
  stripe.charges.create({
  amount: req.body.amount,
  currency: "usd",
  customer: req.body.checking
  });
  console.log('charge happened');
  res.sendStatus(200);
});

var server = app.listen('8080', function() {
  console.log('connors-express-server listening on port: ', 8080);
})
