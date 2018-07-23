SELECT * from courses
JOIN users ON users.user_ID = courses.user_ID where users.user_ID = $1

