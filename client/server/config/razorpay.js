const Razorpay = require("razorpay");
require("dotenv").config();


exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
  // headers: {"X-Razorpay-Account": "acc_Ef7ArAsdU5t0XL"}
});
