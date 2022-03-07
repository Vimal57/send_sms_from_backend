const express = require("express");
const router = express.Router();
const Sms = require("../models/sms");
const Vonage = require("@vonage/server-sdk");
/**
 * @description apiKey and apiSecret = we can get this from website after successfully register 
 * @author "Vimal Solanki"
 */
const vonage = new Vonage({
    apiKey: "4b7fafc8",
    apiSecret: "doz2MnZbe6Ui2mIH"
});

router.post("/sendsms", async function (req, res) {
    try {
        console.log("req.body :: ", req.body);

        /**
         * @param {from, to, text, type(not required), callback}
         */
        vonage.message.sendSms(
            "Vonage APIs", req.body.to, req.body.text, { type: "unicode" }, async (err, responseData) => {
                try {
                    if (err) {
                        console.log("err in sending message :: ", err);
                    } else {
                        console.log("positive vibes...");
                        console.log("responseData : ", responseData);
                        let newMsg = new Sms({
                            sms : responseData 
                        });
                        await newMsg.save();
                        res.json({
                            msg: "success",
                            data: responseData
                        });
                    }

                } catch (errorr) {
                    console.log("errorr ::: ", errorr);
                }

            });



    } catch (err) {
        return res.status(400).json({
            msg: 'Something went wrong!'
        });
    }
});

module.exports = router;