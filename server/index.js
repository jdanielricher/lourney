require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const course_controller = require("./controllers/course_controller");

const app = express();

app.use(bodyParser.json());


app.get("/api-2.0/courses/", course_controller.getCourses)
app.delete("/api-2.0/courses/:id", course_controller.deleteCourses)
app.put("/api-2.0/courses/:id", course_controller.editCourses)
app.post("/api-2.0/courses/", course_controller.addCourses)


const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => { console.log(`Listening on port: ${port}`); });



