SELECT username FROM posts JOIN users ON users.user_id = posts.user_ID WHERE users.user_ID = $1;