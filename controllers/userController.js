const bcrypt = require("bcrypt")
const {User} = require("../db/models")
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
    const { password } = req.body;
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
        // { message: "User created successfully" }
    } catch (error) {
    next(error)        
    }
}


exports.signin = async (req, res, next) => {
    try {
        const {user} = req;
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            expires: Date.now() + parseInt(JWT_EXPIRATION_MS),
        }
        const token = jwt.sign(JSON.stringify(payload), JWT_SECRET)
        res.status(200).json({ token });
    } catch (error) {
        next(error)
    }
}
