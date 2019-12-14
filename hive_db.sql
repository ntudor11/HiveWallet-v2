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
  amount_btc DOUBLE(10, 5) not null,
  foreign key (sender_id) references wallets(id),
  foreign key (receiver_id) references wallets(id),
  transaction_time timestamp not null default current_timestamp
);

-- populate wallets table with demo data
-- you can add more yourself by using the app gui

INSERT INTO wallets (
  id,
  wallet_name,
  password,
  public_key,
  balance_btc,
  reg_date
) VALUES (
  1,
  'testWallet',
  '$2b$10$69ntuTVdu8BN6UqZoUInae6yhAJOsN2jRtzi3UtcYWEjwn0OgjFWm',
  '1SRps35kHLPsd6WEPGsw73lgaAFla7B',
  7.846,
  '2019-08-21 23:54:37'
);

INSERT INTO wallets (
  wallet_name,
  password,
  public_key,
  balance_btc,
  reg_date
) VALUES (
  'myBtcWallet',
  '$2b$10$tHp4ASgNJKqDfW0OTd7pfeNQtgcUDFfEAgj75WHEAUcLxZNtfiBuG',
  '1FMsadgswfgrsyhtWyt432PBepPdgjMaiEqU',
  2.31597,
  '2019-12-08 07:22:51'
);

INSERT INTO wallets (
  wallet_name,
  password,
  public_key,
  balance_btc,
  reg_date
) VALUES (
  'secret_wallet',
  '$2b$10$tHp4ASgNJKqDfW0OTd7pfeNQtgcUDFfEAgj75WHEAUcLxZNtfiBuG',
  '1HQ7BhUcTrnXFxHkqcNtXvEm16knnyict',
  21.721894,
  NOW()
);


-- populate transactions table with demo data
BEGIN TRANSACTION;
  INSERT INTO transactions (
    sender_id,
    receiver_id,
    amount_btc
  ) VALUES (
    1,
    2,
    2.0);
  -- update sender - subtract the amount from the balance
  UPDATE wallets SET balance_btc = balance_btc - 2.0 WHERE id = 1;
  -- update receiver - add the amount to the balance
  UPDATE wallets SET balance_btc = balance_btc + 2.0 WHERE id = 2;
COMMIT;


BEGIN TRANSACTION;
  INSERT INTO transactions (
    sender_id,
    receiver_id,
    amount_btc
  ) VALUES (
    2,
    3,
    0.5);
  -- update sender - subtract the amount from the balance
  UPDATE wallets SET balance_btc = balance_btc - .5 WHERE id = 2;
  -- update receiver - add the amount to the balance
  UPDATE wallets SET balance_btc = balance_btc + .5 WHERE id = 3;
COMMIT;


BEGIN TRANSACTION;
  INSERT INTO transactions (
    sender_id,
    receiver_id,
    amount_btc
  ) VALUES (
    3,
    2,
    6.542);
  -- update sender - subtract the amount from the balance
  UPDATE wallets SET balance_btc = balance_btc - 6.542 WHERE id = 3;
  -- update receiver - add the amount to the balance
  UPDATE wallets SET balance_btc = balance_btc + 6.542 WHERE id = 2;
COMMIT;


BEGIN TRANSACTION;
  INSERT INTO transactions (
    sender_id,
    receiver_id,
    amount_btc
  ) VALUES (
    3,
    1,
    2.817);
  -- update sender - subtract the amount from the balance
  UPDATE wallets SET balance_btc = balance_btc - 2.817 WHERE id = 3;
  -- update receiver - add the amount to the balance
  UPDATE wallets SET balance_btc = balance_btc + 2.817 WHERE id = 1;
COMMIT;


BEGIN TRANSACTION;
  INSERT INTO transactions (
    sender_id,
    receiver_id,
    amount_btc
  ) VALUES (
    1,
    3,
    1.54192);
  -- update sender - subtract the amount from the balance
  UPDATE wallets SET balance_btc = balance_btc - 1.54192 WHERE id = 1;
  -- update receiver - add the amount to the balance
  UPDATE wallets SET balance_btc = balance_btc + 1.54192 WHERE id = 3;
COMMIT;


BEGIN TRANSACTION;
  INSERT INTO transactions (
    sender_id,
    receiver_id,
    amount_btc
  ) VALUES (
    2,
    1,
    3.4826);
  -- update sender - subtract the amount from the balance
  UPDATE wallets SET balance_btc = balance_btc - 3.4826 WHERE id = 2;
  -- update receiver - add the amount to the balance
  UPDATE wallets SET balance_btc = balance_btc + 3.4826 WHERE id = 1;
COMMIT;


BEGIN TRANSACTION;
  INSERT INTO transactions (
    sender_id,
    receiver_id,
    amount_btc
  ) VALUES (
    3,
    2,
    2.5);
  -- update sender - subtract the amount from the balance
  UPDATE wallets SET balance_btc = balance_btc - 2.5 WHERE id = 3;
  -- update receiver - add the amount to the balance
  UPDATE wallets SET balance_btc = balance_btc + 2.5 WHERE id = 2;
COMMIT;
