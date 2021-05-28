CREATE DATABASE twitter_clone;

CREATE TABLE users(
    user_id uuid DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE tweets(
    tweet_id SERIAL,
    user_id UUID,
    description varchar(255) NOT NULL,
    PRIMARY KEY (tweet_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (user_name,user_email,user_password) values ('test','test@test.com','asd');

insert into tweets (user_id, description) values ('ca2af2ba-71b2-4b9a-80dd-c03a0efdcf96','test tweet');

insert into tweets (user_id, description) values ('577b383a-0d30-4284-bc2d-3c0a2ac0036e','test tweet 2');