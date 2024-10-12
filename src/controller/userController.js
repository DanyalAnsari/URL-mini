const { User } = require("../model/userModel");
const {
    handlePasswordVerification,
    handleTokenGeneration,
} = require("../../auth/authentication");
const { urlModel } = require("../model/urlModel");

// Render Signup (Registration) Page
const renderRegistrationView = (req, res) => {
    res.status(200).render("signup");
};

// Render Login Page
const renderLoginView = (req, res) => {
    res.status(200).render("signin");
};

// Handle User Registration
const handleRegistration = async (req, res) => {
    const { Username, Email, Password } = req.body;

    // Check if all fields are provided
    if (!Username || !Email || !Password) {
        return res.status(400).render("signup", { error: "All fields are required." });
    }

    try {
        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ Email });
        if (existingUser) {
            return res.render("signup", { error: "User already exists." });
        }

        // Hash the password and create the user        
        const newUser = await User.create({ Username, Email, Password },);
        const token = handleTokenGeneration(newUser);
        res.status(201).cookie("token", token, { httpOnly: true, secure: true }).redirect("../dashboard");

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).render("signup", { error: "Something went wrong. Please try again." });
    }
};

// Handle User Login
const handleLogin = async (req, res) => {
    const { Email, Password } = req.body;

    // Validate if both email and password are provided
    if (!Email || !Password) {
        return res.status(400).render('signin', { error: 'All fields are required.' });
    }

    try {
        // Check if the user exists in the database
        const user = await User.findOne({Email:Email})
        if (user) {
            const isValid = handlePasswordVerification(Password, user.Password);
            if (isValid) {
                const token = handleTokenGeneration(user);
                return res.status(200).cookie("token", token).redirect("../dashboard");
            } else {
                return res.status(404).render("signin", { error: "Email or Password not valid" });
            }
        } else {
            return res.status(404).render("signin", { error: "User not found" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).render("signin", { error: "Something went wrong" });
    }
};

const handleLogOut = (req, res) => {
    try {
        return res.clearCookie("token").redirect("../");
    } catch (error) {
        console.log(error.message);
        return res.render("error", { error: "Something went wrong" });
    }
};

const handleUserDeletion = async (req, res) => {
    const user = res.locals.user;
    if (!user) {
        return res
            .status(404)
            .render("error", { error: "User not found or Bad request" });
    }
    try {
        const DeleteUser = await User.findOne({ _id: user.id });
        if (User) {
            const isDeletedUser = await User.deleteOne({ _id: DeleteUser._id });
            if (isDeletedUser) {
                const deletedRecords = await urlModel.deleteMany({
                    UserID: isDeletedUser._id,
                });
                return res.redirect("/home");
            }
        }
        return res.redirect("../");
    } catch (error) {
        console.log(error.message);
        return res.redirect("error", { error: "Something went wrong" });
    }
};
module.exports = {
    renderLoginView,
    renderRegistrationView,
    handleLogin,
    handleRegistration,
    handleLogOut,
    handleUserDeletion,
};
