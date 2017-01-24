var express = require('express');
var plaid = require('plaid');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json())


var plaidClient = new plaid.Client('5876bdf2bdc6a41245f1b30d',
                                   '16ceddb4fc4810c73d43926a9d754a',
                                   plaid.environments.tartan);

// /authenticate accepts the public_token and account_id from Link
app.post('/authenticate', function(serverReq, serverRes) {
  var public_token = serverReq.body.public_token;
  var account_id = serverReq.body.account_id;
  console.log('hit');

  // Exchange a public_token and account_id for a Plaid access_token
  // and a Stripe bank account token
  plaidClient.exchangeToken(public_token, account_id, function(err, res) {
    if (err != null) {
      // Handle error!
      console.log(err);
    } else {
      // This is your Plaid access token - store somewhere persistent
      // The access_token can be used to make Plaid API calls to
      // retrieve accounts and transactions
      var access_token = res.access_token;
      console.log(access_token);

      // This is your Stripe bank account token - store somewhere
      // persistent. The token can be used to move money via
      // Stripe's ACH API.
      var bank_account_token = res.stripe_bank_account_token;
      console.log(bank_account_token);
      console.log('checking');
      console.log('userID: ', serverReq.body.user);
      let tokenInfo = {
        user_id: serverReq.body.user,
        type: serverReq.body.type,
        token: bank_account_token
      }
      // $http.post('http://localhost:3000/v1/bank_tokens', tokenInfo)
      //   .then(function(res) {
      //     console.log(res);
      //   }, function(err) {
      //     console.log(err);
      //   });
      // res.send(bank_account_token);
    }
  });
  console.log('resBANK: ', serverRes.bank_account_token);
  serverRes.send(200);

});

var server = app.listen('8080', function() {
  console.log('new server listening!: ', 8080);
})
