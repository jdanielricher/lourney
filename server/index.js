require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const massive = require('massive');

//auth0///
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const strategy = require('./strategy');
const { logout, login, getUsers, getUserCourses } = require('./controllers/user_controller');

const {
    getCourses,
    deleteCourses,
    editCourses,
    addCourse
} = require('./controllers/course_controller');

const {
    getPosts,
    addPost,
    deletePost,
    updatePost
} = require("./controllers/post_controller")

const app = express();
app.use(json());

massive(process.env.CONNECTION_STRING)
    .then(db => { app.set("db", db); })
    .catch(e => console.log(e));

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use((req, res, next) => {
    if (!req.session.courses) {
        req.session.courses = [];
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
    const db = app.get('db');

    // console.log(user)

    db.users
        .get_users(user.id)
        .then(response => {
            if (!response[0]) {
                db.users
                    .add_user([user.displayName, user.id])
                    .then(res => done(null, res[0]))
                    .catch(err => done(err, null));
            } else {
                return done(null, response[0]);
            }
        })
        .catch(err => done(err, null));
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

//COURSES ENDPOINTS///
app.get("/courses/", getCourses);
app.delete("/delete_courses/:userId/:courseId", deleteCourses);
// app.get('/courses/?page=')
// app.put("/edit_courses/:id", course_controller.editCourses);
// app.post("/add_courses/", course_controller.addCourses);

///USERS ENDPOINTS///
app.get('/login', login);
app.post('/logout', logout);
app.get('/api/me', getUsers);


app.get("/api/getCourses:userId", getUserCourses)
app.post("/api/addCourse", addCourse);


///POSTS ENDPOINTS///
app.get("/api/posts", getPosts)
app.post("/api/addPost", addPost)
app.delete("/deletePost/:userId/:postId", deletePost)
app.put("/updatePost/:userId/:postId", updatePost)


const port = process.env.SERVER_PORT || 3003;
app.listen(port, () => { console.log(`Listening on port: ${port}`); });