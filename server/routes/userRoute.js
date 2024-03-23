const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  allUsers,
  updateRole,
  deleteUser,
  getSingleUser,
} = require("../controllers/userController");
const { isAuthenicatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenicatedUser, getUserDetails);
router.route("/password/update").put(isAuthenicatedUser, updatePassword);
router.route("/me/update").put(isAuthenicatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenicatedUser, authorizeRoles("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenicatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenicatedUser, authorizeRoles("admin"), updateRole)
  .delete(isAuthenicatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
