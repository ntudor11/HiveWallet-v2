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

  -- transaction that updates both tables at once
  START TRANSACTION;

  INSERT INTO transactions (
    sender_id,
    receiver_id,
    amount_btc
  ) values (
    5,
    3,
    1.25
  );

  update wallets, transactions
    set
      wallets.balance_btc = (
        select (sum(wallets.balance_btc) - sum(transactions.amount_btc))
        from transactions
        where transactions.sender_id = wallets.id
      ),
      wallets.balance_btc = (
        select (sum(wallets.balance_btc) + max(transactions.amount_btc))
        from transactions
        where transactions.receiver_id = wallets.id
      ); -- if I execute only one of these SET statements, that one retrieves the correct result while it updates the other value with NULL. If I execute both, both the values will be NULL.

  COMMIT;

-- INSERT INTO transactions (
--   sender_id,
--   receiver_id,
--   amount_btc
-- ) values (
--   3,
--   2,
--   1
-- );
--
-- update wallets w
--   set balance_btc = (
--     select (sum(w.balance_btc) + sum(t.amount_btc))
--     from transactions t
--     where t.receiver_id = w.id);
--
-- update wallets w
--   set balance_btc = (
--     select (w.balance_btc - sum(t.amount_btc))
--     from transactions t
--     where t.sender_id = w.id);




-- update wallets w
--   set balance_btc = (case
--     when t.receiver_id = w.id
--       then select amount_btc
--     when t.sender_id = w.id
--       then select -(amount_btc)
--     from transactions t
--     where t.receiver_id = w.id);
--
-- update wallets w inner join transactions t
--   on w.id = t.receiver_id or w.id = t.sender_id
--   set w.balance_btc = (case
--     when w.id = t.receiver_id
--       then w.balance_btc = sum(t.amount_btc)
--     when w.id = t.sender_id
--       then w.balance_btc = -sum(t.amount_btc)
--   );
--
--   balance_btc = case when w.id = t.receiver_id
--     then select t.amount_btc end,
--   balance_btc = case when w.id = t.sender_id
--     then select -(amount_btc) end
--     where transactions t.receiver_id = w.id;
--
-- INSERT INTO transactions (
--   sender_id,
--   receiver_id,
--   amount_btc
-- ) values (
--   2,
--   3,
--   0.5
-- );
