const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const errorMiddleware = require('./middleware/error');

const app = express()
app.use(express.json())
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

app.get("/", (req, res) => {
    res.send("Root page");
})


// route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;