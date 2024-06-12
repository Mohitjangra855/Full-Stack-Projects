const User = require("../models/user");

// Login Page Render...
module.exports.loginPage = (req, res) => {
    res.render("pages/login.ejs");
}

// Login....
module.exports.Login = async (req, res) => {
    req.flash("success", "Welcome Back to Flipkart");
    let redirectURL = res.locals.redirectUrl || "/flipkart"
    res.redirect(redirectURL)
}

// Sign up Page Render......
module.exports.signupPage = (req, res) => {
    res.render("pages/signup.ejs");
}

// Sign up...
module.exports.Signup = async (req, res) => {
    try {
        let { username, email, howAreYou, password } = req.body;
        const user = await User({ username, email, howAreYou });
        const registerUser = await User.register(user, password)
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Flipkart")
            res.redirect("/flipkart");
        })
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup")
    }
}

// Log out ...............
module.exports.Logout = (req, res) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged Out Successfully")
        res.redirect("/flipkart")
    })
}

// profile page...............
module.exports.profilePage = async (req, res) => {
    let userid = req.user._id
    let user = await User.findById(userid);

    if (!user) {
        req.flash("error", "Listing you requested, does not exist");
        return res.redirect("/profile");
        }
        // Format the creation date as YYYY-MM-DD
        if(user.birthdate){

            const formattedDate = user.birthdate.toISOString().split('T')[0];
        res.render("pages/profile.ejs", { user, formattedDate });
        }
        res.render("pages/profile.ejs", { user});
}
    
    // profile edit..................
    module.exports.profileEdit = async (req, res) => {
        let { id } = req.params

        let editUser = await User.findByIdAndUpdate(id, { ...req.body.user });
        if(typeof req.file !== "undefined"){
            let filename = req.file.filename;
            let url = req.file.path;
            editUser.image = { filename, url };
    }
    // console.log(req.file);
        await editUser.save();
        console.log(editUser);
        req.flash("success", "Your Profile successfully updated.")
        res.redirect("/profile");
    }