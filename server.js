const express = require('express')
const bodyParser = require('body-parser')
const router = require("./network/routes");
// const {static} = require('express');
const hostname = "127.0.0.1";
const port = 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// app.use(router);
router(app)

app.use("",express.static("src"))

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
	console.log(`Exit: Ctrl + C`);
});