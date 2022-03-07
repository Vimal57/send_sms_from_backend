const mongoose = require("mongoose");

const smsSchema = mongoose.Schema({
    sms : {
        type : Array
    }
});

const Sms = mongoose.model("Sms", smsSchema);

module.exports = Sms;