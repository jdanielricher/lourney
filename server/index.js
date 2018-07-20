require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


// app.get('/api-2.0/courses/', getCourses);

const port = process.env.SERVER_PORT || 3001;
app.listen(port, () => { console.log(`Listening on port: ${port}`); });



