CREATE TABLE IF NOT EXISTS users (
user_ID SERIAL PRIMARY KEY,
firstName varchar(30),
lastName varchar(30),
bio TEXT
);

insert into users (user_ID, firstName, lastName, bio) values (1, 'Agaia', 'Jones', 'Entrepreneur. Skydiver. World record holding mountain climber and endurance swimmer.');
insert into users (user_ID, firstName, lastName, bio) values (2, 'JDaniel', 'Richer', 'Heh. I made this.');
insert into users (user_ID, firstName, lastName, bio) values (3, 'Cody', 'Wilson', 'Creator of the Ghost Gunner and defender of the 1st and 2nd Amendment.');
insert into users (user_ID, firstName, lastName, bio) values (4, 'Jonah', 'Ramos', 'Just a dood.');

CREATE TABLE IF NOT EXISTS courses (
user_ID INTEGER,
course_ID SERIAL PRIMARY KEY,
course_name TEXT,
description TEXT
);

insert into courses (user_ID, course_ID, course_name, description) values (3, 45, 'Blockchain Fundamentals', 'An in depth breakdown of Blockchain Technology.');
insert into courses (user_ID, course_ID, course_name, description) values (2, 23, 'Art of the Sale', 'An in depth breakdown of the basics of selling.');
insert into courses (user_ID, course_ID, course_name, description) values (1, 72, 'Investing in Stocks', 'An in depth breakdown of how to invest in stocks.');
insert into courses (user_ID, course_ID, course_name, description) values (4, 42, 'Conquering Adversity', 'How to conquer adversity and overcome the obstacles in life.');

JOIN users ON users.user_ID = courses.user_ID where users.user_ID = $1;


