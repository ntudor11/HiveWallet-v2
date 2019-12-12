const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
  'wallet',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    wallet_name: {
      type: Sequelize.STRING
    },
    get_seed: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    public_key: {
      type: Sequelize.STRING
    },
    balance_btc: {
      type: Sequelize.INTEGER
    },
    reg_date: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)
