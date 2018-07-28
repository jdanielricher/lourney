require('dotenv').config();
const express = require('express');
const { json } = require('body-parser');
const course_controller = require("./controllers/course_controller");
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

    console.log(user)

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

//COURSE ENDPOINTS///
app.get("/courses/", course_controller.getCourses);
app.delete("/delete_courses/:id", course_controller.deleteCourses);
// app.put("/edit_courses/:id", course_controller.editCourses);
// app.post("/add_courses/", course_controller.addCourses);

///USER ENDPOINTS///
app.get('/login', login);
app.post('/logout', logout);
app.get('/api/me', getUsers);

app.get("/api/getCourses:userId", getUserCourses)
app.post("/api/addCourse", addCourse);

const port = process.env.SERVER_PORT || 3003;
app.listen(port, () => { console.log(`Listening on port: ${port}`); });