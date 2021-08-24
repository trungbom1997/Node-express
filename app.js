require('./model/database');

const express = require('express')
const app = express()
const port = 8000
var cookieParser = require('cookie-parser')
const bodyparser = require('body-parser');

app.use(cookieParser())
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extend: true }));

app.use(express.static(__dirname + '/public'));

app.listen(port)
app.set('view engine' , 'ejs')
app.set('views','./views')

var auth = require("./router/front-end/auth")
app.use("/",auth);

var homePage = require("./router/front-end/homePage")
app.use("/",homePage);

var dashboard = require("./router/back-end/dashboard")
app.use("/admin",dashboard);