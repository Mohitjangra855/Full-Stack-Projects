const express = require("express");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const { saveRedirectUrl } = require("../middleware.js")

// Controller....
const userController = require("../controller/user.js")

// Login Page And Login.....
router.route("/login")
    .get(userController.loginPage)
    .post(saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login", failureFlash: true
        }), userController.Login)

// Signup Page And Signup......
router.route("/signup")
.get(userController.signupPage)
.post(wrapAsync(userController.Signup))

// Log out ...............
router.get("/logout", userController.Logout)

module.exports = router;