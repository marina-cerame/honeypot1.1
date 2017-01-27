'use strict';

const Nodal = require('nodal');

class Transactions extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2017012617261346;
  }

  up() {
    return [
      this.addColumn('transactions', 'transfer_ID', 'string', { nullable: true }),
    ];
  }

  down() {
    return [];
  }

}

module.exports = Transactions;
