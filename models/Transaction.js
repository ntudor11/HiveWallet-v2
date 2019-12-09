const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
  'transaction',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sender_id: {
      type: Sequelize.INTEGER,
      references: 'wallets',
      referencesKey: 'id'
    },
    receiver_id: {
      type: Sequelize.INTEGER,
      references: 'wallets',
      referencesKey: 'id'
    },
    amount_btc: {
      type: Sequelize.INTEGER
    },
    transaction_time: {
      type: 'TIMESTAMP',
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
)
