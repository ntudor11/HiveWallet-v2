const express = require("express")
const transactions = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const Wallet = require("../routes/Wallets")
const Transaction = require("../models/Transaction")
transactions.use(cors())

const activeWallet = Wallet.loggeduser;

// process.env.SECRET_KEY = 'secret'

// show JSON list of all transactions
transactions.get('/transactions', function(req, res, next) {
    Transaction.findAll({
      attributes: ['id', 'sender_id', 'receiver_id', 'amount_btc', 'transaction_time']
    })
    .then(transaction => {
      res.send(JSON.stringify(transaction))
    }
  )}
);

// show JSON list of all transactions JOINED with user table
transactions.get('/joined_transactions', function(req, res, next) {
    Transaction.findAll({
      attributes: ['id', 'sender_id', 'receiver_id', 'amount_btc', 'transaction_time']
    })
    .then(transaction => {
      res.send(JSON.stringify(transaction))
    }
  )}
);

// show JSON list of MY TRANSACTIONS only
transactions.get('/my_transactions', function(req, res, next) {
    Transaction.findAll({
      where: {'sender_id': '3'},
      // include: User.loggeduser,
      attributes: ['id', 'sender_id', 'receiver_id', 'amount_btc', 'transaction_time']
    })
    .then(transaction => {
      res.send(JSON.stringify(transaction))
    }
  )}
);

  // show JSON list of all transactions of your own user
//   transactions.get('/investors', function(req, res, next) {
//     // res.locals.connection.query('select * from wallets', function (error, results, fields) {
//     //     if(error) throw error;
//     //     res.send(JSON.stringify(results));
//     // });
//     Transaction.findAll({
//       where: {'usertype': 'Investor'},
//       attributes: ['id', 'email', 'usertype', 'interest_level', 'exp_timeframe']
//     })
//     .then(user => {
//       res.send(JSON.stringify(user))
//     }
//   )}
// );

module.exports = transactions
