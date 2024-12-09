const userModel = require('../db/userModel');
const { validateUserInput } = require('../schemas/user.schema');
const bcrypt = require('bcrypt');

module.exports.registerUser = async (req, res, next) => {
    try {
        // validatin
        validateUserInput(req.body);

        // hashing
        const { email, fullname, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating
        const user = await userModel.create({ email, fullname, password: hashedPassword });

        const token = user.generateAuthToken();

        res.status(201).json({ token, user });
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = user.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({ token, user });
    } catch (error) {
        if (error.errors) {
            return res.status(400).json({ errors: error.errors });
        }
        next(error);
    }
}

module.exports.getUserProfile = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }

}