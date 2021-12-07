const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    auth.verify(req, res, async function () {
        const loggedInUser = await User.findOne({ _id: req.userId });
        return res.status(200).json({
            loggedIn: true,
            user: {
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                username: loggedInUser.username,
                email: loggedInUser.email
            }
        }).send();
    })
}

registerUser = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, passwordVerify } = req.body;
        if (!firstName || !lastName || !username || !email || !password || !passwordVerify) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username already exists."
                })
        }
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        if (password !== passwordVerify) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }


        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, username, email, passwordHash
        });
        const savedUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(savedUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                username: savedUser.username,
                email: savedUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ username: username });
        if (!existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this username does not exist."
                })
        }
        // const saltRounds = 10;
        // const salt = await bcrypt.genSalt(saltRounds);
        // const passwordHash = await bcrypt.hash(password, salt);
        const match = await bcrypt.compare(password, existingUser.passwordHash);
        if (!match) {
            return res
                .status(400)
                .json({
                    errorMessage: "Incorrect password."
                });
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                username: existingUser.username,
                email: existingUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
loginGuest = async (req, res) => {
    try {
        // const { email, password } = req.body;
        // if (!email || !password) {
        //     return res
        //         .status(400)
        //         .json({ errorMessage: "Please enter all required fields." });
        // }

        // const existingUser = await User.findOne({ email: email });
        // if (!existingUser) {
        //     return res
        //         .status(400)
        //         .json({
        //             success: false,
        //             errorMessage: "An account with this email address does not exist."
        //         })
        // }
        // // const saltRounds = 10;
        // // const salt = await bcrypt.genSalt(saltRounds);
        // // const passwordHash = await bcrypt.hash(password, salt);
        // const match = await bcrypt.compare(password, existingUser.passwordHash);
        // if (!match) {
        //     return res
        //         .status(400)
        //         .json({
        //             errorMessage: "Incorrect password."
        //         });
        // }

        // LOGIN THE GUEST
        const firstName = "Guest";
        const lastName = "Guest";
        const username = "Guest";
        const email = "Guest";
        const passwordHash = "Guest";
        const newUser = new User({
            firstName, lastName, username, email, passwordHash
        });
        const guestUser = await newUser.save();

        // LOGIN THE USER
        const token = auth.signToken(guestUser);

        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true,
            user: {
                firstName: guestUser.firstName,
                lastName: guestUser.lastName,
                username: guestUser.username,
                email: guestUser.email
            }
        }).send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
logoutUser = async (req, res) => {
    try {
        console.log("Logout");
        await res.cookie("token", "", {maxAge: 1}).status(200).json({
            success: true,
            user: {
                firstName: null,
                lastName: null,
                email: null
            }
        }).send();

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    loginGuest,
    logoutUser

}