CREATE DATABASE IF NOT EXISTS hive_wallet;

USE hive_wallet;

CREATE TABLE wallets (
  id int not null auto_increment primary key,
  wallet_name varchar(100) not null,
  password varchar(255) not null,
  public_key varchar(400),
  balance_btc DOUBLE(10, 5),
  reg_date timestamp not null default current_timestamp
);

CREATE TABLE transactions (
  id int not null auto_increment primary key,
  sender_id int not null,
  receiver_id int not null,
  amount_btc int not null,
  foreign key (sender_id) references wallets(id),
  foreign key (receiver_id) references wallets(id),
  transaction_time timestamp not null default current_timestamp
);

INSERT INTO transactions (
  investor_id,
  borrower_id,
  type,
  value,
  transaction_time
) values (
  3,
  4,
  'Loan',
  40,
  NOW()
);

INSERT INTO transactions (
  investor_id,
  borrower_id,
  type,
  value
) values (
  2,
  5,
  'Loan',
  20
);

INSERT INTO transactions (
  investor_id,
  borrower_id,
  type,
  value
) values (
  1,
  4,
  'Instalment',
  4
);

INSERT INTO transactions (
  investor_id,
  borrower_id,
  type,
  value
) values (
  2,
  5,
  'Instalment',
  5
);
