require('dotenv').config();
const axios = require('axios');
const url = "https://www.udemy.com/api-2.0/"
let id = 0;

axios({
    method: 'get',
    url,
    auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    }
})
    .then(function (response) {
        res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

const deleteCourses = (req, res, next) => {

}

const getCourses = (req, res, next) => {
    console.log('hit')
    axios.get(`${url}`).then(
        response => {
            course = response.data;
            res.status(200).json(course)
        }
    )
};

const addCourses = (req, res, next) => {
    /*req.app.get_courses([4]) */

}

const editCourses = (req, res, next) => {

}

module.exports = {
    getCourses,
    deleteCourses,
    editCourses,
    addCourses
};
