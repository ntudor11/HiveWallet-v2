const express = require("express")
const wallets = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const Wallet = require("../models/Wallet")
const Transaction = require("../models/Transaction")
wallets.use(cors())


process.env.SECRET_KEY = 'secret'

wallets.post('/register', (req, res) => {
  //const today = new Date()
  const walletData = {
    id: req.body.id,
    wallet_name: req.body.wallet_name,
    get_seed: req.body.get_seed,
    password: req.body.password,
    public_key: req.body.public_key,
    balance_btc: req.body.balance_btc,
    reg_date: req.body.reg_date
  }

  Wallet.findOne({
    where: {
      wallet_name: req.body.wallet_name
    }
  })
  .then(wallet => {
    if(!wallet) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        walletData.password = hash
        bcrypt.hash(req.body.get_seed, 10, (err, hash) => {
          walletData.get_seed = hash
          Wallet.create(walletData)
          .then(user => {
            res.json({status: wallet.wallet_name + ' created'})
            console.log(wallet.wallet_name + ' created')
          })
          .catch(err => {
            res.send('error: ' + err)
          })
        })
      })
    } else {
      res.json({error: "Wallet Name already exists on your machine."})
      console.log(wallet.wallet_name + ' already exists on your machine.')
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

var loggeduser = wallets.post('/login', (req, res) => {
  Wallet.findOne({
    where: {
      wallet_name: req.body.wallet_name
    }
  })
  .then(wallet => {
    if(wallet) {
      if(bcrypt.compareSync(req.body.password, wallet.password)) {
        let token = jwt.sign(wallet.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.send(token)
        return wallet
      } else {
        res.status(400).json({error: "wrong password"})
      }
    } else {
      res.status(400).json({error: 'Wallet does not exist'})
      return null
    }
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
})

  // display logged user data in JSON
  wallets.get('/profile', function(req, res, next) {
    //here it is
    var wallet = req.wallet;
    //you probably also want to pass this to your view
    res.render('profile', { title: 'profile', wallet: wallet });
  });

// show JSON list of all wallets
  wallets.get('/walletslist', function(req, res, next) {
    // res.locals.connection.query('select * from wallets', function (error, results, fields) {
    //     if(error) throw error;
    //     res.send(JSON.stringify(results));
    // });
    Wallet.findAll({
      attributes: ['id', 'wallet_name', 'public_key', 'balance_btc', 'reg_date']
    })
    .then(wallet => {
      res.send(JSON.stringify(wallet))
    }
  )}
);


Wallet.hasMany(Transaction, {foreignKey: 'id'})

module.exports = wallets
