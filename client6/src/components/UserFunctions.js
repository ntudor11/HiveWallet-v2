import axios from 'axios'

export const register = newWallet => {
  return axios
  .post('wallets/register', {
    wallet_name: newWallet.wallet_name,
    password: newWallet.password,
    public_key: newWallet.public_key,
    balance_btc: newWallet.balance_btc,
    reg_date: newWallet.reg_date
  })
  .then(res => {
    console.log("Registered new wallet")
  })
}

export const login = wallet => {
  return axios
  .post('wallets/login', {
    wallet_name: wallet.wallet_name,
    password: wallet.password
  })
  .then(res => {
    localStorage.setItem('usertoken', res.data)
    return res.data
  })
  .catch(err => {
    console.log(err)
  })
}

export const update = wallet => {
  return axios
  .post('wallets/update', {
    balance_btc: wallet.balance_btc
  })
  .then(res => {
    console.log("Updated wallet balance")
  })
}
