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

UPDATE wallets
  SET balance_btc = 1
  WHERE id = 2;

INSERT INTO transactions (
  sender_id,
  receiver_id,
  amount_btc
) values (
  3,
  2,
  1
);

update wallets w
  set balance_btc = (
    select sum(amount_btc)
    from transactions t
    where t.receiver_id = w.id);

update wallets w
  set balance_btc = (
    select -(amount_btc)
    from transactions t
    where t.sender_id = w.id);

update wallets w
  set balance_btc = (case
    when t.receiver_id = w.id
      then select amount_btc
    when t.sender_id = w.id
      then select -(amount_btc)
    from transactions t
    where t.receiver_id = w.id);

update wallets w inner join transactions t
  on w.id = t.receiver_id or w.id = t.sender_id
  set w.balance_btc = (case
    when w.id = t.receiver_id
      then w.balance_btc = sum(t.amount_btc)
    when w.id = t.sender_id
      then w.balance_btc = -sum(t.amount_btc)
  );

  balance_btc = case when w.id = t.receiver_id
    then select t.amount_btc end,
  balance_btc = case when w.id = t.sender_id
    then select -(amount_btc) end
    where transactions t.receiver_id = w.id;

INSERT INTO transactions (
  sender_id,
  receiver_id,
  amount_btc
) values (
  2,
  3,
  0.5
);
