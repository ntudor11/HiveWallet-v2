CREATE DATABASE IF NOT EXISTS hive_wallet;

USE hive_wallet;

CREATE TABLE wallets (
  id int not null auto_increment primary key,
  wallet_name varchar(100) not null,
  get_seed varchar(400) not null,
  password varchar(255) not null,
  public_key varchar(400),
  balance_btc DOUBLE(10, 5),
  reg_date timestamp not null default current_timestamp
);

CREATE TABLE transactions (
  id int not null auto_increment primary key,
  sender_id int not null,
  receiver_id int not null,
  amount_btc DOUBLE(10, 5) not null,
  foreign key (sender_id) references wallets(id),
  foreign key (receiver_id) references wallets(id),
  transaction_time timestamp not null default current_timestamp
);

INSERT INTO wallets (
  id,
  wallet_name,
  get_seed,
  password,
  public_key,
  balance_btc,
  reg_date
) VALUES (
  2,
  'test',
  'very pulse much wear transfer tired indoor lens allow open concert canoe',
  '$2b$10$69ntuTVdu8BN6UqZoUInae6yhAJOsN2jRtzi3UtcYWEjwn0OgjFWm',
  '',
  0,
  NOW()
);

INSERT INTO wallets (
  id,
  wallet_name,
  get_seed,
  password,
  public_key,
  balance_btc,
  reg_date
) VALUES (
  3,
  'testing',
  'very indoor much lens transfer tired outside tired allow open close kaiak',
  '$2b$10$tHp4ASgNJKqDfW0OTd7pfeNQtgcUDFfEAgj75WHEAUcLxZNtfiBuG',
  '',
  5,
  NOW()
);


BEGIN TRANSACTION;
  INSERT INTO transactions (
    sender_id,
    receiver_id,
    amount_btc
  ) VALUES (
    3,
    2,
    .5);
  -- update sender - subtract the amount from the balance
  UPDATE wallets SET balance_btc = balance_btc - .5 WHERE id = 3;
  -- update receiver - add the amount to the balance
  UPDATE wallets SET balance_btc = balance_btc + .5 WHERE id = 2;
COMMIT;
