const request = require("request");

//////////////////////////////////
const getCourses = (req, res) => {
  console.log("hit getCourses");

  //   console.log(req.query.page);
  var options = {
    method: "GET",
    url: `https://www.udemy.com/api-2.0/courses/?page=${parseInt(
      req.query.page
    )}`,
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization:
        "Basic SzdNeTI4djVFaGdaNUVYNUc1RFdzR2tHb2g2Qk5WaGZGQnpVc3NoaTpwdFB6WTRkRUhaODdNOXNzeXZleUFqSG1ZOEcybDdwQ0kyNlJSb1VNMmNFR0l1N3ozWFhFMHNVRG5oUU1TTG5UQTU1cDRiak9SNFZsVUxPNnhVRWxTR2dOSGY4MmtwZ0NCZUk0NWtNVGJwM1hiYXQybWlGengxekdMVGVOZ0E2TQ==",
      "Content-Type": "application/json;charset=utf-8"
    }
  };
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    // console.log(body);
    res.send(body);
  });
};
const deleteCourses = (req, res, next) => {
  console.log("hit deleteCourses");

  //   console.log(req.params);
  const db = res.app.get("db");
  db.courses
    .delete_courses([req.params.userId, req.params.courseId])
    .then(() => res.status(200).send("Course successfully deleted"))
    .catch(e => res.status(500).send("Something went terribly wrong"));
};

const addCourses = (req, res, next) => {
  const db = req.app.get("db");
  //   const { user_ID, course_ID, course_name, description } = req.body;
  console.log("hit addCourse");
  console.log("REQ.PARAMS: ", req.params);
  console.log("REQ.BODY: ", req.body);
  db.courses
    .add_courses([
      req.params.userId,
      //   req.params.courseId,
      req.body.course_name,
      req.body.description
    ])
    .then(() => res.status(200).send("Added Course"))
    .catch(e => {
      res.status(500).send("Something went horribly wrong");
    });
};

module.exports = {
  getCourses,
  deleteCourses,
  addCourses
};
