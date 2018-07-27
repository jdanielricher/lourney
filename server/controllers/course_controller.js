const request = require("request");



//////////////////////////////////
const getCourses = (req, res) => {
    console.log("hit getCourses")
    var options = {
        method: 'GET',
        url: 'https://www.udemy.com/api-2.0/courses',
        headers:
        {
            'Postman-Token': 'e0450dc4-4376-4b15-9093-0137b73b024b',
            'Cache-Control': 'no-cache',
            Authorization: 'Basic SzdNeTI4djVFaGdaNUVYNUc1RFdzR2tHb2g2Qk5WaGZGQnpVc3NoaTpwdFB6WTRkRUhaODdNOXNzeXZleUFqSG1ZOEcybDdwQ0kyNlJSb1VNMmNFR0l1N3ozWFhFMHNVRG5oUU1TTG5UQTU1cDRiak9SNFZsVUxPNnhVRWxTR2dOSGY4MmtwZ0NCZUk0NWtNVGJwM1hiYXQybWlGengxekdMVGVOZ0E2TQ=='
        }
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.send(body);
    });

};
const deleteCourses = (req, res) => {
    console.log("hit deleteCourses")
    const db = res.app.get('db');
    db.delete_courses([req.params.id])
        .then(() => res.status(200).send("Course successfully deleted"))
        .catch(e => res.status(500).send("Something went terribly wrong"));
};

const newCourses = (req, res, next) => {
    console.log("hit newCourses")
    console.log(req.body);
    const db = req.app.get("db");
    const {
        user_ID,
        course_ID,
        course_name,
        description
    } = req.body;
    db.add_courses([
        user_ID,
        course_ID,
        course_name,
        description
    ]).then(() => res.status(200).send("All set"))
        .catch(e => res.status(500).send("Something went horribly wrong"));
};

module.exports = {
    getCourses,
    deleteCourses,
    newCourses
}