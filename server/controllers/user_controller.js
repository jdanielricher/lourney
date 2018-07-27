const passport = require('passport');

const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('http://localhost:3000/#/login');
    });
};

const getUsers = (req, res) => {

    console.log(req.user)
    if (!req.user) {
        res.status(500).send({ message: 'Not Logged In' });
    } else {
        res.status(200).send(req.user);
    }
};

const login = passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/',
    failureRedirect: 'http://localhost:3000/#/login'
});

const newUser = (req, res, next) => {
    console.log(req.body);
    const db = req.app.get("db");
    const {
        firstName,
        lastName,
        bio
    } = req.body;
    db.add_user([
        firstName,
        lastName,
        bio
    ]).then(() => res.status(200).send("All set"))
        .catch(e => res.status(500).send("Something went horribly wrong"));
};


module.exports = {
    logout,
    login,
    getUsers,
    newUser
};