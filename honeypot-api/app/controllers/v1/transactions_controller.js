'use strict';

const stripe = require('stripe')(process.env.STRIPE_SECRET);
const Nodal = require('nodal');
const Transaction = Nodal.require('app/models/transaction.js');

class V1TransactionsController extends Nodal.Controller {

  index() {
    Transaction.query()
      .where(this.params.query)
      .end((err, models) => {
        this.respond(err || models);
      });
  }

  show() {
    Transaction.find(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }

  create() {
    const amount = this.params.body.amount;
    const checking = this.params.body.checking;
    const savings = this.params.body.savings;
    const context = this;
    let pending = this.params.body.pending;
    const user = this.params.body.user_id;
    let type = this.params.body.type;

    console.log('transaction is being created???????????????');
    if (type === true) {
      Transaction.query()
      .where({ 'user_id__is': user, 'pending': true })
      .end((err, transactionModels) => {
        if (transactionModels.length) {
          const pendingAmount = transactionModels.map(model => {
            return model._data.amount;
          }).reduce((total, current) => {
            return total += current;
          });
          const total = pendingAmount + amount;
          if (amount >= 500) {
            pending = false;
            transactionModels.forEach(item => {
              item._data.pending = false;
              Transaction.update(item, { pending: false }, (err, model) => {
                this.respond(err || model);
              });
            });
            stripe.charges.create({
              amount: total,
              currency: 'usd',
              customer: checking,
            });
            stripe.transfers.create({
              amount: total,
              currency: 'usd',
              destination: 'default_for_currency',
            },
              { stripe_account: savings }
            );
            // this.respond(err || )
          }
        }
      });
      Transaction.create(this.params.body, (err, model) => {
        context.respond(err || model);
      });
    }
  }

  update() {
    Transaction.update(this.params.route.id, this.params.body, (err, model) => {
      this.respond(err || model);
    });
  }

  destroy() {
    Transaction.destroy(this.params.route.id, (err, model) => {
      this.respond(err || model);
    });
  }

}

module.exports = V1TransactionsController;
