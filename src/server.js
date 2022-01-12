// Create express app
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

require("./controllers/BrandsController")(app);

app.listen(3333);
