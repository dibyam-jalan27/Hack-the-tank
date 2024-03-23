const jwt = require("jsonwebtoken")
const { ACCOUNT_TYPE } = require("../utils/constants")
require("dotenv").config()

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "")
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token is missing",
      })
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = decode
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token Invalid",
      })
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error in Authentication.",
    })
  }
}

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType !== ACCOUNT_TYPE.STUDENT) {
      return res.status(401).json({
        success: false,
        message: "This is protected route for students only.",
      })
    }
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error in Autharization.",
    })
  }
}

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.accountType !== ACCOUNT_TYPE.ADMIN) {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admins only.",
      })
    }
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error in Autharization.",
    })
  }
}

exports.isInstructor = (req, res, next) => {
  try {
    if (req.user.accountType !== ACCOUNT_TYPE.INSTRUCTOR) {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Instructors only.",
      })
    }
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error in Autharization.",
    })
  }
}
