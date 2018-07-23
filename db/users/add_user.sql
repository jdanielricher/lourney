INSERT INTO users(user_id, firstName, lastName, bio)
VALUES($1,$2,$3,$4) RETURNING *;