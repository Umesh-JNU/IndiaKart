const express = require("express");
const errorMiddleware = require('./middleware/error');

const app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Root page");
})


// route imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;