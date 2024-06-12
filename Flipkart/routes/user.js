const express = require("express");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user")
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js")
const multer = require("multer");

// for upload file...........................
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
// upload.single('user[image]'),

// Controller....
const userController = require("../controller/user.js");
const { findByIdAndUpdate, findById } = require("../models/Product.js");
// user profile

router.get("/profile", isLoggedIn,userController.profilePage );


// put req in profile
router.put("/profile/:id", isLoggedIn, upload.single('user[image]'),userController.profileEdit )

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