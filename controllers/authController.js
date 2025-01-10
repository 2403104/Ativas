const User = require('./../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
require('dotenv').config();
const normalisePhoneNumber = (phone) => {
    return phone.replace(/[\s\(\)\-\+]/g, '');
}
exports.login = (req, res) => {
    res.render('login')
}
exports.signup = (req, res) => {
    res.render('signup')
}
exports.verifyLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        $or: [
            { email: username },
            { phoneNumber: normalisePhoneNumber(username.trim()) }
        ]
    })
    if (!user) return console.log("User not found !!");
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return console.log("Password do not matches !!");
    req.session.user = {
        _id: user._id,
        name: user.fullName
    }
    // console.log(req.session.user);
    return res.redirect('/login/ativasHome');
}
exports.registerAccount = async (req, res) => {
    const { fullName, mobileNumber, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
        return console.log("password and confirmPassword do not match")
    }
    const user = {
        fullName,
        mobileNumber,
        email,
        password
    }
    const hashPassword = await bcrypt.hash(password, 10);

    user.password = hashPassword
    const addedUser = await User.create(user)
}
exports.logout = (req, res) => {
    try {
        if (req.session && req.session.user) {
            req.session.destroy((err) => {
                if (err) {
                    console.error("Session destroy error:", err);
                    return res.status(500).json({
                        success: false,
                        message: "Unable to logout. Please try again later."
                    });
                }
                res.clearCookie('connect.sid');
                return res.json({
                    success: true,
                    message: "Logged out successfully",
                    redirectTo: "/auth/login"
                });
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "No active session to log out."
            });
        }
    } catch (err) {
        console.error("Unexpected error during logout:", err);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred during logout."
        });
    }
};
exports.fpInterface = (req, res) => {
    return res.render('forgotPassword')
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: "Please provide an email!" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found! Please register." });
        }
        const token = jwt.sign({ email }, process.env.SECRET_STR, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const receiver = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password reset request",
            text: `Click on the link to reset your password: ${process.env.CLIENT_URL}/reset-password/${token}`
        };

        try {
            await transporter.sendMail(receiver);
            return res.status(200).json({ message: "Password reset link sent successfully to your email account!" });
        } catch (err) {
            console.error('Error sending email:', err);
            if (err.response) {
                console.error('SMTP Response:', err.response);
            }
            return res.status(500).json({ message: "Something went wrong while sending the email!" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};
exports.rpInterface=(req,res)=>{
    const { token } = req.params;
    return res.render('resetPassword',{token})
}
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!token) {
            return res.status(400).send({ message: "Token is missing!" });
        }

        if (!newPassword) {
            return res.status(400).send({ message: "Please provide the password" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_STR);

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).send({ message: "User not found!" });
        }
        const newHashPassword = await bcrypt.hash(newPassword, 10);

        user.password = newHashPassword;
        await user.save();

        return res.status(200).send({ message: "Password reset successfully!!" });
    } catch (err) {
        console.error(err); 
        return res.status(500).send({ message: "Internal server error. Please try again later." });
    }
};