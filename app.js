const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 3000;
const url = "mongodb://localhost:27017/SMS";
const bodyParser = require("body-parser");
const smsRoute = require("./routes/sms");


mongoose.connect(url, {
    useNewUrlParser : true
}).then(() => {
    console.log("Database connected ....");
}).catch(err => {
    console.log("err in database connection : ", err);
});



app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use("/sms", smsRoute);



app.listen(port, () => {
    console.log("Listening to the port :: ", port);
});