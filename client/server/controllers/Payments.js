const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const { mailSender } = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mails/templates/courseEnrollmentEmail");
const {
  paymentSuccessEmail,
} = require("../mails/templates/paymentSuccessEmail");
require("dotenv").config();
const crypto = require("crypto");
//capture the payment --> initiate razorpay order

exports.capturePayment = async (req, res) => {
  const { courseIds } = req.body;
  const userId = req.user.id;

  if (!courseIds) {
    return res.status(400).json({
      success: false,
      message: "Provide course id.",
    });
  }
  let totalAmount = 0;
  for (const courseId of courseIds) {
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "Could not find the course.",
        });
      }

      if (course.studentsEnrolled.includes(userId)) {
        return res.status(200).json({
          success: false,
          message: "You are already enrolled in the course.",
        });
      }

      totalAmount += course.price;
    } catch (error) {
      //console.log(error)
      return res.status(500).json({
        success: false,
        message: `Could not initiate order due to error ${error.message}`,
      });
    }
  }

  //create order
  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };
  try {
    const paymentResponse = await instance.orders.create(options);
    return res.status(200).json({
      success: true,
      message: "order intiated succesfully",
      paymentResponse,
    });
  } catch (error) {
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Could not initiate order",
    });
  }
};

//authorize payment

exports.verifySignature = async (req, res) => {
  try {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;

    const { courseIds } = req?.body;
    const userId = req.user.id;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !courseIds ||
      !userId
    ) {
      return res.status(200).json({
        success: false,
        message: "Payment Failed.",
      });
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (generated_signature == razorpay_signature) {
      //  payment is successful

      let courseNames = [];
      //add student to all courses
      for (const courseId of courseIds) {
        try {
          const course = await Course.findByIdAndUpdate(
            courseId,
            {
              $push: { studentsEnrolled: userId },
            },
            { new: true }
          );

          if (!course) {
            return res.status(400).json({
              success: false,
              message: "Could not find the course.",
            });
          }
          courseNames.push(course.courseName);
        } catch (error) {
          //console.log(error)
          return res.status(500).json({
            success: false,
            message:
              "Payment is succesfull but unable to enroll you in the course.",
          });
        }
      }

      //add all ccourses to student document
      let student;
      try {
        student = await User.findByIdAndUpdate(userId, {
          $push: { courses: { $each: courseIds } },
        });
        if (!student) {
          return res.status(400).json({
            success: false,
            message: "Could not find the user.",
          });
        }
      } catch (error) {
        //console.log(error)
        return res.status(500).json({
          success: false,
          message:
            "Payment is succesfull but unable to add courses in your enrolled course list.",
        });
      }

      //you have to send mail
      for (let courseName of courseNames) {
        try {
          await mailSender(
            student.email,
            `Succesfully Enrolled into ${courseName}`,
            courseEnrollmentEmail(courseName, student.firstName)
          );
        } catch (error) {
          //console.log("Course_Enrollment_Mail_Error.")
        }
      }

      return res.status(200).json({
        success: true,
        message: "Congrats!! You have succesfully enrolled course(s)",
      });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Payment Failed." });
    }
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const userEmail = req.user.email;
  const { userName, amount, orderId, paymentId } = req.body;

  if (!userName || !amount || !orderId || !paymentId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details." });
  }
  try {
    const mailResponse = await mailSender(
      userEmail,
      "Payment Successfull!",
      paymentSuccessEmail(userName, amount / 100, orderId, paymentId)
    );
  } catch (error) {}
};
